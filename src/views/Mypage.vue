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
      }
    };

    const getBoardList = async () => {
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
      } else {
        alert("게시물 정보를 불러올 수 없습니다.");
        await router.push("/");
      }
    };
    const profileFormData = new FormData();
    const profileImgUpload = async (e) => {
      profileFormData.set(
        "userIdx",
        JSON.parse(commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO))
          .userIdx
      );
      profileFormData.set("file", e.target.files[0]);

      await apiClient("user/uploadProfile", profileFormData)
        .then((r) => {
          setTimeout(() => {
            alert("프로필 사진 변경 완료!");
            location.reload();
          }, 1500);
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
      if (!commonUtil.loginCheck()) {
        alert("로그인 후에 이용해주세요");
        router.push("/");
      } else {
        getUserData();
        getBoardList();
      }
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
      <!--      <div class="photo-gallery">-->
      <!--        <div v-for="group in groups" :key="group.id" class="photo-group">-->
      <!--          <h2>{{ group.name }}</h2>-->
      <!--          <div class="photo-container">-->
      <!--            <div-->
      <!--              v-for="photo in group.photos"-->
      <!--              :key="photo.id"-->
      <!--              class="photo-item"-->
      <!--            >-->
      <!--              <div class="rounded-photo">-->
      <!--                <img :src="photo.url" alt="사진" />-->
      <!--              </div>-->
      <!--              <p class="photo-name">{{ photo.name }}</p>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>

    <div class="divider">
      <div class="mypost">
        <h2>내 게시물 보기</h2>
      </div>
      <div class="mypost-container">
        <div class="container">
          <div class="box" v-for="(item, index) in boardData" :key="index">
            <router-link :to="{ name: 'PostMain', query: { id: item._id } }">
              <div class="box-img" :style="`background-color: ${item.color}`" />
            </router-link>
            <div class="box-summary">
              <div>
                <div class="board-title">{{ item.boardTitle }}</div>
                <div class="board-contents">{{ item.boardContents }}</div>
              </div>
              <div class="circle">
                <img :src="CONSTANTS.API_URL + userData.profileImg" alt="" />
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
