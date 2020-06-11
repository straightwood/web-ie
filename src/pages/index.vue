<template>
  <div id="main">
    <img src="../assets/index/indexBG.jpg">

    <div id="btnBox">
      <Button type="text"
              id="loginButton"
              class="btnClass"
              @click="userLogin"  
      ></Button>
      <Button type="text"
              id="registerButton" 
              class="btnClass"
              @click="userRegister" 
      ></Button>
      <Button type="text"
              id="instrucButton" 
              class="btnClass"
              @click="userInstruc" 
      ></Button>
    </div>
    
    <div id="cardBox">
      <!-- 登录卡片 -->
      <Card id="loginCard" class="cardClass" :bordered="false" v-if="showLoginCard " dis-hover>
        <button class ="cancelBtn" @click="backIndex('login')"></button>
          <Form ref="formInline1" :model="formInline1" :rules="ruleInline" :label-width="120">
              <FormItem label="用户名" prop="username">
                  <Input type="text"
                        size="large" 
                        v-model="formInline1.username" 
                        placeholder="请输入用户名..." 
                  />
              </FormItem>
              <FormItem label="密码" prop="password">
                  <Input type="password" 
                        size="large"
                        v-model="formInline1.password"
                        password 
                        placeholder="请输入密码..."
                  />
              </FormItem>
              <FormItem>
                  <Button id="card_login" type="primary" @click="handleLogin('formInline1')"></Button>
              </FormItem>
          </Form>
      </Card>

      <!-- 注册卡片 --><!-- 验证规则没独立 -->
      <Card  class="cardClass" :bordered="false" v-if="showRegisterCard" dis-hover>
          <button class ="cancelBtn" @click="backIndex('regist')"></button>
          <Form ref="formInline2" :model="formInline2" :rules="ruleInline" :label-width="120">
              <FormItem label="用户名" prop="username">
                  <Input type="text"
                        size="large" 
                        v-model="formInline2.username"  
                        placeholder="请输入用户名..." 
                  />
              </FormItem>
              <FormItem label="昵称" prop="nickname">
                  <Input type="text"
                        size="large" 
                        v-model="formInline2.nickname" 
                        maxlength="5" 
                        show-word-limit 
                        placeholder="请输入昵称..." 
                  />
              </FormItem>
              <FormItem label="设置密码" prop="password">
                  <Input type="password" 
                        size="large"
                        v-model="formInline2.password"
                        password 
                        placeholder="请输入密码..."
                  />
              </FormItem>
              <FormItem>
                  <Button id="card_regist" type="primary" @click="handleRegister('formInline2')"></Button>
              </FormItem>
          </Form>
      </Card>
      <Card id="instrucCard" :bordered="false" v-if="showInstrucCard" dis-hover>
        <!-- <Button id ="backBtn" :size="buttonSize" type="text" @click="backIndex"></Button> -->
        <button id ="backBtn" @click="backIndex('ins')"></button>
      </Card>
    </div>
    
    <audio preload="auto" loop id="audio" :src="require('../music/首页背景音乐.mp3')"></audio>
	  <div @click="changeOn" :class="isOff?'isOff':'isOn'"></div>
  </div>
</template>



<script>
import { mapMutations } from 'vuex';
export default {
    data(){
        return {
            buttonSize: 'large',//button大小
            username: '',
            password: '',
            showLoginCard: false,//登录卡片
            showRegisterCard:false,//注册卡片
            showInstrucCard:false,
            
            //表单
            formInline1: {
                username: '',
                password: ''
            },
            formInline2: {
                username: '',
                password: '',
                nickname: ''
            },
            ruleInline: {
                username: [
                    { required: true, message: '请填写账号！', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码！', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码至少6位！', trigger: 'blur' }
                ],
                nickname: [
                    { required: true, message: '请输入昵称！', trigger: 'blur' },
                ]
            },
            isOff:true
        }
    },
    mounted() {
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
        ...mapMutations(['changeLogin']),
        backIndex(name){
          if(name=="login") this.showLoginCard = false;//this.$option.methods.userLogin()调用后 值改变 div状态不刷新
          if(name=="regist") this.showRegisterCard = false;
          if(name=="ins") this.showInstrucCard = false;
        },
        userLogin(){
          this.showLoginCard = !this.showLoginCard;
        },
        handleLogin(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                  fetch("api/web-ie/server/login.php",{
                    method:"POST",
                    headers:{
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    //body:JSON.stringify(this.formInline),
                    body:JSON.stringify({
                      Authorization:'',
                      username:this.formInline1.username,
                      password:this.formInline1.password
                    }),
                  }).then(res=> { return res.json()
                    }).then(res=>{
                      if(res[0].code == 1){
                        this.userToken = res[0].token;
                        this.changeLogin({ Authorization: this.userToken });
                        localStorage.setItem('username', JSON.stringify(this.formInline1.username));
                        localStorage.setItem('nickname', res[1][0].nickname);

                        this.showLoginCard = false;
                        this.$Message.success(res[0].message);
                        this.$router.push('/main')
                      }else{
                        this.$Message.error(res[0].message);
                      }
                    });
                } else {
                    this.$Message.error();
                }
            })
        },
        //注册
        userRegister(){
          this.showRegisterCard = !this.showRegisterCard;
          //console.log(this.showRegisterCard);
        },
        handleRegister(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                  fetch("api/web-ie/server/register.php",{
                    method:"POST",
                    headers:{
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    //body:JSON.stringify(this.formInline),
                    body:JSON.stringify({
                      Authorization:'',
                      username:this.formInline2.username,
                      password:this.formInline2.password,
                      nickname:this.formInline2.nickname
                    }),
                  }).then(res=> { return res.json()
                    }).then(res=>{
                      console.log(res);
                      if(res[0].code == 1){
                        this.userToken = res[0].token;
                        this.changeLogin({ Authorization: this.userToken });
                        localStorage.setItem('username', JSON.stringify(this.formInline2.username));
                        localStorage.setItem('nickname', this.formInline2.nickname);
                        // console.log(localStorage.getItem('nickname'));
                        // console.log(localStorage.getItem('username'));

                        this.showRegisterCard = false;
                        this.$Message.success(res[0].message);
                        this.$router.push('/main')  
                      }else{
                        this.$Message.error(res[0].message);
                      }
                    });
                } else {
                    this.$Message.error();
                }
            })
        },
        //游戏说明
        userInstruc(){
          this.showInstrucCard = !this.showInstrucCard;
        },
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
        }
    },
        
}
</script>




<style scoped>
#main{
  position: relative;
  width: 1920px;
  height: 1080px;
}
img{ 
  width:100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
#btnBox{
  position: absolute;
  margin: -570px 800px;
}
.btnClass{
  background-color:rgba(255, 255, 255, 0);
  width: 280px;
  height:90px;
  margin-top: 40px;
}
#loginButton{
  background: url("../assets/index/loginBtn.png") -30px -10px no-repeat;
}
#registerButton{
  background: url("../assets/index/registerBtn.png") -30px -10px no-repeat;
}
#instrucButton{
  background: url("../assets/index/instrucBtn.png") -30px -10px no-repeat;
}

#cardBox{
  position: relative;
  margin: 0;
}
.cardClass{
  background: url("../assets/index/cardBG.png");
  background-size: 100% 100%;
  position: absolute;
  border:0;
  border-radius: 0px;
  margin: -545px 620px;
  width: 650px;
  height: 375px;
}
form{
  width: 450px;
  position: absolute;
  margin:75px 60px;
}
#card_login {
  background: url("../assets/index/loginButton.png") -25px -5px no-repeat;
  border: 0;
  width: 210px;
  height:40px;
  margin: 20px 20px;
}
#card_regist{
  background: url("../assets/index/registerButton.png") -25px -5px no-repeat;
  border: 0;
  width: 210px;
  height:40px;
  margin: 0 20px;
}
#instrucCard{
  background: url("../assets/index/gameImg.jpg");
  position: absolute;
  padding: 0;
  width: 1920px;
  height: 1080px;
  margin:-1085px 0px ;/* ############## why1085?? */
}
.cancelBtn{
  background: url('../assets/index/cancelButton.png') center center no-repeat;
  width: 22px;
  height: 22px;
  position: absolute;
  margin: 5% 80%;
  border: 0px;
  outline: none;
}
#backBtn{
  background: url('../assets/index/backBtn.png') center center no-repeat;
  width: 120px;
  height: 85px;
  margin-top:3%;
  margin-left: 90%;
  border: 0px;
  outline: none;
}

.isOn{
    width: 28px;
    height: 28px;
    position: fixed;
    z-index: 2000;
    top: 20px;
    left: 20px;
     -webkit-animation: rotating 1.2s linear infinite;
    animation: rotating 1.2s linear infinite;
    background: url("../assets/study/jiexiclosebtn.png") 0 0 no-repeat;
    background-size:100%; 
}
.isOff{
    width: 28px;
    height: 28px;
    position: fixed;
    z-index: 2000;
    top: 20px;
    left: 20px;
    background: url("../assets/index/cancelButton.png") 0 -28px no-repeat;
    background-size:100%; 
}
</style>
