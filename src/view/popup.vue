<template>
  <div class="main_app">
    <el-container>
      <el-header>
        <h2>{{msg}}</h2>
      </el-header>
      <el-main>
        <el-row class="row" :gutter="20">
          <el-col :span="12">
            <el-button class="method-button" type="primary" plain>
              <el-icon :size="30" class="icon">
                <i-ep-Platform />
              </el-icon>
              <span class="icon-span">整个屏幕</span>
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button class="method-button" type="primary" plain>
              <el-icon :size="30" class="icon">
                <i-ep-Monitor />
              </el-icon>
              <span class="icon-span">当前页面</span>
            </el-button>
          </el-col>
        </el-row>
        <el-row class="row" :gutter="20">
          <el-col :span="12">
            <el-switch class="switch" v-model="microPhone" size="large" inline-prompt active-text="麦克风开" inactive-text="麦克风关"/>
          </el-col>
          <el-col :span="12">
            <el-switch class="switch" v-model="camera" size="large" inline-prompt active-text="摄像头开" inactive-text="摄像头关"/>
          </el-col>
        </el-row>
        <el-row class="row" :gutter="20">
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
        <el-row class="row" :gutter="20">
          <el-col :span="24">
            <el-button class="video-button" type="primary">开始录制</el-button>
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
      microPhone: '关',
      camera: '关',
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
  width: 300px;
  height: 100%;
  .row {
    margin-bottom: 5px;
    .method-button {
      margin-top: 20px;
      height: 120px;
      width: 130px;
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      .icon-span {
        margin-top: 5px;
      }
    }
    .switch {
      margin-top: 10px;
    }
    .select {
      margin-top: 10px;
      width: 130px;
    }
    .setting-button {
      margin-top: 10px;
      height: 30px;
      width: 50px;
    }
    .video-button {
      margin-top: 60px;
      height: 45px;
      width: 270px;
    }
  }
}
</style>
