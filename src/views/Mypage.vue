<script>
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
      isProfileEditorOpen: false
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
  }
  
};
</script>

<template>
  <div class="maintext" :class="{ 'dark-mode': isDarkMode }">
    <div>
      <div class="profile">
        <div class="profile-picture">
          <!-- 프로필 사진 -->
          <img src="../assets/img/profile.jpg" alt="프로필 사진">
          <input type="file" ref="imageInput" style="display: none" @change="handleImageUpload">
          <div class="button-wrapper">
            <button class="upload-button" @click="openImageUploader">이미지 업로드</button>
          <button class="edit-button" @click="openProfileEditor">개인정보 수정</button>
          </div>  
        </div>
        <div class="profile-info">
          <!-- 닉네임 -->
          <h1>{{ nickname }}</h1>
          <!-- 자기소개글 -->
          <h3>{{ introduction }}</h3>
          <p>{{ email }}</p>
        </div>
        
      </div>
    </div>
    
    <div class="divider"></div>
  </div>
</template>
<style>
  
</style>