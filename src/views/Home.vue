<script>
  export default {
  name: 'App',
  data(){//데이터 변수값 저장
    return{
      isDarkMode:false,
      i:6,
      title:"Title",
      summary:"summary",
      user:"danny",
      likeCount:0,
      isTrendActive: true
    }
  },
  methods:{//함수만드는곳 this. 꼭 붙힐것
    toggleMode(){
      this.isDarkMode=!this.isDarkMode;
      if(this.isDarkMode){
        document.body.classList.add('dark-mode');
      }else{
        document.body.classList.remove('dark-mode');
      }  
    },
    toggleTrend(){
        this.isTrendActive =!this.isTrendActive;
    }
  },

  components: {
  }
}
</script>

<template>
  <div class="maintext" :class="{ 'dark-mode': isDarkMode }">
    <div>
      <button class="trend-sort" @click="toggleTrend" :class="{ 'active': isTrendActive }"><img src="../assets/img/components/trend.png">트렌드</button>
    <button class="latest-sort" @click="toggleTrend" :class="{ 'active': !isTrendActive }"><img src="../assets/img/components/short.png">최신순</button>
    </div>
    <div class="container">
      <div class="box" v-for="n in i" :key="n">
        <img src="./assets/hi.jpg">
        <div class="box-summary">
          <div>
            <h3>{{title}}</h3><h5>{{summary}}</h5>
          </div>
          <div class="circle"><img src="./assets/profile.jpg"></div>
          <div class="username">by <span style="font-weight:bold">{{user}}</span></div>
          <div>
            <button class="like-btn" @click="likeCount++"><i class="fas fa-heart"></i><img src="./assets/heart.png">{{likeCount}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
