console.log('欢迎来到background的空间!');
import { Client } from 'minio';

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "UploadMinio") {
    console.log('我进来了~')
    const minioClient = new Client({
      endPoint: '101.43.247.121', // 地址
      port: 9007, // 端口号
      useSSL: false, // 是否使用ssl
      accessKey: 'admin', // 登录的accessKey
      secretKey: 'Minio@860704' // secretKey
    });
    minioClient.bucketExists(request.backetName, function (err, exists) {
      if (err) {
        return console.log('查询报错: ' + err);
      }
      if (exists) {
        return console.log('Bucket exists.');
      }
    });
    sendResponse({
      msg: "上传成功-来自background",
    });
  }
})