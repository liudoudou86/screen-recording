console.log("content开始表演魔法啦~");
import { downloadBlob } from "./download.js";
import { uploadMinio } from "./upload.js";
import { formatDate } from "./time.js";

let mediaRecorder;
let chunks = [];
let options = {
  mimeType: "video/webm; codecs=vp9",
};
// 定义时间及文件名
let currentDate = new Date();
let formattedDate = formatDate(currentDate);
let fileName = "screenRecording_" + formattedDate + ".mp4";

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
          console.log(e);
          chunks.push(e.data);
        };

        // 监听停止共享屏幕的按钮操作
        mediaStream.getVideoTracks()[0].onended = () => {
          // 停止录制
          mediaRecorder.stop();
          console.log("当前状态: " + mediaRecorder.state);
        };

        // 开始录制
        mediaRecorder.start();
        console.log("当前状态: " + mediaRecorder.state);
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
  } else if (request.action === "output") {
    if (request.downloadMethod === "local") {
      downloadBlob(chunks, fileName);
      sendResponse({
        msg: "下载成功",
      });
    } else if (request.downloadMethod === "clound") {
      uploadMinio(chunks, fileName, 'video');
      sendResponse({
        msg: "上传成功",
      });
    }
  }

  // 必须返回true，以确保sendResponse在异步操作完成前不被销毁
  return true;
});
