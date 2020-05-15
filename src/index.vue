<template>
  <div id="app">
    <!-- <img src="./assets/indexbg.jpg"> -->

    <Button id="loginButton"
            :size="buttonSize"
            @click="userLogin"  
    >登录</Button>

    <Button id="registerButton" 
            :size="buttonSize"
            @click="userRegister" 
    >注册</Button>
    
    <!-- 登录卡片 -->
    <Card id="card" v-if="showLoginCard ">
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
    <Card id="card" v-if="showRegisterCard">
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
        //注册
        userRegister(){
          this.showRegisterCard = !this.showRegisterCard;
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
        }
    }

}
</script>




<style scoped>
/* #app{
  position: relative;
  width:1920px;
  height: 1080px;
}
img{ 
  width:100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
button{
  position: absolute;
  margin-left: -60%;
  width: 300px;
  height: 50px;
}
#loginButton{
  margin-top: 600px;
  background-color:bisque;
}
#registerButton{
  margin-top: 680px; 
} */
/* #card{
  box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.719);;
  text-align: center;
  margin: -1000px 680px;
  width: 400px;
  height: 600px;
} */
</style>
