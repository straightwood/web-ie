<template>
  <div id="main">
      <button id="backBtn" @click="back();clearInfo()"></button>
  </div>
</template>

<script>
export default {
    methods:{
        back(){
            this.$router.push('/main')
        },
        clearInfo(){
            fetch('api/web-ie/server/clear.php',{
                method:"POST",
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    Authorization:localStorage.getItem('Authorization'),//token
                    username:JSON.parse(localStorage.getItem("username")),
                }),
            }).then((res)=>{
                return res.json();
            }).then((res)=>{
                if(res[2].code==1){     
                   
                }else{
                    this.$Message.error(res[2].message);
                    this.$router.push('./index');
                }
            });
        }
    }
}
</script>


<style scoped>
#main{
    background: url('../../../assets/break/failed.png');
    width: 1920px;
    height: 1080px;
}
#backBtn{
    position: absolute;
    left:1600px;
    top:800px;
    background: url('../../../assets/break/back_failed.png') center center no-repeat;
    width: 150px;
    height: 164px;
}
</style>
