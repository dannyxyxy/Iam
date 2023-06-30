<script>
import loginModal from "../views/Login.vue";
<<<<<<< HEAD
import { ref } from "vue";
import commonUtil from "../utils/common-util.js";

export default {
  name: "topBar",
  components: { loginModal },
  data() {
    //데이터 변수값 저장
    return {
      user_email: "",
      showLoginModal: false,
    };
  },
  methods: {
    //함수만드는곳 this. 꼭 붙힐것
  },
  setup() {
    const loginCheck = ref(commonUtil.loginCheck());
    const signOut = () => {
      commonUtil.logOutUser();
      location.reload();
    };
=======
import { onMounted, ref } from "vue";
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
    const loginCheck = ref(false);

    const signOut = async () => {
      commonUtil.logOutUser();
      await location.reload();
    };
    onMounted(async () => {
      loginCheck.value = await commonUtil.loginCheck();
    });
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
    return {
      loginCheck,
      signOut,
    };
  },
};
</script>

<template>
  <div class="top">
<<<<<<< HEAD
    <router-link to="/" class="logo">
      <img src="../assets/img/components/topBar/logo.png" alt="" />
    </router-link>
    <nav class="top-nav">
      <ul>
        <li>
          <router-link to="/CreateCrew" class="make-crew">
            <img src="../assets/img/components/topbar/makecrew.png" alt="" />
          </router-link>
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
=======
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
        </button>
        <button v-else class="login-btn" @click="signOut()">로그아웃</button>
      </nav>
    </div>
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
  </div>
  <loginModal
    v-if="showLoginModal === true"
    @closeLoginModal="showLoginModal = false"
  />
</template>
