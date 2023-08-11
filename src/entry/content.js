console.log("content开始表演魔法啦~");

function download(chunks) {
  const blob = new Blob(chunks, {
    type: chunks[0].type,
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  console.log("url: " + a.href);
  a.download = "video.webm";
  a.click();
  URL.revokeObjectURL(url);
}

let stream;
let mediaRecorder;
let chunks = [];
let options = {
  mimeType: "video/webm; codecs=vp9",
};

chrome.runtime.onMessage.addListener(function (request, _sender, sendResponse) {
  if (request.action === "StartRecord") {
    navigator.mediaDevices.getDisplayMedia({
        audio: request.audio,
        video: request.video,
      })
      .then((mediaStream) => {
        stream = mediaStream;
        mediaRecorder = new MediaRecorder(stream, options);
        mediaRecorder.ondataavailable = function (e) {
          console.log(e);
          chunks.push(e.data);
        };
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

  if (request.action === "StopRecord") {
    if (mediaRecorder) {
      mediaRecorder.onstop = function () {
        download(chunks);
        sendResponse({
          msg: "结束录制",
        });
      };

      mediaRecorder.stop();
      console.log("当前状态: " + mediaRecorder.state);
    } else {
      console.error("mediaRecorder对象未定义");
      sendResponse({
        msg: "mediaRecorder对象未定义",
      });
    }
  }

  // 必须返回true，以确保sendResponse在异步操作完成前不被销毁
  return true;
});
