<template>
  <div id="app">
    <img src="./assets/indexbg.jpg">
    <router-view/>
    <!-- 进度条 -->
    <Steps :current="1">
        <Step title="已完成" content="这里是该步骤的描述信息"></Step>
        <Step title="进行中" content="这里是该步骤的描述信息"></Step>
        <Step title="待进行" content="这里是该步骤的描述信息"></Step>
        <Step title="待进行" content="这里是该步骤的描述信息"></Step>
    </Steps>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;*/
  text-align: center;
  margin: 0 auto;
  /* color: #2c3e50;
  margin-top: 60px;  */
}
body {
    /* font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif; */
    font-size: 14px;
    line-height: 0;
    background-color: #fff;
}
/* Button{
  border:0px;
  outline: none;
} */
button{ /*没生效*/
  border: 0px;
  outline: none;
}
</style>
