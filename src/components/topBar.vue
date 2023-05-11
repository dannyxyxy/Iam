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
    <nav class="top-nav">
      <ul>
        <li>
          <router-link to="/Search" class="search">
            <img src="../assets/img/components/sideBar/search.png"/>
          </router-link>
        </li>
        <li>
          <div class="darkmode-btn">
            <img src="../assets/img/components/topBar/night.png" @click="toggleMode"/>
          </div>
        </li>
        <li>
          <router-link to="/login">
            <button class="login-btn">로그인</button>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
