const Minio = require('minio');

let minioClient = new Minio.Client({
  endPoint: '101.43.247.121', // 地址
  port: 9007, // 端口号
  useSSL: true, // 是否使用ssl
  accessKey: 'dZXz35TMIdoD0ymw', // 登录的accessKey
  secretKey: 'Minio@VPSYvbNvdAplht3NdPCRbEt3nLifVM8y' // secretKey
});

// 视频流上传处理
export function uploadMinio(chunks, fileName, backetName) {
  const blob = new Blob(chunks, {
    type: chunks[0].type,
  });
  // 创建video元素
  const video = document.createElement("video");
  video.src = URL.createObjectURL(blob);
  video.controls = true;
  document.body.appendChild(video);
  const formData = new FormData();
  // 将blob对象添加到FormData对象中
  formData.append("video", blob, fileName);
  console.log(formData);
  minioClient.bucketExists(backetName, function(err, exists) {
    if (err) {
      return console.log(err)
    }
    if (exists) {
      return console.log('Bucket exists.')
    }
  });
}