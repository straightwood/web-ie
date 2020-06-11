<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
            this.audioAutoPlay('audio');
            // 自动播放音乐效果，解决微信自动播放问题
            document.addEventListener('touchstart',this.audioAutoPlay,false);
            document.addEventListener('WeixinJSBridgeReady', this.audioAutoPlay,false);
            let oAudio = document.querySelector("#audio");
            oAudio.onended = function () {//播放完毕，重新循环播放
                oAudio.load();
                oAudio.play();
            }
        },
  methods:{
    changeOn(){
                let oAudio = document.querySelector("#audio");
               if(this.isOff){
                oAudio.play();//让音频文件开始播放     
               }else{
                oAudio.pause();//让音频文件暂停播放 
               }
               this.isOff = !this.isOff;
    },
    audioAutoPlay() {
                let audio = document.getElementById('audio');
                    this.isOff = false;
                    audio.play();
                document.removeEventListener('touchstart',this.audioAutoPlay);
    },
  }
}
</script>


<style>
#app {
  margin: 0 auto;
}
button{
  border: 0px;
  outline: none;
}
</style>
