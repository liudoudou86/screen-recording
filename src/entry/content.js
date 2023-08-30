console.log("content开始biu~ biu~ biu~");
import { downloadBlob } from "./download.js";
import { formatDate } from "./time.js";
import { blobToBase64 } from "./change.js";

let mediaRecorder;
let chunks = [];
let options = {
  mimeType: "video/webm;codecs=vp9",
};
// 定义时间及文件名
let currentDate = new Date();
let formattedDate = formatDate(currentDate);
let fileName = "ScreenRecording_" + formattedDate;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "StartRecord") {
    navigator.mediaDevices
      .getDisplayMedia({
        audio: request.audio,
        video: request.video,
      })
      .then((mediaStream) => {
        mediaRecorder = new MediaRecorder(mediaStream, options);

        // 监听视频流处理
        mediaRecorder.ondataavailable = function (e) {
          console.log(e.data);
          chunks.push(e.data);
        };

        // 监听停止共享屏幕的按钮操作
        mediaStream.getVideoTracks()[0].onended = () => {
          // 停止录制
          mediaRecorder.stop();
          console.log("当前状态: ", mediaRecorder.state);
        };

        // 开始录制
        mediaRecorder.start();
        console.log("当前状态: ", mediaRecorder.state);
        sendResponse({
          msg: "开始录制",
        });
      })
      .catch((error) => {
        console.error("获取媒体流失败：", error);
        sendResponse({
          msg: "获取媒体流失败",
        });
      });

    // 必须返回true，以确保sendResponse在异步操作完成前不被销毁
    return true;
  }
  if (request.action === "output") {
    const blob = new Blob(chunks, {
      type: chunks[0].type,
    });
    if (request.downloadMethod === "local") {
      // console.log(blob);
      const fileNames = fileName + ".mp4";
      downloadBlob(blob, fileNames);
      sendResponse({
        msg: "下载成功",
      });
    }
    if (request.downloadMethod === "clound") {
      // console.log(blob);
      const fileNames = fileName + ".webm";
      const message = {
        action: "UploadMinio",
        url: request.url,
        port: request.port,
        userName: request.userName,
        passWord: request.passWord,
        bucketName: request.bucketName,
        fileName: fileNames,
        type: chunks[0].type,
      };

      // 调用blobToBase64方法并等待Promise对象的解析
      blobToBase64(blob)
        .then((base64Str) => {
          message.base64Str = base64Str;
          // console.log(base64Str);

          // 与background进行通信
          chrome.runtime.sendMessage(message, (res) => {
            console.log(res.msg);
          });
        })
        .catch((error) => {
          console.error(error);
        });
      sendResponse({
        message: fileNames,
      });
    }

    // 必须返回true，以确保sendResponse在异步操作完成前不被销毁
    return true;
  }
});
