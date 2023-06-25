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
      PostMain: "/PostMain",
    };
  },
  setup() {
    const userData = ref({
      userName: "",
      userEmail: "",
      profileImg: "",

      newUsername: "",
      editing: false,
    });
    const boardData = ref({
      writeTime: "",
      boardTitle: "",
      boardContents: "",
      userName: "",
    });
    const getUserData = async () => {
      if (commonUtil.loginCheck()) {
        await apiClient(
          "user/getUserInfo",
          JSON.parse(commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO))
        )
          .then((r) => {
            userData.value = r.data;
          })
          .catch((e) => {
            alert("로그인 후에 이용해주세요");
            router.push("/");
          });
      }
    };

    const getBoardList = async () => {
      const data = await apiClient(
        "user/getBoardList",
        JSON.parse(commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO))
      );
      if (data.resultCode === 1) {
        boardData.value = data.data;
      } else {
        alert("게시물 정보를 불러올 수 없습니다.");
        await router.push("/");
      }
    };
    const profileFormData = new FormData();
    const profileImgUpload = async (e) => {
      profileFormData.set("userIdx", userInfo.userIdx);
      profileFormData.set("file", e.target.files[0]);

      await apiClient("user/uploadProfile", profileFormData)
        .then((r) => {
          if (r.resultCode === 1) {
            alert("프로필 사진 변경 완료!");
            location.reload();
          }
        })
        .catch((e) => {
          console.log(e);
          alert("다시 시도해주세요.");
        });
    };

  
      const startEditing = () => {
        editing.value = true;
        newUsername.value = userName.value;
      }
      const saveUsername = () => {
        userName.value = newUsername.value;
        editing.value = false;
      }


    onMounted(() => {
      getUserData();
      getBoardList();
    });

    return {
      userData,
      boardData,
      profileImgUpload,
      CONSTANTS,
      
      startEditing,
      saveUsername,
      uploadCompleteButton: false,
    };
  },
};
</script>

<template>
  <div class="maintext">
    <div>
      <div class="profile">
        <div class="profile-picture">
          <div class="profile-img">
            <img :src="CONSTANTS.API_URL + userData.profileImg" alt="" />
          </div>
          <input type="file" ref="imageInput" style="display: none" />
        </div>

        <div class="profile-info">
          <!-- 닉네임 -->
          <h1>{{ userData.userName }}</h1>
          <!-- 자기소개글
          <h3>{{ userData.userIntro }}</h3>
           -->
          <p>{{ userData.userEmail }}</p>
        </div>
      </div>

      <div class="button-wrapper">
        <div class="upload-button">
          <label>
            이미지 업로드
            <input
              type="file"
              accept="image/*"
              multiple="multiple"
              @change="profileImgUpload"
            />
          </label>
        </div>
        <!-- <button class="upload-button">개인정보 수정</button> -->
  
        <div>
          <div v-if="!editing">
            <span>{{ userName }}</span>
            <button class="upload-button" @click="startEditing">개인정보 수정</button>
          </div>
          <div v-else>
            <input v-model="newUsername" type="text">
            <button class="uploadCompleteButton" @click="saveUsername">수정 완료</button>
          </div>
        </div>
      </div>
    </div>

    <div class="my-Crew">
      <div class="crewpost">
        <h2>내 크루</h2>
      </div>

      <!-- 여기가 크루. 크루 사진주소랑 크루 이름주소 필요해요 -->
      <div class="photo-gallery">
        <div v-for="group in groups" :key="group.id" class="photo-group">
          <h2>{{ group.name }}</h2>
          <div class="photo-container">
            <div v-for="photo in group.photos" :key="photo.id" class="photo-item">
              <div class="rounded-photo">
                <img :src="photo.url" alt="사진" />
              </div>
              <p class="photo-name">{{ photo.name }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="divider">
      <div class="mypost">
        <h2>내 게시물 보기</h2>
      </div>
      <div class="mypost-container">
        <div class="container">
          <div class="box" v-for="(item, index) in boardData" :key="index">
            <router-link :to="PostMain">
              <img src="../assets/img/hi.jpg" />
            </router-link>
            <div class="box-summary">
              <div>
                <div class="board-title">{{ item.boardTitle }}</div>
                <div class="board-contents">{{ item.boardContents }}</div>
              </div>
              <div class="circle">
                <img :src="CONSTANTS.API_URL + userData.profileImg" />
              </div>
              <div class="username">
                <span style="font-weight: lighter">by </span>
                <span style="font-weight: bold">{{ item.userName }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
