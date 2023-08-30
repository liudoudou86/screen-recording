<template>
  <div class="main_app">
    <el-container>
      <el-header>
        <h2>{{ msg }}</h2>
      </el-header>
      <el-main>
        <el-row class="row1" justify="space-evenly">
          <el-radio-group v-model="vedioSelect" value-key="id" size="large" @change="getRadioValue()">
            <el-col :span="12">
              <el-radio-button class="raido-button" label="window">
                <el-icon class="icon" :size="80">
                  <i-ep-Monitor />
                </el-icon>
                <span class="icon-span">当前页面</span>
              </el-radio-button>
            </el-col>
            <el-col :span="12">
              <el-radio-button class="raido-button" label="monitor">
                <el-icon class="icon" :size="80">
                  <i-ep-Platform />
                </el-icon>
                <span class="icon-span">整个屏幕</span>
              </el-radio-button>
            </el-col>
          </el-radio-group>
        </el-row>
        <el-row class="row2" justify="space-evenly">
          <el-col :span="6">
            <el-tag class="text" size="large" type="primary" effect="plain" round>麦克风</el-tag>
          </el-col>
          <el-col :span="6">
            <el-switch class="switch" v-model="audio" size="large" inline-prompt active-text="开" inactive-text="关" />
          </el-col>
          <el-col :span="6">
            <el-tag class="text" size="large" type="primary" effect="plain" round>摄像头</el-tag>
          </el-col>
          <el-col :span="6">
            <el-switch class="switch" v-model="video" size="large" inline-prompt active-text="开" inactive-text="关" />
          </el-col>
        </el-row>
        <el-row class="row3" justify="space-evenly">
          <el-col :span="12">
            <el-select class="select" v-model="storageSelect" value-key="id" placeholder="存储方式" @change="changeStorage($event)">
              <el-option
                v-for="item in storageOptions"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-button class="setting-button" size="small" type="warning" @click="downloading()" round>导出</el-button>
          </el-col>
          <el-col :span="6">
            <el-button class="setting-button" size="small" type="success" @click="goToSetting()" round>设置</el-button>
          </el-col>
        </el-row>
        <el-row class="row4" justify="space-evenly">
          <el-col :span="24">
            <el-button class="video-button" type="primary" @click="startRecording()">开始录制</el-button>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';

export default {
  name: 'popupView',
  data () {
    return {
      msg: '浏览器录制',
      audio: false,
      video: false,
      vedioSelect: '',
      storageSelect: '',
      storageOptions: [
        {
          id: 1,
          label: '本地存储',
          value: 'local'
        },
        {
          id: 2,
          label: '云端存储',
          value: 'clound'
        }
      ]
    }
  },
  mounted() {
    // 读取存储方式
    this.storageSelect = window.localStorage.getItem("storageSelect");
    this.vedioSelect = window.localStorage.getItem("vedioSelect");
  },
  methods: {
    getRadioValue() {
      console.log("当前录屏方式: " + this.vedioSelect);
      window.localStorage.setItem("vedioSelect", this.vedioSelect);
    },
    changeStorage(value) {
      console.log("当前存储方式: " + value);
      window.localStorage.setItem("storageSelect", this.storageSelect);
    },
    goToSetting() {
      // 跳转至设置页面
      chrome.tabs.create({ 
        url: "extension://aoijlpeikgdnfdhhlfdcjkjpbdnkjmfk/html/options.html",
      });
    },
    startRecording() {
      console.log("audio: " + this.audio);
      console.log("video: " + this.video);
      if (!this.video) {
        ElMessage.error("需要摄像头权限!");
      } else {
        chrome.tabs.query(
          // 获取当前tab
          {
            active: true,
            currentWindow: true,
          },
          (tabs) => {
            const message = { 
              action: "StartRecord",
              audio: this.audio,
              video: {
                width: 1920,
                height: 1080,
                displaySurface: this.vedioSelect, // monitor是整个屏幕, window是当前窗口
              }
            };
            // 与content进行通信
            chrome.tabs.sendMessage(tabs[0].id, message, (res) => {
              console.log(res.msg);
            });
          }
        );
      }
    },
    downloading() {
      console.log("storageSelect: " + this.storageSelect);
      const url = window.localStorage.getItem("url");
      const port = window.localStorage.getItem("port");
      const userName = window.localStorage.getItem("userName");
      const passWord = window.localStorage.getItem("passWord");
      const bucketName = window.localStorage.getItem("bucketName");
      chrome.tabs.query(
        // 获取当前tab
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          const message = { 
            action: "output",
            downloadMethod: this.storageSelect,
            url: url,
            port: port,
            userName: userName,
            passWord: passWord,
            bucketName: bucketName
          };

          // 与content进行通信
          chrome.tabs.sendMessage(tabs[0].id, message, (res) => {
              console.log(res.message);
              const videoAddress = 'http://' + url + ':' + port + '/' + bucketName + '/' + res.message;
              ElMessage.success(videoAddress);
              // 将内容添加进系统剪贴板，完成一键复制
              navigator.clipboard
                .writeText(videoAddress)
                .then(() => {
                  console.log("复制成功");
                })
                .catch((err) => {
                  console.log("复制失败" + err);
                });
          });
        }
      );
    }
  }
}

</script>

<style lang="less" scoped>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 5px;
  position: relative;
  width: 330px;
  height: 100%;
  .row1 {
    margin-top: 20px;
    .raido-button {
      width: 130px;
      .icon-span {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .icon {
        margin-bottom: 10px;
      }
    }
  }
  .row2 {
    margin-top: 20px;
    .text {
      text-align: center;
    }
  }
  .row3 {
    margin-top: 20px;
    .select {
      width: 130px;
    }
    .setting-button {
      height: 30px;
      width: 50px;
    }
  }
  .row4 {
    margin-top: 60px;
    .video-button {
      height: 45px;
      width: 260px;
    }
  }
}
</style>
