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
    const loginCheck = commonUtil.loginCheck();
    const userData = ref({
      userName: "",
      userIntro: "",
      userEmail: "",
      profileImg: "",
    });
    const boardData = ref({
      writeTime: "",
      boardTitle: "",
      boardContents: "",
      userName: "",
      likeCount: 0,
    });
    const profileFormData = new FormData();
    const userInfo = JSON.parse(
      commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO)
    );
    const getUserData = async () => {
      if (loginCheck) {
        const data = await apiClient("user/getUserInfo", userInfo);

        if (data.resultCode === 1) {
          userData.value = data.data;
        } else {
          alert("정보를 불러올 수 없습니다. 관리자에게 문의하세요");
          await router.push("/");
        }
      } else {
        alert("로그인 후에 이용해주세요");
        await router.push("/");
      }
    };

    const getBoardList = async () => {
      const data = await apiClient("user/getBoardList", userInfo);
      if (data.resultCode === 1) {
        boardData.value = data.data;
      } else {
        alert("게시물 정보를 불러올 수 없습니다.");
        await router.push("/");
      }
    };

    const profileImgUpload = (e) => {
      profileFormData.set("userIdx", userInfo.userIdx);
      profileFormData.set("file", e.target.files[0]);

      apiClient("user/uploadProfile", profileFormData)
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

    onMounted(() => {
      getUserData();
      getBoardList();
    });

    return {
      userData,
      boardData,
      profilePreview,
      profileImgUpload,
      CONSTANTS,
    };
  },
};
</script>

<template>
  <div class="maintext" :class="{ 'dark-mode': isDarkMode }">
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
          <!-- 자기소개글 -->
          <h3>{{ userData.userIntro }}</h3>
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
        <button class="upload-button">개인정보 수정</button>
      </div>
    </div>
    <div class="divider">
      <div class="mypost">
        <h2>내 게시물 보기</h2>
      </div>
      <div class="mypost-container">
        <div class="container">
          <div class="box" v-for="item in boardData">
            <router-link :to="PostMain">
              <img src="../assets/img/hi.jpg" />
            </router-link>
            <div class="box-summary">
              <div>
                <div class="board-title">{{ item.boardTitle }}</div>
                <div class="board-contents">{{ item.boardContents }}</div>
              </div>
              <div class="circle"><img src="../assets/img/profile.jpg" /></div>
              <div class="username">
                <span style="font-weight: lighter">by</span>
                <span style="font-weight: bold">{{ item.userName }}</span>
              </div>
              <div>
                <button class="like-btn" @click="likeCountTap(item)">
                  <i class="fas fa-heart"></i
                  ><img src="../assets/img/heart.png" />{{ item.likeCount }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
