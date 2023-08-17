// 视频流下载处理
export function downloadBlob(chunks, fileName) {
  const blob = new Blob(chunks, {
    type: chunks[0].type,
  });
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
