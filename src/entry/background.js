console.log('欢迎来到background的空间!');
import { Client } from 'minio';
import { Buffer } from 'buffer';

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "UploadMinio") {
    const minioClient = new Client({
      endPoint: '101.43.247.121', // 地址
      port: 9007, // 端口号
      useSSL: false, // 是否使用ssl
      accessKey: 'admin', // 登录的accessKey
      secretKey: 'Minio@860704' // secretKey
    });
    const blob = new Blob(request.chunks, {
      type: request.chunks[0].type,
    });
    const reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.onload = function(ex) {
      //定义流
      const buffer = Buffer.from(ex.target.result);
      minioClient.putObject(request.backetName, request.fileName, buffer, function(err, etag) {
        if (err) {
          return console.log(err, etag);
        } else {
          console.log('File uploaded successfully');
        }
      });
    };
    sendResponse({
      msg: "上传成功",
    });
  }
})