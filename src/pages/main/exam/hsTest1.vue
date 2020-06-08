<template>
  <div id="main">
    <div class="title">{{title1}}</div>
    <div class="content">
      <div class="content_box">
        {{text1}}
      </div>
    </div>
    <div class="answer">
      <div class="answer_box">
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
    <div class="timer">计时器：{{current}}</div>
    <button class="nextBtn" @click="passFn"></button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      timer:'',
      correct:0,
      current:0,
      positionX:0,
      positionY:0,
      title1:"登幽州台歌",
      text1:"凤凰台上| |凰游 凤去| |空江自流 吴宫花草埋| |径 晋代衣冠成| |丘 三山半落| |天外 二水中分白鹭| | 总为浮| |能蔽日 | |安不见使人愁",
       answer1:[
        {
          order:5,
          id:1,
          text:"青",
          positionX:-242,
          positionY:389,
        },{
          order:1,
          id:2,
          text:"凤",
          positionX:-425,
          positionY:392,
        },{
          order:8,
          id:3,
          text:"长",
          positionX:-152,
          positionY:658,
        },{
          order:6,
          id:4,
          text:"洲",
          positionX:-242,
          positionY:1064,
        },
        {
          order:7,
          id:5,
          text:"云",
          positionX:-152,
          positionY:324,
        },{
          order:2,
          id:6,
          text:"台",
          positionX:-425,
          positionY:795,
        },{
          order:4,
          id:7,
          text:"古",
          positionX:-333,
          positionY:997,
        },{
          order:3,
          id:8,
          text:"幽",
          positionX:-333,
          positionY:457,
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
          positionX:-425,
          positionY:392,
        },{
          order:2,
          positionX:-425,
          positionY:795,
        },{
          order:3,
          positionX:-333,
          positionY:457,
        },{
          order:4,
          positionX:-333,
          positionY:997,
        },{
          order:5,
          positionX:-242,
          positionY:389,
        },{
          order:6,
          positionX:-242,
          positionY:1064,
        },{
          order:7,
          positionX:-152,
          positionY:324,
        },{
          order:8,
          positionX:-152,
          positionY:658,
        },
      ],
      answer1_user:[],
    }
  },
  mounted(){
    this.random();
    this.setTime();
    this.timer=setInterval(this.setTime,1000);
  },
  beforeDestroy(){
    clearInterval(this.timer);
  },
  methods:{
        setTime(){
          this.current+=1;
        },
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
            this.$router.push({name:'hsTest2',params:{correct:this.correct,time:this.current}});
        },
        passFn(){
          let order=0,i,j,k;
          
          if(this.answer1_user.length==8){

            for(i in this.empty_position){
              for(j in this.answer1_user){
                if((this.empty_position[i].positionX+'px')==this.answer1_user[j].positionX
                &&(this.empty_position[i].positionY+'px')==this.answer1_user[j].positionY){
                    this.answer1_user[j].order=this.empty_position[i].order;
                }
              }
            }
            
            const newPuzzles = this.answer1_user.slice(0, 8);
            newPuzzles.sort(this.creatCompare('order'));
            this.answer1.sort(this.creatCompare('order'));

            for(k=0; k <8 ;k++){
               if(newPuzzles[k].id==this.answer1[k].id){
                order++;
              }
            }
            if(order==8){
              alert ('恭喜，闯关成功！')
              this.correct=1;
            }else{
              alert ('答案不正确！')
            }
        }else{
            alert ('答案不正确！')
        }
        this.nextBtn();        
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
  left:180px;
  top:350px;
  width:1100px;
  height: 500px;
  font-size: 45px;
  line-height: 2;
}
.content_box{
  width:1200px;
  height: 460px;
  /* padding-left:20px; */
  letter-spacing:0.5em;
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
.timer{
  position: absolute;
  left:1000px;
  top:900px;
  width: 400px;
  height: 60px;
  color:black;
  font-size: 40px;
  border: 0px;
  outline: none;
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
</style>
