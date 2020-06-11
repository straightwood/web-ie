<template>
  <div id="main">
    <div class="button_box">
      <div id="button1" @click="report"></div>
      <div id="button2" @click="back"></div>
    </div>
    <div :id="house" class="house_position"></div>
    <div id="reportCard" v-if="showCard">
      <button id="closeBtn" @click="report"></button>
      <div id="nickname" class="color">{{user_nickname}}</div>
      <div id="achieve">{{user_grade}}</div>
      <div :id="person" class="person_position"></div>
      <div id="score" class="color">{{user_totalscore}}</div>
      <div id="comment">
        <ul id="comment_title" class="color">
          <li>识字:</li>
          <li>记忆:</li>
          <li>熟文:</li>
        </ul>
        <div id="comment_content" class="color" v-for="(element,index) in user_score" :key="index">
          {{element}}
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      showCard:false,
      person:'',
      house:'',
      user_nickname:'',
      user_totalscore:'',
      user_grade:'',
      user_score:[
        '','',''
      ],
      grade:[
        '平民',
        '秀才',
        '举人',
        '贡士',
        '进士',
      ],
      personImage_id:[
        'xiucai',
        'jvren',
        'gongshi',
        'jinshi',
        'zhuangyuan'
      ],
      round_sentence:[
        "还没有进行考试，不知道水平。",
        "很好的意思很好的意思，很好的意思。",
        "一般的意思，一般的意思。",
        "不好的意思不好的意思不好的意思。"
      ],
    }
  },
  mounted(){
    this.getScore();
    this.user_nickname = localStorage.getItem("nickname");
  },
  methods:{
    getScore(){
    //   this.user_nickname=localStorage.getItem("nickname");
    // console.log(localStorage.getItem("nickname"))
      fetch('api/web-ie/server/think.php',{
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
        // console.log(res);
          if(res[2].code==1){     //############################分数计算
              this.user_totalscore=res[1][0].score;//取总成绩
              // this.person=this.personImage_id[res[0].length];//目前还是按称号改变的
              // this.house='house_'+this.personImage_id[res[0].length];//目前还是按称号改变的
              if(this.user_totalscore<=20){
                this.person=this.personImage_id[0];
                this.house='house_'+this.personImage_id[0];
              }else if(this.user_totalscore<=40){
                this.person=this.personImage_id[1];
                this.house='house_'+this.personImage_id[1];
              }else if(this.user_totalscore<=60){
                this.person=this.personImage_id[2];
                this.house='house_'+this.personImage_id[2];
              }else if(this.user_totalscore<=80){
                this.person=this.personImage_id[3];
                this.house='house_'+this.personImage_id[3];
              }else if(this.user_totalscore<=100){
                this.person=this.personImage_id[4];
                this.house='house_'+this.personImage_id[4];
              }

              for(var i in res[0]){
                this.user_score[i]=res[0][i].score;//取各关成绩
              }
              this.user_grade=this.grade[res[0].length];//称号判定
              

              for(var i in this.user_score){    
                if(this.user_score[i]==''){           //评论语句
                  this.user_score[i]=this.round_sentence[0];
                }else if(this.user_score[i]>=20 && this.user_score[i]<=30){
                  this.user_score[i]=this.round_sentence[1];
                }else if(this.user_score[i]>=10 && this.user_score[i]<=20){
                  this.user_score[i]=this.round_sentence[2];
                }else{
                  this.user_score[i]=this.round_sentence[3];
                }
              }  
          }else{
              this.$Message.error(res[2].message);
              this.$router.push('../../index');
          }
      });
    },
    getStudy(){
      //请求学习时间
    },
    back(){
      this.$router.push('../../main');
    },
    report(){
      this.showCard=!this.showCard;
    }
  },
  
}
</script>

<style scoped>
#main{
  position: absolute;
  background: url('../../assets/report/BG.png') center center no-repeat;
  width: 1920px;
  height: 1080px;
}
.button_box{
  position: absolute;
  display: flex;
  justify-content: space-between;
  left:1550px;
  top:70px;
  width:300px;
}
.button_box #button1{
  background: url('../../assets/report/report.png') center center no-repeat;
  width: 150px;
  height: 164px;
}
.button_box #button2{
  background: url('../../assets/report/backBtn.png') center center no-repeat;
  width: 150px;
  height: 164px;
}
#reportCard{
  position: absolute;
  background: url('../../assets/report/card.png') center center no-repeat;
  width:724px;
  height: 810px;
  left:590px;
  top: 130px;
}
#closeBtn{
  position: absolute;
  background: url('../../assets/report/closeBtn.png') center center no-repeat;
  width: 21px;
  height: 21px;
  left:680px;
  top:20px;
}


.person_position{
  text-align: center;
  margin: 0 auto;
  margin-top: 100px;
  height:350px;
}
#xiucai{
  background: url('../../assets/report/xiucai.png') center center no-repeat;
  background-size: contain;
}
#jvren{
  background: url('../../assets/report/jvren.png') center center no-repeat;
  background-size: contain;
}
#gongshi{
  background: url('../../assets/report/gongshi.png') center center no-repeat;
  background-size: contain;
}
#jinshi{
  background: url('../../assets/report/jinshi.png') center center no-repeat;
  background-size: contain;
}

.house_position{
  /* position: absolute;
  left:370px;
  top:200px; */
  text-align: center;
  margin: 0 auto;
  margin-top: 100px;
  width:1200px;
  height: 1000px;
}
#house_xiucai{
  background: url('../../assets/report/house_xiucai.png') center center no-repeat;
  background-size: contain;
}
#house_jvren{
  background: url('../../assets/report/house_jvren.png') center center no-repeat;
  background-size: contain;
}
#house_gongshi{
  background: url('../../assets/report/house_gongshi.png') center center no-repeat;
  background-size: contain;
}
#house_jinshi{
  background: url('../../assets/report/house_jinshi.png') center center no-repeat;
  background-size: contain;
}
#nickname{
  position: absolute;
  left:200px;
  top:100px;
  font-size: 30px;
  text-align: center;
  margin: 0 auto;
  margin-top: 35px;
  width: 10px;
}
#achieve{
  position: absolute;
  background: url('../../assets/report/redseal.png') center center no-repeat;
  width:30px;
  height: 70px;
  left:500px;
  top:200px;
  padding:7px;
  color: white;
}
#score{
  font-size: 50px;
  text-align: center;
  margin: 0 auto;
  margin-top: 35px;
}
.color{
  color: #D6C29F;
}
#comment{
  position: relative;
  font-size: 30px;
  margin: 50px 100px;
}
#comment_title{
  position: absolute;
  list-style: none;
  width: 100px;
}
#comment_content{
  width:500px;
  margin-left: 70px;
}


</style>
