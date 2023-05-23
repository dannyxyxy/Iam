<script>
import loginModal from "../views/Login.vue";
import { ref } from "vue";
import commonUtil from "../utils/common-util.js";
import { CONSTANTS } from "../utils/constants.js";

export default {
  name: "topBar",
  components: { loginModal },
  data() {
    //데이터 변수값 저장
    return {
      user_email: "",
      isDarkMode: false,
      showLoginModal: false,
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
  setup() {
    const loginCheck = ref(commonUtil.loginCheck());
    const signOut = () => {
      commonUtil.logOutUser();
      location.reload();
    };
    return {
      loginCheck,
      signOut,
    };
  },
};
</script>

<template>
  <div class="top">
    <div class="logo">
      <img src="../assets/img/components/topBar/logo.png" alt="" />
    </div>
    <nav class="top-nav">
      <ul>
        <li>
          <router-link to="/Search" class="search">
            <img src="../assets/img/components/sideBar/search.png" alt="" />
          </router-link>
        </li>
        <li>
          <div class="darkmode-btn">
            <img
              src="../assets/img/components/topBar/night.png"
              @click="toggleMode"
              alt=""
            />
          </div>
        </li>
        <li>
          <button
            v-if="!loginCheck"
            class="login-btn"
            @click="showLoginModal = true"
          >
            로그인
          </button>
          <button v-if="loginCheck" class="login-btn" @click="signOut()">
            로그아웃
          </button>
        </li>
      </ul>
    </nav>
  </div>
  <loginModal
    v-if="showLoginModal === true"
    @closeLoginModal="showLoginModal = false"
  />
</template>
