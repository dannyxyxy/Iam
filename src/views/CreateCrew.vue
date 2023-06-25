<script>
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
  },
  setup() {
    onMounted(async () => {
      const loginCheck = commonUtil.loginCheck();
      if (!loginCheck) {
        alert("로그인 후에 이용해주세요");
        await router.push("/");
      }
    });
    const crewInfo = {
      id: 0,
      crewId: "",
      profileImg: "",
      crewName: "",
      crewIntro: "",
      ownerName: "",
      crewMember: 0,
    };
    const CreateCrew = async () => {
      if (
        
        crewInfo.crewName &&
        crewInfo.crewIntro
      ) {
        const MakeCrew = await apiClient("crew/MakeCrew", crewInfo);
        if (MakeCrew.resultCode === 1) {
          alert("크루 생성 성공!");
          location.reload();
        } else {
          alert("크루생성 실패!");
        }
    } else {
      alert("빈 칸 없이 모두 입력 해주세요.");
    }
};
return {
  crewInfo,
  CreateCrew,
};
  },
};
</script>

<template>
  <div class="maintext">
    <h2>크루 만들기</h2>
    <div class="crew-preview">
      <div class="preview-img">
        <img :src="crewImagePreview" alt="크루 대표 사진" v-if="crewImagePreview" class="centered-image">
        <div class="centered-text">
          <h1>{{ crewName }}</h1>
        </div>
      </div>
      <form @submit.prevent>
      <div class="crew-imageLoad">크루 표지사진을 업로드 해주세요.
        <input type="file" id="crew-image" @change="handleImageUpload" class="upload-btn" @input="crewInfo.profileImg = $event.target.value"
              required/>
      </div>
        <div class="crew-text">
          <div class="crew-name-container">
            <input type="text" id="crew-name" v-model="crewName" class="input-box" placeholder="크루 이름을 입력하세요." @input="crewInfo.crewName = $event.target.value"
              required/>
          </div>
          <div class="description-space">
            <div class="crew-description">
              <input type="text" id="crew-description" v-model="crewDescription" class="input-box"
                placeholder="간단하게 크루를 소개해주세요." @input="crewInfo.crewIntro = $event.target.value"
              required>
            </div>
          </div>
        </div>
        <router-link to="/CrewPost">
    <button class="create-crew-btn" type="submit" @click.prevent="createCrew">크루 만들기</button>
  </router-link>
      </form>
    </div>
   
  </div>
</template>
