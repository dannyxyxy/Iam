<script>
import loginModal from "../views/Login.vue";
import { ref } from "vue";
import commonUtil from "../utils/common-util.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "topBar",
  components: { FontAwesomeIcon, loginModal },
  data() {
    return {
      showLoginModal: false,
    };
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
    <div class="top-container">
      <router-link to="/" class="logo">
        <img src="../assets/img/components/topBar/logo.svg" alt="" />
      </router-link>
      <nav class="top-nav">
        <router-link to="/CreateCrew" class="make-crew">
          <img src="../assets/img/components/topBar/makecrew.png" alt="" />
        </router-link>
        <button
          v-if="!loginCheck"
          class="login-btn"
          @click="showLoginModal = true"
        >
          로그인
          <loginModal
            v-if="showLoginModal === true"
            @closeLoginModal="showLoginModal = false"
          />
        </button>
        <button v-if="loginCheck" class="login-btn" @click="signOut()">
          로그아웃
        </button>
      </nav>
    </div>
  </div>
</template>
