<script>
import { apiClient } from "../utils/axios.js";
import { CONSTANTS } from "../utils/constants.js";
import commonUtil from "../utils/common-util.js";
import { onMounted, ref } from "vue";
import router from "../router/index.js";

export default {
  name: "App",
  data() {
    //데이터 변수값 저장
    return {
      nickname: "danny",
      introduction: "hi",
      email: "danny97k@gmail.com",
      isEmojiPickerOpen: false,
      isImagePickerOpen: false,
      isProfileEditorOpen: false,
    };
  },
  methods: {
    openEmojiPicker() {
      this.isEmojiPickerOpen = true;
      // TODO: Implement logic to open emoji picker and update the selected emoji
    },
    openImageUploader() {
      this.$refs.imageInput.click();
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        // TODO: Implement logic to handle the uploaded image and update the profile image
        const reader = new FileReader();
        reader.onload = () => {
          this.profileImage = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
    openProfileEditor() {
      this.isProfileEditorOpen = true;
      // TODO: Implement logic to open the profile editor
    },
    // TODO: Implement method to update the profile information
  },
  setup() {
    const loginCheck = commonUtil.loginCheck();
    const userData = ref({
      userName: "",
      userIntro: "",
      userEmail: "",
    });
    const getUserData = async () => {
      const data = await apiClient(
        "user/getUserInfo",
        JSON.parse(commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO))
      );
      if (data.resultCode === 1) {
        userData.value = data.data;
      } else {
        alert("정보를 불러올 수 없습니다. 관리자에게 문의하세요");
        await router.push("/");
      }
    };
    const errAlert = async () => {
      alert("로그인 후에 이용해주세요");
      await router.push("/");
    };
    onMounted(getUserData);
    return {
      userData,
      loginCheck,
      errAlert,
    };
  },
};
</script>

<template>
  <div
    class="maintext"
    :class="{ 'dark-mode': isDarkMode }"
    v-if="loginCheck ? true : errAlert()"
    >
    <div class="profile">
      <div class="profile-container">
        <div class="profile-picture">
          <!-- 프로필 사진 -->
          <img src="../assets/img/profile.jpg" alt="프로필 사진" />
          <input
            type="file"
            ref="imageInput"
            style="display: none"
            @change="handleImageUpload"
          />
          <div class="button-wrapper">
            <button class="upload-button" @click="openImageUploader">
              이미지 업로드
            </button>
            <button class="edit-button" @click="openProfileEditor">
              개인정보 수정
            </button>
          </div>
        </div>
        <div class="profile-info">
          <!-- 닉네임 -->
          <h1>{{ userData.userName }}</h1>
          <!-- 자기소개글 -->
          <h3>{{ userData.userIntro }}</h3>
          <p>{{ userData.userEmail }}</p>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="mypost">
      <h2>내 게시물 보기</h2>
      <div class="mypost-container"></div>
    </div>
  </div>
</template>
<style></style>
