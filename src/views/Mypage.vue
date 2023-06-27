<script>
import { apiClient } from "../utils/axios.js";
import { CONSTANTS } from "../utils/constants.js";
import commonUtil from "../utils/common-util.js";
import { onMounted, ref } from "vue";
import router from "../router/index.js";

export default {
  name: "App",
  data() {
    return {
      PostMain: "/PostMain",
    };
  },
  setup() {
    const editing = ref(false);
    const userData = ref({});
    const boardData = ref({});
    const userLocalInfo = JSON.parse(
      commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO)
    );
    const getUserData = async () => {
      if (commonUtil.loginCheck()) {
        await apiClient("user/getUserInfo", userLocalInfo)
          .then((r) => {
            userData.value = r.data;
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        alert("로그인 후에 이용해주세요");
        await router.push("/");
      }
    };

    const getBoardList = async () => {
      await apiClient("user/getBoardList", userLocalInfo)
        .then((r) => {
          boardData.value = r.data;
          console.log(r);
        })
        .catch((e) => {
          console.log(e);
          alert("게시물 정보를 불러올 수 없습니다.");
          router.push("/");
        });
    };
    const profileFormData = new FormData();
    const profileImgUpload = async (e) => {
      profileFormData.set("userIdx", userLocalInfo.userIdx);
      profileFormData.set("file", e.target.files[0]);

      await apiClient("user/uploadProfile", profileFormData)
        .then((r) => {
          alert("프로필 사진 변경 완료!");
          location.reload();
        })
        .catch((e) => {
          console.log(e);
          alert("다시 시도해주세요.");
        });
    };

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
      getUserData();
      getBoardList();
    });

    return {
      userData,
      boardData,
      profileImgUpload,
      CONSTANTS,
      editing,
      startEditing,
      saveUsername,
      uploadCompleteButton: false,
    };
  },
};
</script>

<template>
  <div class="mypage-container">
    <div class="profile-container">
      <div class="profile-box">
        <div class="profile-img-box">
          <div class="profile-img">
            <img :src="CONSTANTS.API_URL + userData.profileImg" alt="" />
            <input type="file" ref="imageInput" style="display: none" />
          </div>
          <label class="action-button">
            이미지 변경
            <input
              style="display: none"
              type="file"
              accept="image/*"
              multiple="multiple"
              @change="profileImgUpload"
            />
          </label>
        </div>
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

      <!-- 여기가 크루. 크루 사진주소랑 크루 이름주소 필요해요 -->
      <div class="photo-gallery">
        <div v-for="group in groups" :key="group.id" class="photo-group">
          <h2>{{ group.name }}</h2>
          <div class="photo-container">
            <div
              v-for="photo in group.photos"
              :key="photo.id"
              class="photo-item"
            >
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
