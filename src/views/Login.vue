<script>
import { apiClient, setHeader } from "../utils/axios.js";
import registerModal from "./Register.vue";
import commonUtil from "../utils/common-util.js";
import { CONSTANTS } from "../utils/constants.js";
import { ref, watch } from "vue";
import store, { STORE_TYPE } from "../utils/store.js";

export default {
  name: "login",
  components: { registerModal },
  data() {
    return {
      showRegisterModal: false,
    };
  },
  emits: ["closeLoginModal"],
  setup() {
    let loginInfo = ref({
      userEmail: "",
      userPassword: "",
    });
    const loginHandler = async () => {
      if (loginInfo.value.userEmail && loginInfo.value.userPassword) {
        await apiClient("user/login", loginInfo.value).then((r) => {
          console.log(r.data);
          setHeader(r.data.token);
          commonUtil.setLocalStorage(CONSTANTS.KEY_LIST.USER_INFO, r.data);
          commonUtil.setLocalStorage(
            CONSTANTS.KEY_LIST.USER_INFO_TOKEN,
            r.data.token
          );
          store.commit(STORE_TYPE.loginUserIdx, r.data.userIdx);
          localStorage.setItem("userData", JSON.stringify(r.data));
          alert("로그인 성공!");
          location.reload();
        });
      } else {
        alert("다시 입력해주세요");
      }
    };

    const loginUser = ref(
      commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO)
    );

    watch(() => {
      loginUser.value = commonUtil.getLocalStorage(
        CONSTANTS.KEY_LIST.USER_INFO
      );
    });

    return {
      loginInfo,
      loginHandler,
    };
  },
};
</script>

<template>
  <div>
    <div class="modal">
      <div class="modal-content">
        <div class="modal-left">
          <div class="image-container">
            <div class="modal_img"></div>
            <div class="text-overlay">
              <div class="center-text">
                Welcome! <span class="welcome-text">방문을 환영합니다!</span>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-right">
          <div class="login-title">로그인</div>
          <div class="login-subtitle">이메일로 로그인</div>

          <form @submit.prevent>
            <input
              type="email"
              placeholder="이메일"
              @input="loginInfo.userEmail = $event.target.value"
              required
            />
            <input
              type="password"
              placeholder="비밀번호"
              @input="loginInfo.userPassword = $event.target.value"
              required
            />
            <button type="submit" @click="loginHandler">로그인</button>
          </form>
          <div class="registor-text">
            아직 회원이 아니신가요?
            <a class="registor-text" @click="showRegisterModal = true">
              회원가입
            </a>
          </div>
        </div>
        <span class="close" @click="$emit('closeLoginModal')">&times;</span>
      </div>
    </div>
  </div>
  <registerModal
    v-if="showRegisterModal === true"
    @closeRegisterModal="showRegisterModal = false"
  />
</template>

<style>
@import "../assets/style/view/Login.css";
</style>
