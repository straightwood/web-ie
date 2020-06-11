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
    <div class="timer">倒计时：{{current}}</div>
    <button class="nextBtn" @click="passFn" @mouseenter="PlaySound()" @mouseleave="StopSound()"></button>
    <audio ref="audio" :src="audioUrl"></audio>
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
      title:'不',
      timer:'',
      correct:'',
      current:60,

      list_left: message_left.map((name,index,image) => {
        return { name, order: index + 1, image:require('../../../assets/pintu/ex3/'+(index)+'.png'),fixed: false };
      }),
      list_right: message_right.map((name, index) => {
        return { name, order: index + 4, image:require('../../../assets/pintu/ex3/'+(index+3)+'.png'),fixed: false };
      }),
      list_bottom: message_bottom.map((name, index) => {
        return { name, order: index + 7, image:require('../../../assets/pintu/ex3/'+(index+6)+'.png'),fixed: false };
      }),

      list_result: [],
      editable: true,
      isDragging: false,
      delayedDragging: false,
      audioUrl:require('../../../music/悬停按钮音效.wav'),//声音文件
    };
  },
  mounted(res){
    // this.judge();
    this.setTime();
    this.timer=setInterval(this.setTime,1000);
    this.correct = parseInt(this.$route.params.correct);//处理传参
  },
  beforeDestroy(){
    clearInterval(this.timer);
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
  },
  methods: {
    setTime(){
      this.current-=1;
      if(this.current==0){
        this.passFn();
        // this.$router.push('/main/exam/hsExam');
      }    
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
    nextBtn(){
        this.$router.push('/main/exam/hsExam');
    },
    passFn () {
      if(this.list_result.length==9){
        const newPuzzles = this.list_result.slice(0, 9)
        const isPass = newPuzzles.every((e, i) => e.order === i + 1)
        if (isPass) {
            this.correct++;
        }
      }
      if(this.correct>=2){
        this.compute();
        this.nextBtn();
      }else{
        this.$router.push('/main/exam/failed');
      }
    },
    compute(){
        fetch('api/web-ie/server/xsTest.php',{
            method:"POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                Authorization:localStorage.getItem('Authorization'),//token
                username:JSON.parse(localStorage.getItem("username")),
                correct:this.correct,
            }),
        }).then((res)=>{
            return res.json();
        }).then((res)=>{
          this.update();
        }); 
    },
    update(){
        fetch('api/web-ie/server/compute.php',{
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
        }); 
    },
    PlaySound() {
      this.$refs.audio.play();
   },
   StopSound() {
      this.$refs.audio.pause();
      this.$refs.audio.currentTime = 0;
    }
  },
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
    background: rgba(204, 204, 204, 0.787);
    list-style: none;
}
.b2_list-group {
   width: 324px;
    height: 108px;
    margin-bottom: 20px;
    padding: 0;
    background: rgba(204, 204, 204, 0.787);
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
.timer{
  position: absolute;
  left:1400px;
  top:550px;
  width: 200px;
  height: 60px;
  color:black;
  font-size: 30px;
  border: 0px;
  outline: none;
}
.nextBtn{
  position: absolute;
  left:1700px;
  top:70px;
  background: url('../../../assets/pintu/finish.png') center center no-repeat;
  width: 150px;
  height: 164px;
  border: 0px;
  outline: none;
}
</style>