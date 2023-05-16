<script>
export default {
  name: 'login',
  data() {
    return {
      showModal: false,
      user_email: '',
      //password: ''
    };
  },
  methods: {
    toggleMode(){
      this.isDarkMode=!this.isDarkMode;
    },

    submitForm() {
      // 로그인 폼 제출 로직 구현
      // 여기서는 단순히 콘솔에 입력한 사용자명과 비밀번호를 출력하는 예시를 제공합니다.
      console.log('이메일:', this.user_email);
      //console.log('비밀번호:', this.password);
      
      // 폼 제출 후 모달 닫기
      this.showModal = false;
    },
    closeModal() {
      console.log('이메일:', this.user_email);
      this.$emit('sendClose', false);
    }
  }
};
</script>

<template>
  <div>
    <div v-if="showModal" class="modal">
      <div class="modal-content">

        <div class="modal-left">
          <div class="image-container">
            <img src="./assets/welcome.jpg" class="modal_img">
            <div class="text-overlay">
              <div class="centered-text">환영합니다</div>
            </div>
          </div>
        </div>

        <div class="modal-right">
          <h2>로그인</h2>
          이메일로 로그인
          <br><br>

          <form @submit.prevent="submitForm">
            <input type="text" placeholder="이메일" v-model="user_email" required>
            <!--
              <input type="password" placeholder="비밀번호" v-model="password" required>
            -->
              <button type="submit">로그인</button>
          </form>
          <br><br><br><br><br><br>

          <div class="registor_box">
            <div class="registor-text">아직 회원이 아니신가요?
              <span>&nbsp;</span> <!-- 띄어쓰기 -->
              <a href="your-signup-url">회원가입</a>
            </div>
          </div>

        </div>
        
        <span class="close" @click="closeModal()">&times;</span>
      </div>
    </div>
  </div>
</template>

<style>
  @import "../assets/style/view/Login.css";
</style>