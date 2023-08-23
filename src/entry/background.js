console.log("欢迎来到background的空间!");
import { Client } from "minio";
// import { Buffer } from "buffer";
// import { Stream } from "stream";

function fetchUploadFile(url, file) {
  fetch(url, {
    method: 'PUT',
    body: file,
  })
  .then((response) => {
    console.log(`上传成功`, response);
  })
  .catch((error) => {
    console.error(`上传失败`, error);
  });
}

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  if (request.action === "UploadMinio") {
    const minioClient = new Client({
      endPoint: "101.43.247.121", // 地址
      port: 9007, // 端口号
      useSSL: false, // 是否使用ssl
      accessKey: "admin", // 登录的accessKey
      secretKey: "Minio@860704", // secretKey
    });

    console.log(request.blob);
    const files = new File([request.blob], request.fileName, {type: request.type});
    const url = await minioClient.presignedPutObject(request.backetName, request.fileName);
    console.log(url);

    fetchUploadFile(url, files);
    sendResponse({
      msg: "上传成功",
    });

    // const reader = new FileReader();

    // reader.readAsArrayBuffer(request.blob);
    // reader.onload = function (ex) {
    //   //定义流
    //   const bufferStream = new Stream.PassThrough();
    //   //将buffer写入
    //   bufferStream.end(Buffer.from(ex.target.result));
    //   console.log(bufferStream);

    //   minioClient.putObject(
    //     request.backetName,
    //     request.fileName,
    //     bufferStream,
    //     function (err, etag) {
    //       if (err) {
    //         console.log(err, etag);
    //         sendResponse({
    //           msg: "上传失败",
    //         });
    //       } else {
    //         console.log("File uploaded successfully");
    //         sendResponse({
    //           msg: "上传成功",
    //         });
    //       }
    //     }
    //   );
    // };

    return true; // 确保异步处理完成前不关闭消息监听器
  }
});
