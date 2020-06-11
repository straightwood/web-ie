<template>
  <div id="main">
        <button id="backBtn" @click="back();clearInfo()"></button>
        <div id="xsScore" class="score">{{xsScore}}</div>
        <div id="hsScore" class="score">{{hsScore}}</div>
        <div id="dsScore" class="score">{{dsScore}}</div>
        <div id="totalScore" class="score">{{totalScore}}</div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            xsScore:'',
            hsScore:'',
            dsScore:'',
            totalScore:'',
        }
    },
    mounted(){
        this.getScore();
    },
    methods:{
        back(){
            this.$router.push('/main');
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
                    this.$router.push('/index');
                }
            });
        },
        getScore(){
            fetch('api/web-ie/server/score.php',{
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
                   this.totalScore=res[1][0].score;
                   this.xsScore=res[0][0].score;
                   this.hsScore=res[0][1].score;
                   this.dsScore=res[0][2].score;
                   console.log(this.totalScore,this.xsScore,this.hsScore,this.dsScore)

                }else{
                    this.$Message.error(res[2].message);
                    this.$router.push('/index');
                }
            });
        }
    }
}
</script>


<style scoped>
#main{
    position: relative;
    background: url('../../../assets/break/success.png');
    width: 1920px;
    height: 1080px;
}
#backBtn{
    position: absolute;
    left:1600px;
    top:800px;
    background: url('../../../assets/break/back_success.png') center center no-repeat;
    width: 150px;
    height: 164px;
}
.score{
    color:red;
    font-size:100px;
}
#xsScore{
    position: absolute;
    left:650px;
    top:515px;
}
#hsScore{
    position: absolute;
    left:1150px;
    top:515px;
}
#dsScore{
    position: absolute;
    left:1650px;
    top:515px;
}
#totalScore{
    position: absolute;
    left:720px;
    top:620px;
}
</style>
