// blob对象转换base64
export function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (et) => {
      resolve(et.target.result);
    };
    reader.readAsDataURL(blob);
    reader.onerror = () => {
      reject(new Error("blobToBase64 error"));
    };
  });
}

// base64转换blob对象
export function base64ToBlob(base64, type) {
  //base64 解码
  let byteString = atob(base64.split(",")[1]);
  //创建缓冲数组
  let arrayBuffer = new ArrayBuffer(byteString.length);
  //创建视图
  let intArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([intArray], { type: type });
}
