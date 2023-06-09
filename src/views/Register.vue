<script>
import { apiClient } from "../utils/axios.js";
import commonUtil from "../utils/common-util.js";

export default {
  name: "register",
  emits: ["closeRegisterModal"],
  methods: {
    toggleMode() {
      this.isDarkMode = !this.isDarkMode;
    },
  },
  setup() {
    const registerInfo = {
      userEmail: "",
      userName: "",
      userPassword: "",
      userPasswordCheck: "",
    };
    const signUp = async () => {
      if (
        registerInfo.userEmail &&
        registerInfo.userName &&
        registerInfo.userPassword &&
        registerInfo.userPasswordCheck
      ) {
        if (registerInfo.userPassword === registerInfo.userPasswordCheck) {
          const data = await apiClient("user/register", registerInfo);
          if (data.resultCode === 1) {
            alert("회원가입 성공!");
            location.reload();
          } else {
            alert("회원가입 실패!");
          }
        } else {
          alert("비밀번호를 확인해주세요.");
        }
      } else {
        alert("빈 칸 없이 모두 입력 해주세요.");
      }
    };
    return {
      registerInfo,
      signUp,
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
              <div class="centered-text">Welcome!
              <span class="welcome-text">방문을 환영합니다!</span></div>
            </div>
          </div>
        </div>

        <div class="modal-right" id="register">
          <div class="login-title">회원가입</div>
          <div class="login-subtitle">이메일로 회원가입</div>

          <form @submit.prevent>
            <input
              type="email"
              placeholder="이메일"
              @input="registerInfo.userEmail = $event.target.value"
              required
            />
            <input
              type="text"
              placeholder="닉네임"
              @input="registerInfo.userName = $event.target.value"
              required
            />
            <input
              type="password"
              placeholder="비밀번호"
              @input="registerInfo.userPassword = $event.target.value"
              required
            />
            <input
              type="password"
              placeholder="비밀번호 확인"
              @input="registerInfo.userPasswordCheck = $event.target.value"
              required
            />
            <button type="submit" @click="signUp">회원가입</button>
          </form>
          <div class="login-text">
            이미 회원이신가요?
            <a class="login-text" @click="$emit('closeRegisterModal')">
              로그인
            </a>
          </div>
        </div>
        <span class="close" @click="$emit('closeRegisterModal')">&times;</span>
      </div>
    </div>
  </div>
</template>

<style>
@import "../assets/style/view/Login.css";
</style>
