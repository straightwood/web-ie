<template>
  <div id="app">
    <img src="./assets/indexBG.jpg">
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
      <Card id="loginCard" class="cardClass" v-if="showLoginCard ">
        <Icon type="ios-close" @click="userLogin"/>
          <Form ref="formInline1" :model="formInline1" :rules="ruleInline">
              <FormItem prop="username">
                  <Input type="text"
                        size="large" 
                        v-model="formInline1.username" 
                        maxlength="10" 
                        show-word-limit 
                        placeholder="Username..." 
                  />
              </FormItem>
              <FormItem prop="password">
                  <Input type="password" 
                        size="large"
                        v-model="formInline1.password"
                        password 
                        placeholder="Password..."
                  />
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="handleLogin('formInline1');userLogin()">登录</Button>
              </FormItem>
          </Form>
      </Card>

      <!-- 注册卡片 --><!-- 验证规则没独立 -->
      <Card id="registerCard" class="cardClass" v-if="showRegisterCard">
          <Icon type="ios-close" @click="userRegister"/>
          <Form ref="formInline2" :model="formInline2" :rules="ruleInline">
              <FormItem prop="username">
                  <Input type="text"
                        size="large" 
                        v-model="formInline2.username" 
                        maxlength="10" 
                        show-word-limit 
                        placeholder="Username..." 
                  />
              </FormItem>
              <FormItem prop="nickname">
                  <Input type="text"
                        size="large" 
                        v-model="formInline2.nickname" 
                        maxlength="10" 
                        show-word-limit 
                        placeholder="Nickname..." 
                  />
              </FormItem>
              <FormItem prop="password">
                  <Input type="password" 
                        size="large"
                        v-model="formInline2.password"
                        password 
                        placeholder="Password..."
                  />
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="handleRegister('formInline2');userRegister()">注册</Button>
              </FormItem>
          </Form>
      </Card>
      <Card id="instrucCard" class="cardClass" v-if="showInstrucCard">
        <!-- <img src = "./assets/gameImg.jpg"/> -->
      </Card>
    </div>
    

  </div>
</template>



<script>
export default {
    name:'App',
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
                ]
            }
        }
    },
    methods:{
        judgeCard(){
          if(this.showLoginCard==true){
            this.showRegisterCard==false; this.$options.methods.userRegister();
            this.showInstrucCard==false;
          }else if(this.showRegisterCard==true){
            this.showLoginCard==false; this.$options.methods.userLogin();
            this.showInstrucCard==false;
          }else if(this.showInstrucCard==true){
            this.showLoginCard==false; this.$options.methods.userLogin();
            this.showRegisterCard==false; this.$options.methods.userRegister();
          }
        },
        userLogin(){
          this.showLoginCard = !this.showLoginCard;
          // this.$options.methods.judgeCard();
          if(this.showLoginCard==true){
            this.showRegisterCard==false; 
            // this.$options.methods.userRegister();
            this.showInstrucCard==false;
          }
        },
        handleLogin(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                  fetch("api/web-ie/server/login.php",{
                    method:"POST",
                    headers:{
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    //body:JSON.stringify(this.formInline),
                    body:JSON.stringify({
                      username:this.formInline1.username,
                      password:this.formInline1.password
                    }),
                  }).then(res=> { return res.json()
                    }).then(res=>{
                      console.log(res[0].code);
                      if(res[0].code == 1){
                        this.$Message.success(res[0].message);
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
          this.$options.methods.judgeCard();
        },
        handleRegister(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                  fetch("api/web-ie/server/register.php",{
                    method:"POST",
                    headers:{
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    //body:JSON.stringify(this.formInline),
                    body:JSON.stringify({
                      username:this.formInline2.username,
                      password:this.formInline2.password,
                      nickname:this.formInline2.nickname
                    }),
                  }).then(res=> { return res.json()
                    }).then(res=>{
                      // console.log(res[0].code);
                      if(res[0].code == 1){
                        // alert
                        this.$Message.success(res[0].message);
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
          this.$options.methods.judgeCard();
        },
    }

}
</script>




<style scoped>
#app{
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
  background: url("./assets/loginBtn.png") -30px -10px no-repeat;
}
#registerButton{
  background: url("./assets/registerBtn.png") center center no-repeat;
}
#instrucButton{
  background: url("./assets/instrucBtn.png") center center no-repeat;
}

#cardBox{
  position: relative;
  margin: 0;
}
.cardClass{
  /* 覆盖组件 */
  border:0;
  border-radius: 0px;
  width: 1920px;
  height: 1080px;
}
#instrucCard{
  background: url("./assets/gameImg.jpg");
  position: absolute;
  padding: 0;
  margin:-1080px 0px ;
}
</style>
