<template>
  <div id="main">
    <div class="title">{{title1}}</div>
    <div class="content">
      <div class="content_box" v-if="showCard">
        {{text1}}
      </div>
      <div class="content_box" v-if="!showCard">
        <!-- <button id="closeBtn" @click="close"></button> -->
        {{answer}}
      </div>
    </div>
    <div class="answer">
      <div class="answer_box" v-if="showCard">
        <div class="answer_li" 
              @mousedown="move1" 
              v-for="(element,index) in answer1" 
              :key="index" 
              :id="element.id"
              :style="answer1_position[index]">
          {{element.text}}
        </div>
      </div>
    </div>
    <audio ref="audio" :src="audioUrl"></audio>
    <button class="nextBtn" @click="nextBtn" @mouseenter="PlaySound()"  @mouseleave="StopSound()"></button>
    <button class="answerBtn" @click="passFn" @mouseenter="PlaySound()"  @mouseleave="StopSound()"></button>
    <button id="returnmain" @click="save" @mouseenter="PlaySound()"  @mouseleave="StopSound()"></button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      showCard:true,
      answer:"红酥手，黄縢酒，满城春色宫墙柳。东风恶，欢情薄。一怀愁绪，几年离索。错、错、错。春如旧，人空瘦，泪痕红浥鲛绡透。桃花落，闲池阁。山盟虽在，锦书难托。莫、莫、莫！",
      correct:0,
      positionX:0,
      positionY:0,
      title1:"钗头凤·陆游",
      text1:"红酥手，黄縢| |，满城春色宫墙| |。东风恶，欢情| |。| |怀愁绪，几年离索。错、错、错。| |如旧，人空瘦，泪痕红| |鲛绡透。桃花落，| |池阁。山盟虽在，| |书难托。莫、莫、莫！",
       answer1:[
        {
          order:5,
          id:1,
          text:"春",
          positionX:-275,
          positionY:616,
        },{
          order:1,
          id:2,
          text:"酒",
          positionX:-452,
          positionY:499,
        },{
          order:8,
          id:3,
          text:"锦",
          positionX:-93,
          positionY:442,
        },{
          order:6,
          id:4,
          text:"浥",
          positionX:-183,
          positionY:325,
        },
        {
          order:7,
          id:5,
          text:"闲",
          positionX:-183,
          positionY:867,
        },{
          order:2,
          id:6,
          text:"柳",
          positionX:-452,
          positionY:986,
        },{
          order:4,
          id:7,
          text:"一",
          positionX:-363,
          positionY:634,
        },{
          order:3,
          id:8,
          text:"薄",
          positionX:-363,
          positionY:500,
        },
      ],
      answer1_position:[
        {
          left:"200px",
          top:"15px",
        },{
          left:"300px",
          top:"15px",
        },{
          left:"400px",
          top:"15px",
        },{
          left:"500px",
          top:"15px",
        },{
          left:"600px",
          top:"15px",
        },{
          left:"700px",
          top:"15px",
        },{
          left:"800px",
          top:"15px",
        },{
          left:"900px",
          top:"15px",
        },
      ],
      empty_position:[
        {
          order:1,
          positionX:-452,
          positionY:499,
        },{
          order:2,
          positionX:-452,
          positionY:986,
        },{
          order:3,
          positionX:-363,
          positionY:500,
        },{
          order:4,
          positionX:-363,
          positionY:634,
        },{
          order:5,
          positionX:-275,
          positionY:616,
        },{
          order:6,
          positionX:-183,
          positionY:325,
        },{
          order:7,
          positionX:-183,
          positionY:867,
        },{
          order:8,
          positionX:-93,
          positionY:442,
        },
      ],
      answer1_user:[],
      audioUrl:require('../../../music/悬停按钮音效.wav'),//声音文件
    }
  },
  mounted(){
    this.random();
  },
  methods:{
        random(){
          this.answer1.sort(function() {
              return (0.5-Math.random());
          });
        },
        creatCompare(propertyName) { //根据哪个属性值排序
            return function (obj1,obj2) {
              //对象两两比较
              let value1=obj1[propertyName];
              let value2=obj2[propertyName];
              if(value1<value2){
                  return -1
              }else if(value1>value2){
                  return 1
              }else {
                  return 0
              }
            }
        },
        move1(e){
            let odiv = e.target;        //获取目标元素
            let flag=0;
            //算出鼠标相对元素的位置
            let disX = e.clientX - odiv.offsetLeft;
            let disY = e.clientY - odiv.offsetTop;
            let left,top,i;

            document.onmousemove = (e)=>{       //鼠标按下并移动的事件
                //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                left = e.clientX - disX;    
                top = e.clientY - disY;
                
                //绑定元素位置到positionX和positionY上面
                this.positionX = top;
                this.positionY = left;
                
                //移动当前元素
                odiv.style.left = left + 'px';
                odiv.style.top = top + 'px';
            };
            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
                for(i in this.empty_position){
                  if((this.positionX>=this.empty_position[i].positionX-60&&this.positionX<=this.empty_position[i].positionX+40)
                  && (this.positionY>=this.empty_position[i].positionY-60&&this.positionY<=this.empty_position[i].positionY+40)){
                    odiv.style.top = this.empty_position[i].positionX+'px';
                    odiv.style.left = this.empty_position[i].positionY+'px';
                    // console.log( e.target.id,odiv.style.top, odiv.style.left)
                  }
                }//吸附功能

                for(i in this.answer1_user){//用户答案-更新或插入
                  if(this.answer1_user[i].id==parseInt(e.target.id)){
                    this.answer1_user[i].positionX=odiv.style.top;
                    this.answer1_user[i].positionY=odiv.style.left
                    flag=1;
                  }
                }
                if(flag==0){
                  this.answer1_user.push({order:0,id:parseInt(e.target.id),positionX:odiv.style.top,positionY:odiv.style.left});
                }
            };
        },  
        nextBtn(){
            this.$router.push('/main/study/huistudy2');
        },
        passFn(){
          this.showCard=false;
        },
    save(){
      this.$router.push('/main/study');
    },
    PlaySound() {
      this.$refs.audio.play();
    },
    StopSound() {
      this.$refs.audio.pause();
      this.$refs.audio.currentTime = 0;
    }
  },
}
</script>


<style scoped>
#main{
    background: url('../../../assets/tiankong/BG.png');
    position: relative;
    width: 1920px;
    height: 1080px;
    z-index: 0;
}
#answerCard{
  position: absolute;
  background-size: contain;
  width:660px;
  height: 700px;
  left:640px;
  top:50px;
}
.title{
  position: absolute;
  left:470px;
  top:170px;
  padding:15px 30px;
  font-size: 50px;
  line-height: 2;
  letter-spacing:0.7em;
}
.content{
  position: absolute;
  display: flex;
  justify-content: space-between;
  left:220px;
  top:320px;
  width:1100px;
  height: 500px;
  font-size: 45px;
  line-height: 2;
}
.content_box{
  width:1000px;
  height: 460px;
  /* padding-left:20px; */
  letter-spacing:0.3em;
  color:lightslategray;
}
.answer{
  position: absolute;
  display: flex;
  justify-content: space-between;
  left:80px;
  top:800px;
  width:1100px;
  height: 200px;
  padding:15px 30px;
  font-size: 45px;
}
.answer_box{
  display: flex;
  width:500px;
  height: 200px;
  padding-left:20px;
  /* letter-spacing:2em; */
}
.answer_li{
  position: absolute;
  width:40px;
  height: 40px;
  line-height: 40px;
  z-index: 99;
}
.answer_single{
  z-index: -5;
  position: absolute;
  width:80px;
  height: 80px;
  border: 1px solid black;
  left: 370px;
  top: -465px;
  /* background-color: white; */
}

.nextBtn{
  position: absolute;
  left:1700px;
  top:70px;
  background: url('../../../assets/pintu/next.png') center center no-repeat;
  width: 150px;
  height: 164px;
  border: 0px;
  outline: none;
}
.answerBtn{
  position: absolute;
  left:1700px;
  top:230px;
  background: url('../../../assets/study/answer.png') center center no-repeat;
  background-size: contain;
  width: 150px;
  height: 164px;
  border: 0px;
  outline: none;
}
#returnmain{
  background: url("../../../assets/study/tuichubtn.png")  no-repeat;
  position: absolute;
  left:100px;
  top:50px;
  width: 150px;
  height: 164px;
  border: 0px;
  outline: none;
}
</style>
