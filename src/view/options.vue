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
              <el-text class="text" type="primary" size="large">Minio相关配置</el-text>
            </div>
          </template>
          <div>
            <el-row class="row" :gutter="20">
              <el-col :span="6">
                <el-tag class="text" size="large" type="primary" effect="plain" round>Endpoint</el-tag>
              </el-col>
              <el-col :span="18">
                <el-input
                      v-model= input
                      placeholder="请输入"
                      clearable
                    />
              </el-col>
            </el-row>
          </div>
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
      input: ''
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
  left: 700px;
  .box-card {
    position: relative;
    width: 500px;
    text-align: center;
    .text {
      text-align: center;
    }
  }
}

</style>