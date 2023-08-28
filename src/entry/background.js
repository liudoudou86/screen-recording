console.log("欢迎来到background的空间!");
import { Client } from "minio";
import { Buffer } from "buffer";
import { Stream } from "stream";
import { base64ToBlob } from "./change.js";

chrome.runtime.onMessage.addListener( function (request, sender, sendResponse) {
  if (request.action === "UploadMinio") {
    const minioClient = new Client({
      endPoint: "101.43.247.121", // 地址
      port: 9007, // 端口号
      useSSL: false, // 是否使用ssl
      accessKey: "admin", // 登录的accessKey
      secretKey: "Minio@860704", // secretKey
    });

    console.log(request.base64Str);
    let blob = base64ToBlob(request.base64Str, request.type);
    console.log(blob);

    const reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.onload = function (ex) {
      //定义流
      const bufferStream = new Stream.PassThrough();
      //将buffer写入
      bufferStream.end(Buffer.from(ex.target.result));

      const metaData = {
        'Content-Type': request.type
      };

      minioClient.putObject(
        request.backetName,
        request.fileName,
        bufferStream,
        metaData,
        function (err, etag) {
          if (err) {
            console.log(err, etag);
          } else {
            console.log("File uploaded successfully");
            sendResponse({
              msg: "上传成功",
            });
          }
        }
      );
    }
  }

  // 确保异步处理完成前不关闭消息监听器
  return true;
});
