<script>
export default {
  data() {
    return {
      crewName: '',
      crewDescription: '',
      crewImage: null,
      crewImagePreview: ''
    };
  },
  methods: {
    handleImageUpload(event) {
      // 크루 대표 사진 업로드 처리 로직
      this.crewImage = event.target.files[0];
      this.previewCrewImage();
    },
    previewCrewImage() {
      // 크루 대표 사진 미리보기 로직
      if (this.crewImage) {
        const reader = new FileReader();
        reader.onload = () => {
          this.crewImagePreview = reader.result;
        };
        reader.readAsDataURL(this.crewImage);
      } else {
        this.crewImagePreview = '';
      }
    },
    createCrew() {
      // 크루 생성 처리 로직
      console.log('크루 이름:', this.crewName);
      console.log('크루 소개:', this.crewDescription);
      console.log('크루 대표 사진:', this.crewImage);
      // 크루 생성 API 호출 등 추가 작업 수행
    }
  }
};
</script>

<template>
  <div class="maintext" :class="{ 'dark-mode': isDarkMode }">
    <div class="create-crew">
      <h2>크루 만들기</h2>
    <div class="form-container">
      <form>
        <div class="form-crew">
          <label class="crew-name" for="crew-name"></label>
          <input type="text" id="crew-name" v-model="crewName" class="input-box" placeholder="크루 이름을 입력하세요."/>
        </div>
        <div class="form-crew">
          <label for="crew-description"></label>
          <textarea id="crew-description" v-model="crewDescription" class="input-box" placeholder="간단하게 크루를 소개해주세요."></textarea>
        </div>
        <div class="form-crew">
          <label for="crew-image"></label>크루 표지사진을 업로드 해주세요.
          <input type="file" id="crew-image" @change="handleImageUpload" class="upload-btn" />
        </div>
      </form>
      </div>
    </div>
    <div class="preview-title">데스크톱 미리보기</div>
  <div class="preview-container">
    
      <div class="crew-preview">
        <div class="preview-img">
          <img :src="crewImagePreview" alt="크루 대표 사진" v-if="crewImagePreview" />
          <p v-else>크루 대표 사진이 없습니다.</p>
        </div>
        <h3>{{ crewName }}</h3>
        <p>{{ crewDescription }}</p> 
      </div>
  </div>
  <button class="create-crew-btn" @click.prevent="createCrew">크루 만들기</button>
  </div>
</template>
