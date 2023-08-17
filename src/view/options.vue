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
              <el-tag class="text" size="large" type="primary" effect="plain" round>MinIO地址</el-tag>
            </el-col>
            <el-col :span="18">
              <el-input v-model="minioUrl" placeholder="请输入" clearable>
                <template #prepend>Http://</template>
              </el-input>
            </el-col>
          </el-row>
          <el-row class="row" :gutter="20">
            <el-col :span="6">
              <el-tag class="text" size="large" type="primary" effect="plain" round>端口: </el-tag>
            </el-col>
            <el-col :span="18">
              <el-input v-model="port" placeholder="请输入" clearable></el-input>
            </el-col>
          </el-row>
          <el-row class="row" :gutter="20">
            <el-col :span="6">
              <el-tag class="text" size="large" type="primary" effect="plain" round>UserName</el-tag>
            </el-col>
            <el-col :span="18">
              <el-input v-model="userName" placeholder="请输入" clearable></el-input>
            </el-col>
          </el-row>
          <el-row class="row" :gutter="20">
            <el-col :span="6">
              <el-tag class="text" size="large" type="primary" effect="plain" round>PassWord</el-tag>
            </el-col>
            <el-col :span="18">
              <el-input v-model="passWord" placeholder="请输入" clearable></el-input>
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
      passWord: ''
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