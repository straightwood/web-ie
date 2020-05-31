<template>
  <div id="main">
    <img src="../assets/indexBG.jpg">
    <div id="cardBox">
      <!-- 登录卡片 -->
      <Card id="loginCard" class="cardClass" :bordered="false" dis-hover>
        <button class ="cancelBtn" @click="backIndex('login')"></button>
          <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="120">
              <FormItem label="用户名" prop="username">
                  <Input type="text"
                        size="large" 
                        v-model="formInline.username" 
                        placeholder="Username..." 
                  />
              </FormItem>
              <FormItem label="密码" prop="password">
                  <Input type="password" 
                        size="large"
                        v-model="formInline.password"
                        password 
                        placeholder="Password..."
                  />
              </FormItem>
              <FormItem>
                  <Button id="card_login" type="primary" @click="handleLogin('formInline')"></Button>
              </FormItem>
          </Form>
      </Card>
    </div>
  </div>
</template>



<script>
import { mapMutations } from 'vuex';//########0525标记
export default {
    name:'App',
    data(){
        return {
            userToken:'',
            //表单
            formInline: {
                username: '',
                password: ''
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
            }
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
          this.$router.push('/login')
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
                      username:this.formInline.username,
                      password:this.formInline.password
                    }),
                  }).then(res=> { return res.json()
                    }).then(res=>{
                      if(res[0].code == 1){
                        this.userToken = res[0].token;
                        this.changeLogin({ Authorization: this.userToken });
                        this.showLoginCard = false;
                        this.$Message.success(res[0].message);
                        this.$router.push('/main');
                      }else{
                        this.$Message.error(res[0].message);
                      }
                    });
                } else {
                    this.$Message.error();
                }
            })
        },
        
    }

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

#cardBox{
  position: relative;
  margin: 0;
}
.cardClass{
  background: url("../assets/cardBG.png");
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
  background: url("../assets/loginButton.png") -25px -5px no-repeat;
  border: 0;
  width: 210px;
  height:40px;
  margin: 20px 20px;
}
.cancelBtn{
  background: url('../assets/cancelButton.png') center center no-repeat;
  width: 22px;
  height: 22px;
  position: absolute;
  margin: 5% 82%;
  border: 0px;
  outline: none;
}
</style>
