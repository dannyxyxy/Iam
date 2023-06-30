<script>
import { apiClient } from "../utils/axios.js";
import { CONSTANTS } from "../utils/constants.js";
import commonUtil from "../utils/common-util.js";
import { onMounted, ref } from "vue";
import router from "../router/index.js";

export default {
  name: "App",
  data() {
<<<<<<< HEAD
    //데이터 변수값 저장
=======
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
    return {
      PostMain: "/PostMain",
    };
  },
  setup() {
<<<<<<< HEAD
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
=======
    const editing = ref(false);
    const userData = ref({
      userEmail: "",
      userIntro: "",
      userName: "",
      profileImg: "",
    });
    const boardData = ref({});
    const getUserData = async () => {
      const data = await apiClient(
        "user/getUserInfo",
        JSON.parse(commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO))
      );
      if (data.data) {
        userData.value = await data.data;
      } else {
        alert("데이터를 불러오는데 실패했습니다.");
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
      }
    };

    const getBoardList = async () => {
<<<<<<< HEAD
      const data = await apiClient("user/getBoardList", userInfo);
      if (data.resultCode === 1) {
        boardData.value = data.data;
=======
      const data = await apiClient(
        "user/getBoardList",
        JSON.parse(commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO))
      );
      if (data.data) {
        boardData.value = await data.data;
        for (let item in data.data) {
          data.data[item].color = `hsl(${
            parseInt(Math.random() * 24, 10) * 15
          }, 16%, 75%)`;
        }
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
      } else {
        alert("게시물 정보를 불러올 수 없습니다.");
        await router.push("/");
      }
    };
<<<<<<< HEAD

    const profileImgUpload = async (e) => {
      profileFormData.set("userIdx", userInfo.userIdx);
=======
    const profileFormData = new FormData();
    const profileImgUpload = async (e) => {
      profileFormData.set(
        "userIdx",
        JSON.parse(commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO))
          .userIdx
      );
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
      profileFormData.set("file", e.target.files[0]);

      await apiClient("user/uploadProfile", profileFormData)
        .then((r) => {
<<<<<<< HEAD
          if (r.resultCode === 1) {
            alert("프로필 사진 변경 완료!");
            location.reload();
          }
=======
          setTimeout(() => {
            alert("프로필 사진 변경 완료!");
            location.reload();
          }, 1500);
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
        })
        .catch((e) => {
          console.log(e);
          alert("다시 시도해주세요.");
        });
    };

<<<<<<< HEAD
    onMounted(() => {
      getUserData();
      getBoardList();
=======
    const startEditing = () => {
      editing.value = true;
    };
    const saveUsername = async () => {
      await apiClient("user/updateProfile", userData.value)
        .then((r) => {
          userData.value.editing = false;
          alert("업데이트 성공!");
          location.reload();
        })
        .catch((e) => {
          console.log(e);
          alert("업데이트 실패!");
        });
    };

    onMounted(() => {
      if (!commonUtil.loginCheck()) {
        alert("로그인 후에 이용해주세요");
        router.push("/");
      } else {
        getUserData();
        getBoardList();
      }
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
    });

    return {
      userData,
      boardData,
      profileImgUpload,
      CONSTANTS,
<<<<<<< HEAD
=======
      editing,
      startEditing,
      saveUsername,
      uploadCompleteButton: false,
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
    };
  },
};
</script>

<template>
<<<<<<< HEAD
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
=======
  <div class="mypage-container">
    <div class="profile-container">
      <div class="profile-box">
        <div class="profile-img-box">
          <div class="profile-img">
            <img :src="CONSTANTS.API_URL + userData.profileImg" alt="" />
          </div>
          <label class="action-button">
            이미지 변경
            <input
              style="display: none"
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
              type="file"
              accept="image/*"
              multiple="multiple"
              @change="profileImgUpload"
            />
          </label>
        </div>
<<<<<<< HEAD
        <button class="upload-button">개인정보 수정</button>
      </div>
    </div>
=======
        <div class="profile-info">
          <p>{{ userData.userName }}</p>
          <p>{{ userData.userEmail }}</p>
          <p>{{ userData.userIntro }}</p>
          <button class="action-button" @click="startEditing">
            개인정보 수정
          </button>
        </div>
      </div>
    </div>

    <div class="my-Crew">
      <div class="crewpost">
        <h2>내 크루</h2>
      </div>

      <div class="photo-gallery">
  <div v-for="group in groups" :key="group.id" class="photo-group">
    <h2>{{ CrewInfo.CrewName }}</h2>
    <div class="photo-container">
      <div v-for="photo in group.photos" :key="photo.id" class="photo-item">
        <div class="rounded-photo">
          <img :src="CrewInfo.CrewImg" alt="사진" />
        </div>
        <p class="photo-name">{{ photo.name }}</p>
      </div>
    </div>
  </div>
</div>
    </div>

>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
    <div class="divider">
      <div class="mypost">
        <h2>내 게시물 보기</h2>
      </div>
      <div class="mypost-container">
        <div class="container">
<<<<<<< HEAD
          <div class="box" v-for="item in boardData">
            <router-link :to="PostMain">
              <img src="../assets/img/hi.jpg" />
=======
          <div class="box" v-for="(item, index) in boardData" :key="index">
            <router-link :to="{ name: 'PostMain', query: { id: item._id } }">
              <div class="box-img" :style="`background-color: ${item.color}`" />
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
            </router-link>
            <div class="box-summary">
              <div>
                <div class="board-title">{{ item.boardTitle }}</div>
                <div class="board-contents">{{ item.boardContents }}</div>
              </div>
              <div class="circle">
<<<<<<< HEAD
                <img :src="CONSTANTS.API_URL + userData.profileImg" />
=======
                <img :src="CONSTANTS.API_URL + userData.profileImg" alt="" />
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
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
<<<<<<< HEAD
<style></style>
=======
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
