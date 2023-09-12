console.log("content开始biu~ biu~ biu~");
import { recording } from "./record.js";
import { downloadBlob } from "./download.js";
import { formatDate } from "./time.js";
import { blobToBase64 } from "./change.js";

let mediaRecorder;
let chunks = [];
let options = {
  mimeType: "video/webm;codecs=vp9",
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "StartRecord") {
    chunks = [];
    recording(request, mediaRecorder, options, chunks);
    sendResponse({
      msg: "开始录制",
    });

    // 必须返回true，以确保sendResponse在异步操作完成前不被销毁
    return true;
  }
  if (request.action === "Output") {
    let blob = new Blob(chunks, {
      type: chunks[0].type,
    });
    // 定义时间及文件名
    const currentDate = new Date();
    if (request.downloadMethod === "local") {
      // console.log(blob);
      const fileNames = "ScreenRecording_".concat(
        formatDate(currentDate),
        ".mp4"
      );
      downloadBlob(blob, fileNames);
      sendResponse({
        msg: "下载成功",
      });

      // blob对象垃圾回收
      blob = null;
    }
    if (request.downloadMethod === "clound") {
      // console.log(blob);
      const fileNames = "ScreenRecording_".concat(
        formatDate(currentDate),
        ".webm"
      );
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

      // blob对象垃圾回收
      blob = null;
    }

    // 必须返回true，以确保sendResponse在异步操作完成前不被销毁
    return true;
  }
});
