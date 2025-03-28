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
              <el-input v-model="bucketName" placeholder="请输入桶名" @change="getBucketName()" clearable></el-input>
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
  overflow: hidden; // 修改为 hidden，处理所有方向的溢出
  width: 100%; // 添加宽度限制
  margin: 0; // 确保没有额外边距
  
  :deep(.el-header) {
    margin-top: 50px;  /* 调整这个值来改变距离 */
    padding-top: 0;
  }

  .el-container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto; // 添加水平居中
  }
  
  .el-main {
    display: flex;
    justify-content: center;
    padding: 0;
    width: 100%; // 添加宽度限制
    overflow: visible; // 防止内容被裁剪
  }
  
  .box-card {
    width: 100%; // 修改为100%
    max-width: 500px; // 增加一点最大宽度
    margin: 0 auto;
    text-align: center;

    :deep(.el-input) {
      width: 100%;
      
      .el-input__wrapper {
        width: 100%;
        box-sizing: border-box;
      }
    }

    .el-col {
      text-align: left;
      padding: 0 10px;  // 添加统一的左右内边距
      
      &:first-child {
        flex: 0 0 auto;
        padding-left: 0;  // 左侧不需要额外内边距
      }

      &:last-child {
        flex: 1;
        max-width: calc(100% - 20px);
        padding-right: 0;  // 右侧不需要额外内边距
      }
    }
    
    .row {
      margin: 15px 0;  // 修改为上下边距，左右边距设为0
      width: 100%;     // 改为100%宽度
      display: flex;
      align-items: center;
      padding: 0 10px; // 添加统一的左右内边距
    }
    :deep(.el-header) {
      margin-top: 300px;  /* 调整这个值来改变距离 */
      padding-top: 0;
    }
    &:first-child {
      margin-top: 10px;
    }
  }
}
</style>