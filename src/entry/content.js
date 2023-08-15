console.log("content开始表演魔法啦~");

// 视频流下载处理
function download(chunks) {
  const blob = new Blob(chunks, {
    type: chunks[0].type,
  });
  const url = URL.createObjectURL(blob);
  console.log("url: " + url);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = "screenRecording.webm";
  a.click();
  URL.revokeObjectURL(url);
}

// 视频流上传处理
function upload(chunks) {
  const blob = new Blob(chunks, {
    type: chunks[0].type,
  });
  const fileName = "screenRecording.mp4";
  const formData = new FormData;
  // 将blob对象添加到FormData对象中
  formData.append('file', blob, fileName);
  console.log(formData);
}

let mediaRecorder;
let chunks = [];
let options = {
  mimeType: "video/webm; codecs=h264",
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "StartRecord") {
    navigator.mediaDevices.getDisplayMedia({
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
        }

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
  }

  if (request.action === "download") {
    if (request.downloadMethod === "local") {
      download(chunks);
      sendResponse({
        msg: "下载成功",
      });
    }

    if (request.downloadMethod === "clound") {
      upload(chunks);
      sendResponse({
        msg: "上传成功",
      });
    }
  }

  // 必须返回true，以确保sendResponse在异步操作完成前不被销毁
  return true;
});
