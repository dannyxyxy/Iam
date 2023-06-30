<script>
<<<<<<< HEAD
export default {
  data() {
    return {
      crewName: '',
      crewDescription: '',
      crewImage: null,
      crewImagePreview: ''
=======
import "@toast-ui/editor/dist/toastui-editor.css";
import { apiClient } from "../utils/axios.js";
import commonUtil from "../utils/common-util.js";
import { onMounted } from "vue";
import { CONSTANTS } from "../utils/constants.js";
import router from "../router/index.js";

export default {
  data() {
    return {
      CrewPost: "/CrewPost",
      crewName: "",
      crewDescription: "",
      crewImage: null,
      crewImagePreview: "",
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
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
<<<<<<< HEAD
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
=======
        this.crewImagePreview = "";
      }
    },
  },
  setup() {
    onMounted(async () => {
      const loginCheck = commonUtil.loginCheck();
      if (!loginCheck) {
        alert("로그인 후에 이용해주세요");
        await router.push("/CrewMain");
      }
    });
    const crewInfo = {
      id: 0,
      crewName: "",
      crewImg: "",
      crewIntro: "",
      ownerName: "",
      crewMember: 0,
    };
    const crewUp = async () => {
      if (crewInfo.profileImg && crewInfo.crewName && crewInfo.crewIntro) {
    const data = await apiClient("crew/createCrew", crewInfo);
    if (data && data.resultCode === 1) { // 데이터가 정의되어 있는지 확인 후 resultCode 속성에 접근합니다.
      alert("크루 생성 성공!");
          location.reload();
        } else {
          alert("크루생성 실패!");
        }
      } else {
        alert("빈 칸 없이 모두 입력 해주세요.");
      }
      router.push("/CrewMain");
    };
    return {
      crewInfo,
      crewUp,
    };
  },
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
};
</script>

<template>
<<<<<<< HEAD
  <div class="maintext">
    <h2>크루 만들기</h2>
    <div class="crew-preview">
      <div class="preview-img">
        <img :src="crewImagePreview" alt="크루 대표 사진" v-if="crewImagePreview" class="centered-image">
=======
  <div class="create-crew-container">
    <h2>크루 만들기</h2>
    <div class="createcrew-preview">
      <div class="preview-img">
        <img
          :src="crewImagePreview"
          alt="크루 대표 사진"
          v-if="crewImagePreview"
          class="centered-image"
        />
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
        <div class="centered-text">
          <h1>{{ crewName }}</h1>
        </div>
      </div>
<<<<<<< HEAD
      <div class="crew-imageLoad">크루 표지사진을 업로드 해주세요.
        <input type="file" id="crew-image" @change="handleImageUpload" class="upload-btn" />
      </div>
      
      <form>
        <div class="crew-text">
          <div class="crew-name-container">
            <input type="text" id="crew-name" v-model="crewName" class="input-box" placeholder="크루 이름을 입력하세요." />
          </div>
          <div class="description-space">
            <div class="crew-description">
              <textarea id="crew-description" v-model="crewDescription" class="input-box"
                placeholder="간단하게 크루를 소개해주세요."></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
    <button class="create-crew-btn" @click.prevent="createCrew">크루 만들기</button>
=======
      <form @submit.prevent>
        <div class="crew-imageLoad">
          크루 표지사진을 업로드 해주세요.
          <input
            type="file"
            id="crew-image"
            @change="handleImageUpload"
            class="upload-btn"
            @input="crewInfo.profileImg = $event.target.value"
            required
          />
        </div>
        <div class="crew-text">
          <div class="crew-name-container">
            <input
              type="text"
              id="crew-name"
              v-model="crewName"
              class="input-box"
              placeholder="크루 이름을 입력하세요."
              @input="crewInfo.crewName = $event.target.value"
              required
            />
          </div>
          <div class="description-space">
            <div class="crew-description">
              <input
                type="text"
                id="crew-description"
                v-model="crewDescription"
                class="input-box"
                placeholder="간단하게 크루를 소개해주세요."
                @input="crewInfo.crewIntro = $event.target.value"
                required
              />
            </div>
          </div>
        </div>
        <button class="action-button" type="submit" @click="crewUp">
          만들기
        </button>
      </form>
    </div>
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
  </div>
</template>
