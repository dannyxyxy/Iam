<!--





  죄송해요ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ
  파일 분리를 하면 오류가 나서 일단 다 여따 때려넣었어요ㅠㅠㅠ



  

-->


<script>
export default {
  name: "App",
  data() {
    //데이터 변수값 저장
    return {
      Login: "/Login",
      showModal: false,
      user_email: '',

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

    submitForm() {
      // 로그인 폼 제출 로직 구현
      // 여기서는 단순히 콘솔에 입력한 사용자명과 비밀번호를 출력하는 예시를 제공합니다.
      console.log('이메일:', this.user_email);
      //console.log('비밀번호:', this.password);
      
      // 폼 제출 후 모달 닫기
      this.showModal = false;
    }

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
          <!--
            <router-link to="/login">
            <button class="login-btn" @click="showModal = true">로그인</button>
          </router-link>
          -->
          <button class = "login-btn" @click="showModal = true">로그인</button>
          <div v-if="showModal" class="modal">
            <div class="modal-content">

              <div class="modal-left">
                <div class="image-container">
                  <img src="../assets/img/welcome.png" class="modal_img">
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
              
              <span class="close" @click="showModal = false">&times;</span>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>


<style>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  position: relative;
  display: flex;
  align-items: center;
  backdrop-filter: blur(8px); /* 블러 효과 적용 */
  background-color: rgba(255, 255, 255, 0.5); /* 하얀색 배경 */
  margin: 15% auto;
  width: 700px;
  height: 400px;
  border-radius: 10px;
}

.modal-left {
  flex: 1;
  height: 100%;
  width: 100%;
}

.modal-right {
  flex: 1;
  padding: 50px;
  height: 70%;
  width: 100%;
}

.modal-right input[type="text"] {
  left: 0px;
  height: 35px;
}
.modal-right button[type="submit"] {
  left: 0px;
  height: 40px;
}

.close {
  position: absolute;
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  top: 0px;
  right: 10px;
  background-color: #f5f5f500;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.resistor_box{
  position: absolute;
  bottom: 0px;
  right: 10px;
  cursor: pointer;
}

.registor-text{
  font-weight: bold;
  font-size: 13px;
  display: flex;
  justify-content: flex-end;
}

.image-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.text-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.centered-text {
  font-size: 24px;
  color: #fff;
  text-align: center;
  font-weight: bold;
}

.modal_img{
  width: 100%;
  height: 100%;
  border-radius: 15px;
  object-fit: cover;
}

button {
  margin-top: 10px;
}
</style>