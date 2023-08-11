<template>
  <div class="main_app">
    <el-container>
      <el-header>
        <h2>{{ msg }}</h2>
      </el-header>
      <el-main>
        <el-row class="row1" justify="space-evenly">
          <el-col :span="12">
            <el-button class="method-button" type="primary" plain>
              <el-icon :size="50" class="icon">
                <i-ep-Platform />
              </el-icon>
              <span class="icon-span">整个屏幕</span>
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button class="method-button" type="primary" plain>
              <el-icon :size="50" class="icon">
                <i-ep-Monitor />
              </el-icon>
              <span class="icon-span">当前页面</span>
            </el-button>
          </el-col>
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
            <el-select class="select" v-model="select" placeholder="存储方式">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="6" :offset="6">
            <el-button class="setting-button" size="small" type="success" @click="goToSetting()" round>设置</el-button>
          </el-col>
        </el-row>
        <el-row class="row4" justify="space-evenly">
          <el-col :span="12">
            <el-button class="video-button" type="primary" @click="stopRecording()">结束录制</el-button>
          </el-col>
          <el-col :span="12">
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
      msg: '浏览器录制器',
      audio: false,
      video: false,
      select: '',
      options: [
        {
          id: 1,
          label: '本地存储',
          value: '本地存储'
        },
        {
          id: 2,
          label: '云端存储',
          value: '云端存储'
        }
      ]
    }
  },
  methods: {
    goToSetting() {
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
    stopRecording() {
      chrome.tabs.query(
          // 获取当前tab
          {
            active: true,
            currentWindow: true,
          },
          (tabs) => {
            const message = { 
              action: "StopRecord",
            };
            // 与content进行通信
            chrome.tabs.sendMessage(tabs[0].id, message, (res) => {
              console.log(res.msg);
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
    .method-button {
      height: 120px;
      width: 130px;
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      .icon-span {
        margin-top: 5px;
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
      width: 130px;
    }
  }
}
</style>
