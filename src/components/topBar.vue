<script>
export default {
  name: "App",
  data() {
    //데이터 변수값 저장
    return {
      isDarkMode: false,
    };
  },
  methods: {
    //함수만드는곳 this. 꼭 붙힐것
    toggleMode() {
      this.isDarkMode = !this.isDarkMode;
      if (this.isDarkMode) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    },
  },

  components: {},
};
</script>

<template>
  <div class="top">
    <div class="logo">
      <img src="../assets/img/components/topBar/logo.png" />
    </div>
    <div>
      <router-link to="/login">
        <button class="login-btn">로그인</button>
      </router-link>
    </div>
    <div :class="{ 'dark-mode': isDarkMode }" id="darkmode">
      <button id="darkmode" @click="toggleMode">
        {{ isDarkMode ? "Day" : "Night"
        }}<img src="../assets/img/components/topBar/night.png" />
      </button>
    </div>
    <div class="search">
      <a href=""><img src="../assets/img/components/sideBar/search.png" /></a>
    </div>
  </div>
</template>
