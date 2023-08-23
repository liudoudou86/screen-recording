// 视频流下载处理
export function downloadBlob(blob, fileName) {
  console.log(blob);
  const url = URL.createObjectURL(blob);
  console.log("url: " + url);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
