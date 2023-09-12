// 录制操作
export function recording(request, mediaRecorder, options, chunks) {
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
    })
    .catch((error) => {
      console.error("获取媒体流失败：", error);
    });
}
