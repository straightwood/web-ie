<template>
    <div id=main>
        <div id="title">{{title}}</div>
        <div class="fluid container container2">
            <div class="box b_box">
            <draggable class="b_list-group" tag="ul" v-model="list_left" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                <transition-group type="transition" :name="'flip-list'">
                <li class="list-group-item" v-for="element in list_left" :key="element.order">
                    <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
                    <!-- {{element.name}} -->
                    <!-- <span class="badge">{{element.order}}</span> -->
                    <img :src="element.image"><!-- 注意双向绑定 -->
                </li>
                </transition-group>
            </draggable>
            </div>
            <div class="cer">
                <div class="box r_box">
                    <draggable tag="span" v-model="list_result" v-bind="dragOptions" :move="onMove">
                        <transition-group name="no" class="list-group" tag="ul">
                        <li class="list-group-item" v-for="element in list_result" :key="element.order">
                            <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
                            <!-- {{element.name}} -->
                            <!-- <span class="badge">{{element.order}}</span> -->
                            <img :src="element.image"><!-- 注意双向绑定 -->
                        </li>
                        </transition-group>
                    </draggable>
                </div>
                <div class="box b_box">
                    <draggable class="b2_list-group" tag="ul" v-model="list_bottom" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                        <transition-group type="transition" :name="'flip-list'">
                        <li class="list-group-item" v-for="element in list_bottom" :key="element.order">
                            <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
                            <!-- {{element.name}} -->
                            <!-- <span class="badge">{{element.order}}</span> -->
                            <img :src="element.image"><!-- 注意双向绑定 -->
                        </li>
                        </transition-group>
                    </draggable>
                </div>
            </div>
            <div class="box b_box">
            <draggable class="b_list-group" tag="ul" v-model="list_right" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                <transition-group type="transition" :name="'flip-list'">
                <li class="list-group-item" v-for="element in list_right" :key="element.order">
                    <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
                    <!-- {{element.name}}
                    <span class="badge">{{element.order}}</span> -->
                    <img :src="element.image"><!-- 注意双向绑定 -->
                </li>
                </transition-group>
            </draggable>
        </div>
    </div>
    <button class="nextBtn" @click="nextBtn"></button>
    <button class="answerBtn" @click="passFn"></button>
    <button id="returnmain" @click="save"></button>
    <div id="answerCard"  v-if="showCard">
      <button id="closeBtn" @click="close"></button>
      <img id="answerImg" src="../../../assets/pintu/ex1/res.png">
    </div>
    
</div>
</template>

<script>
import draggable from "vuedraggable";
const message_left = [
  "1",
  "2",
  "3",
];
const message_right = [
  "4",
  "5",
  "6",
];
const message_bottom = [
  "7",
  "8",
  "9",
];
export default {
  components: {
    draggable
  },
  data() {
    return {
      showCard:false,
      title:'少',
      correct:0,
      current:60,
        // numList:[1,2,3,4,5,6,7,8,9],
        // numRes:[''],
        
    //   list: message.map((name, index) => {
    //     return { name, order: index + 1, fixed: false };
    //   }),
      list_left: message_left.map((name,index,image) => {
        // var num=Math.floor(Math.random()*10) % 9;
        // var numRes=[];
        // for(i in this.numRes){
        //     if(i==num){
        //         console.log(i,num);
        //         num=Math.floor(Math.random()*10) % 9;
        //         console.log(i,num);
        //         continue;
        //     }else{
        //         this.numRes.push(num);
        //         break;
        //     }
        // }
        // console.log(num,this.numList);
        return { name, order: index + 1, image:require('../../../assets/pintu/ex1/'+(index)+'.png'),fixed: false };
      }),
      list_right: message_right.map((name, index) => {
        return { name, order: index + 4, image:require('../../../assets/pintu/ex1/'+(index+3)+'.png'),fixed: false };
      }),
      list_bottom: message_bottom.map((name, index) => {
        return { name, order: index + 7, image:require('../../../assets/pintu/ex1/'+(index+6)+'.png'),fixed: false };
      }),

      list_result: [],
      editable: true,
      isDragging: false,
      delayedDragging: false
    };
  },
  // mounted(){
  //   this.judge();
  //   this.setTime();
  //   this.timer=setInterval(this.setTime,1000);
  // },
  // beforeDestroy(){
  //   clearInterval(this.timer);
  // },
  methods: {
    // setTime(){
    //   this.current-=1;
    //   if(this.current==0){
    //     this.passFn();
    //     this.$router.push({name:'xsTest2',params:{correct:this.correct}});
    //   }   
    // },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
    nextBtn(){
        this.$router.push('/main/study/xiangstudy2');
    },
    passFn () {
        this.showCard=!this.showCard;
        // this.nextBtn();        
    },
    close(){
      this.showCard=!this.showCard;
      // this.nextBtn(); 
    },
    save(){
      this.$router.push('/main/study');
      }
  },
  computed: {
    dragOptions() {
      return {
        animation:1,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    }
  }
};
</script>

<style scoped>
#main{
    background: url('../../../assets/pintu/BG.png');
    position: relative;
    width: 1920px;
    height: 1080px;
}
#title{
  position: absolute;
  font: 38px bold;
  color: white;
  left: 942px;
  top:47px;
}
#answerCard{
  position: absolute;
  background: url('../../../assets/study/jiexiBg.png') no-repeat;
  background-size: contain;
  width:660px;
  height: 700px;
  left:640px;
  top:50px;
}
#closeBtn{
  position: absolute;
  background: url('../../../assets/study/jiexiclosebtn.png') no-repeat;
  /* width:700px; */
  height: 24px;
  width: 24px;
  left:595px;
  top:30px;
}
#answerImg{
  position: absolute;
  left:200px;
  top:200px;
}
.container{
    display: flex;
    position: absolute;
    left: 625px;
    top:150px;
}
.box{
    margin: 20px;
}
.flip-list-move {
  transition: transform 0.5s;
}s
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.b_list-group {
   width: 108px;
    height: 324px;
    padding: 0;
    /* background: rgba(204, 204, 204, 0.787); */
    list-style: none;
}
.b2_list-group {
   width: 324px;
    height: 108px;
    margin-bottom: 20px;
    padding: 0;
    /* background: rgba(204, 204, 204, 0.787); */
    list-style: none;
}
.list-group {
   width: 324px;
    height: 324px;
    margin-bottom: 20px;
    padding: 0;
    background: rgba(204, 204, 204, 0.787);
    list-style: none;
}
.list-group-item {
    float: left;
    width: 108px;
    height: 108px;
    text-align: center;
    cursor: pointer;
}
.list-group-item i {
  cursor: pointer;
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