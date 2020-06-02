<template>
  <div id="main">
    <div class="aside">
        <div :class="{bgColors:1==current}" class="aside_text">
            <div class="chinese" @click="changeColor(1);handleMain()">学习—</div>
            <div class="english">STUDY</div>
        </div>
        <div :class="{bgColors:2==current}" class="aside_text">
            <div class="chinese" @click="changeColor(2);handleBoard()">金榜—</div>
            <div class="english">LEADERBOARD</div>
        </div>
        <div :class="{bgColors:3==current}" class="aside_text">
            <div class="chinese" @click="changeColor(3);handleLogout()">登出—</div>
            <div class="english">LOGOUT</div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
      return{
          color:false,
          current:2,

      };
  },
  methods:{
    
    changeColor(num){
      console.log(this.current);
        this.current=num;
    },
    handleMain(){
        this.$router.push('./main');
    },
    handleBoard(){
        this.$router.push('./board');
    },
    handleLogout(){
        this.$Modal.confirm({
            title: '确认要退出登录吗？',
            onOk: () => {
                this.$Message.info('已退出登录！');
                this.changeLogin({ Authorization: '' });
                this.$router.push('./index');
            },
            onCancel: () => {
            }
        });
        
    },
  }
}
</script>

<style>
#main{
  position: relative;
  background: url('../assets/boardBG.png');
  width: 1920px;
  height: 1080px;
}
.aside{
    position: absolute;
    background-color:#F0EFEB;
    width:70px;
    height: 1080px;
    padding: 25px;
}
.aside_text{
    margin-bottom: 60px;
}
.aside_text .chinese{
    font-family: Arial,STKaiti,"楷体";
    line-height: 1;
    width: 15px;
    font-size: 30px;
}
.aside_text .english{
    padding-left: 7px;
    font-family: Arial,STKaiti,"楷体";
    word-wrap: break-word;
    line-height: 1;
    width: 15px;
    /* rotate: 90deg; */
}
</style>
