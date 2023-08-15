## 屏幕录制浏览器插件

### 背景简介
  - 使用WebRTC技术实现对Web页面的录制并适配云端存储
  - 该云端存储方式可适配自己搭建的OSS，这样安全属性更高

### 插件功能
  - 提供录制方式：
    - 整个屏幕
    - 当前标签页
  - 自动同步至OSS：当前使用MinIO做为对象存储
  - 提供一键生成云端视频url跳转链接
  - 提供本地下载

### 备忘录
```
vue create [project name] # 创建VUE项目
vue add chrome-extension-cli # 构建chrome插件模板
npm install --save-install eslint # 安装eslint非全局
npx eslint --init # 初始化eslint
npm install # 初始化项目module
npm run build # 项目打包
```