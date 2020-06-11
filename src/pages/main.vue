<template>
    <div id="main">
        <!-- <img src="../assets/main/paperBG.png"> -->
        <div class="aside">
            <div :class="{bgColors:1==current}" class="aside_text">
                <div class="chinese" @click="changeColor(1);handleMain();"> 学习—</div>
                <div class="english">STUDY</div>
            </div>
            <div :class="{bgColors:2==current}" class="aside_text">
                <div class="chinese" @click="changeColor(2);handleBoard();">金榜—</div>
                <div class="english">LEADERBOARD</div>
            </div>
            <div :class="{bgColors:3==current}" class="aside_text">
                <div class="chinese" @click="changeColor(3);handleLogout();">登出—</div>
                <div class="english">LOGOUT</div>
            </div>
        </div>
        <div class="title"></div>
        <div class="selection">
            <button 
            class="select_button"  id="examBtn" 
            @click="handleExam" @mouseenter="PlaySound()" @mouseleave="StopSound()"></button>
            <button class="select_button" id="studyBtn" 
            @click="handleStudy" @mouseenter="PlaySound()" @mouseleave="StopSound()"></button>
            <button class="select_button" id="thinkBtn" 
            @click="handleThink" @mouseenter="PlaySound()" @mouseleave="StopSound()"></button>
        </div>
    
        <audio ref="audio" :src="audioUrl"></audio>

    </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default{
    data(){
        return{
            color:false,
            current:1,

            audioUrl:require('../music/悬停按钮音效.wav'),//声音文件
        };
    },
    methods:{
        ...mapMutations(['changeLogin']),
        changeColor(num){
            this.current=num;
        },
        handleMain(){
            this.$router.push('./main');
        },
        handleBoard(){
            this.$router.push('/board');
            
        },
        handleLogout(){
            this.$Modal.confirm({
                title: '确认要退出登录吗？',
                onOk: () => {
                    this.$Message.info('已退出登录！');
                    this.changeLogin({ Authorization: '' });
                    this.$router.push('/index');
                },
                onCancel: () => {
                }
            });
            
        },
        handleExam(){
            this.judge();
            this.$router.push('/main/exam/xsExam');
        },
        handleStudy(){
            this.$router.push('/main/study');
        },
        handleThink(){
            this.$router.push('/main/think');
        },
        PlaySound() {
            this.$refs.audio.play();
        },
        StopSound() {
            this.$refs.audio.pause();
            this.$refs.audio.currentTime = 0;
        }
    },
}
</script>

<style scoped>
#main{
  position: relative;
  background: url('../assets/main/paperBG.png');
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
.title{
    position: absolute;
    background: url('../assets/main/kkTitle.png') no-repeat;
    width: 300px;
    height: 80px;
    left: 200px;
    top:150px;
}
.selection{
    position: absolute;
    width:1500px;
    left: 400px;
    top:300px;
}
.selection .select_button{
    /* position: absolute; */
    width:241px;
    height: 360px;
    margin: 60px;
}
#examBtn{
    background: url('../assets/main/examBtn.png') no-repeat;
}
#studyBtn{
    background: url('../assets/main/studyBtn.png') no-repeat;
}
#thinkBtn{
    background: url('../assets/main/thinkBtn.png') no-repeat;
}
.bgColors{
    color:rgb(195, 1, 1);
}

</style>