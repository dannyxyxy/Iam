<template>
  <div>
    <ul class="menu">
      <li style="margin-top:110px">
        <a href=""><img src="./assets/main.png">메인</a>
      </li>
      <li>
        <a href=""><img src="./assets/search.png">검색</a>
      </li>
      <li>
        <a href=""><img src="./assets/category.png">카테고리</a>
      </li>
      <li>
        <a href=""><img src="./assets/edit.png">글작성</a>
      </li>
      <li>
        <a href=""><img src="./assets/crew.png">크루</a>
      </li>
      <li>
        <a href=""><img src="./assets/mypage.png">마이페이지</a>
      </li>
      <li>
        <a href=""><img src="./assets/setting.png">세팅</a>
      </li>
      <li style="margin-top:200px">
        <a href=""><img src="./assets/more.png">더보기</a>
      </li>
    </ul>
  </div>
  <div class="top">
    <div class="logo">
      <img src="./assets/logo.png">
    </div>
    <div>
      <router-link to="/login">
        <button class="login-btn">로그인</button>
      </router-link>
    </div>
    <div :class="{'dark-mode':isDarkMode}" id="darkmode">
      <button id="darkmode" @click="toggleMode">{{ isDarkMode ? 'Day' : 'Night' }}<img src="./assets/night.png"></button>
    </div>
    <div class="search">
      <a href=""><img src="./assets/search.png"></a>
    </div>
  </div>


  <div class="maintext">
    분문작업 여기다가 하시면 됩니다!
  </div>

</template>
  
<script>
export default {
  name: 'App',
  data(){//데이터 변수값 저장
    return{
      isDarkMode:false
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
    }
  },

  components: {
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
*{padding:0;margin:0}
li{list-style:none}
a{text-decoration: none;font-size:15px;}
.menu{
  width:10%;
  height:100%;
  line-height:50px;
  position:fixed;
  float:left;
  font-weight:500;
  background-color:rgb(240, 240, 240);
}
.menu img{
  margin:auto;
  display: block;
}
.top{
  margin-left:10%;
  width:100%;
  margin-top:0px;
  height:100px;
  background-color:#fff;
}
.logo{
  float:left;
  margin-top:20px;
  margin-left:10%;
}
.search{
  float:right;
  margin-right: 10px;
  margin-top: 40px;
}
#darkmode{
  float:right;
  margin-right:5px;
  margin-top: 12px;
  border:none;
  color:transparent;
  background-color:#fff;
  width:24px;
  height:24px;
  cursor: pointer; 
}
.login-btn {
  float:right;
  margin-right:20%;
  margin-top:36px;
  border: none;
  background-color: #000;
  color: #fff;
  padding: 5px 15px; 
  border-radius: 15px; 
  cursor: pointer; 
  font-weight: 550;
  font-size: 15px;
}
.maintext{
  float:right;
  display:block;
  margin-left:20%;
  margin-right:10%;
  width:70%;
  height:900px;
}
body{
  background-color: #fff;
  color:#000;
}
.dark-mode{
  background-color: #000;
  color:#fff;
}
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
