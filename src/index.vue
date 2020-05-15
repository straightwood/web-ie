<template>
  <div id="app">
    <!-- <img src="./assets/indexbg.jpg"> -->

    <Button id="loginButton"
            :size="buttonSize"
            @click="userLogin"  
    >登录</Button>

    <Button id="registerButton" 
            :size="buttonSize" 
    >注册</Button>
    
    <Card id="card" v-if="showCard">
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="username">
                <Input type="text"
                      size="large" 
                      v-model="formInline.username" 
                      maxlength="10" 
                      show-word-limit 
                      placeholder="Username..." 
                />
            </FormItem>
            <FormItem prop="password">
                <Input type="password" 
                      size="large"
                      v-model="formInline.password"
                      password 
                      placeholder="Password..."
                />
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleLogin('formInline');userLogin()">登录</Button>
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
            showCard: false,

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
                ]
            }
        }
    },
    methods:{
        userLogin(){
          this.showCard = !this.showCard;
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
                      username:this.formInline.username,
                      password:this.formInline.password
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
