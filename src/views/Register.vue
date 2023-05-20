<script>
import { apiClient } from "../utils/axios.js";

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
      userPassword: "",
    };
    const signUp = async () => {
      if (registerInfo.userEmail && registerInfo.userPassword) {
        const data = await apiClient("user/register", registerInfo);
        if (data.resultCode === 1) {
          alert("회원가입 성공!");
          location.reload();
        } else {
          alert("회원가입 실패!");
        }
      } else {
        alert("다시 입력 해주세요");
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
            <img src="../assets/img/welcome.png" class="modal_img" alt="" />
            <div class="text-overlay">
              <div class="centered-text">환영합니다</div>
            </div>
          </div>
        </div>

        <div class="modal-right">
          <h2>회원가입</h2>
          <h4>이메일로 회원가입</h4>

          <form @submit.prevent>
            <input
              type="email"
              placeholder="이메일"
              @input="registerInfo.userEmail = $event.target.value"
              required
            />
            <input
              type="password"
              placeholder="비밀번호"
              @input="registerInfo.userPassword = $event.target.value"
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
