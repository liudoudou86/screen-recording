<template>
  <div class="main_app">
    <el-container>
      <el-header>
        <h2>{{msg}}</h2>
      </el-header>
      <el-main>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <el-text class="title" type="primary" size="large">Minio相关配置</el-text>
            </div>
          </template>
          <el-row class="row" :gutter="20">
            <el-col :span="6">
              <el-tag class="text" size="large" type="primary" effect="dark" >MinIO地址: </el-tag>
            </el-col>
            <el-col :span="18">
              <el-input v-model="minioUrl" placeholder="请输入Url" @change="getUrl()" clearable>
                <template #prepend>Http://</template>
              </el-input>
            </el-col>
          </el-row>
          <el-row class="row" :gutter="20">
            <el-col :span="6">
              <el-tag class="text" size="large" type="primary" effect="dark" >MinIO端口: </el-tag>
            </el-col>
            <el-col :span="18">
              <el-input v-model="port" placeholder="请输入端口" @change="getPort()" clearable></el-input>
            </el-col>
          </el-row>
          <el-row class="row" :gutter="20">
            <el-col :span="6">
              <el-tag class="text" size="large" type="primary" effect="dark" >用户姓名: </el-tag>
            </el-col>
            <el-col :span="18">
              <el-input v-model="userName" placeholder="请输入用户名" @change="getUserName()" clearable></el-input>
            </el-col>
          </el-row>
          <el-row class="row" :gutter="20">
            <el-col :span="6">
              <el-tag class="text" size="large" type="primary" effect="dark" >用户密码: </el-tag>
            </el-col>
            <el-col :span="18">
              <el-input v-model="passWord" type="password" placeholder="请输入密码" @change="getPassWord()" show-password clearable></el-input>
            </el-col>
          </el-row>
          <el-row class="row" :gutter="20">
            <el-col :span="6">
              <el-tag class="text" size="large" type="primary" effect="dark" >MinIO桶名: </el-tag>
            </el-col>
            <el-col :span="18">
              <el-input v-model="bucketName" placeholder="请输入密码" @change="getBucketName()" clearable></el-input>
            </el-col>
          </el-row>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'optionsView',
  data () {
    return {
      msg: '设置',
      minioUrl: '',
      port: '',
      userName: '',
      passWord: '',
      bucketName: ''
    }
  },
  mounted() {
    // 读取存储方式
    this.minioUrl = window.localStorage.getItem("url");
    this.port = window.localStorage.getItem("port");
    this.userName = window.localStorage.getItem("userName");
    this.passWord = window.localStorage.getItem("passWord");
    this.bucketName = window.localStorage.getItem("bucketName");
  },
  methods: {
    getUrl() {
      window.localStorage.setItem("url", this.minioUrl);
    },
    getPort() {
      window.localStorage.setItem("port", this.port);
    },
    getUserName() {
      window.localStorage.setItem("userName", this.userName);
    },
    getPassWord() {
      window.localStorage.setItem("passWord", this.passWord);
    },
    getBucketName() {
      window.localStorage.setItem("bucketName", this.bucketName);
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
  margin-top: 60px;
  position: absolute;
  left: 650px;
  .box-card {
    position: relative;
    width: 500px;
    text-align: center;
    .title {
      text-align: center;
    }
    .row {
      margin-top: 10px;
    }
  }
}

</style>