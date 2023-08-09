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
          <el-col :span="24">
            <el-button class="video-button" type="primary" @click="startRecording()">开始录制</el-button>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
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
      // 获取用户媒体设备权限
      navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        .then(function(stream) {
          // 创建MediaRecorder对象
          var mediaRecorder = new MediaRecorder(stream);
          
          // 监听录制数据可用事件
          mediaRecorder.ondataavailable = function(e) {
            // 处理录制的数据
            // e.data即为录制的媒体数据
            console.log(e);
          };
          
          // 开始录制
          mediaRecorder.start();
          
          // 在需要停止录制时调用mediaRecorder.stop();
        })
        .catch(function(error) {
          // 处理获取权限失败的情况
          console.log(error);
        });
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
      width: 270px;
    }
  }
}
</style>
