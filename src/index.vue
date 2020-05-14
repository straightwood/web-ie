<template>
  <div id="app">
    <img src="./assets/indexbg.jpg">

    <Button id="loginButton"
            :size="buttonSize"
            @click="userLogin"  
    >登录</Button>

    <Button id="registerButton" 
            :size="buttonSize" 
            ghost
    >注册</Button>
    
    <Card id="card" v-if="showCard">
        <div id="inputBox">
            <Input class="Input" 
              size="large"
              v-model="username" 
              maxlength="10" 
              show-word-limit 
              placeholder="Account..." 
        />
        <br><br>
        <Input class="Input"
              size="large"
              v-model="password" 
              type="password" 
              password 
              placeholder="Password..." 
        />
        <Button @click="userLogin">登录</Button>

        </div>
      
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
        }
    },
    methods:{
      userLogin(){
        this.showCard = !this.showCard;
      }
    }
}
</script>




<style scoped>
#app{
  position: relative;
  width:1920px;
  height: 1080px;
}
img{ 
  width:100%;
  /* height:100%; */
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
}
#card{
  /* position: absolute; */
  
  box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.719);;
  text-align: center;
  margin: -1000px 680px;
  width: 400px;
  height: 600px;
}
#inputBox{
  width:250px;
  margin: 0 auto;
  padding-top: 300px;
}
</style>
