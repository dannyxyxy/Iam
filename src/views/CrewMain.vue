<script>
import { apiClient } from "../utils/axios.js";
<<<<<<< HEAD
import commonUtil from "../utils/common-util.js";
import router from "../router/index.js";

export default {
  data() {
    return {
      recommendedCrews: [
        { id: 4, name: '크루 4', avatar: 'hi.jpg', description: '크루 4에 대한 설명입니다.', memberCount: 20, postCount: 50 },
        { id: 5, name: '크루 5', avatar: 'avatar5.png', description: '크루 5에 대한 설명입니다.', memberCount: 15, postCount: 30 },
        { id: 6, name: '크루 6', avatar: 'avatar6.png', description: '크루 6에 대한 설명입니다.', memberCount: 12, postCount: 25 },
      ]
    };
  },
  methods: {
    JoinCrew() {
      alert('크루 가입이 완료되었습니다');
    },
    joinCrew(crewId) {
      // 가입 버튼 클릭 시 동작하는 메서드
      // crewId를 이용하여 가입 로직을 구현하세요.
      // 예시: 가입 API 호출 또는 가입 상태 변경 등의 작업을 수행합니다.
      console.log('크루 가입', crewId);
      alert('크루 가입이 완료되었습니다');
    }
  },

  JoinCrew() {
    alert('크루 가입이 완료되었습니다');
  }
}
</script>

<template>
  <div class="maintext">
    <div class="group-page">
      <div class="content-container">
        <div class="recommended-crews">
          <h2>전체 크루 목록</h2>
          <div class="crew-box-container">
            <div class="crew-box" v-for="crew in recommendedCrews" :key="crew.id">
              <router-link to="/CrewPost">
                <div class="crew-avatar"></div>
              </router-link>

              <div class="crew-info">
                <h3>{{ crew.name }}</h3>
                <p class="crew-description">{{ crew.description }}</p>
                <div class="crew-stats">
                  <p class="stat-label">멤버 {{ crew.memberCount }}명</p>
                  <div class="dot"></div>
                  <p class="stat-label">게시물 {{ crew.postCount }}개</p>
                </div>
                <button type="submit" class="CrewJoin-button" @click="JoinCrew">크루가입</button>
              </div>
            </div>
=======
import { onMounted, ref } from "vue";
import { CONSTANTS } from "../utils/constants.js";
import router from "../router/index.js";
import commonUtil from "../utils/common-util.js";

export default {
  name: "App",
  computed: {
    CONSTANTS() {
      return CONSTANTS;
    },
  },
  data() {
    return {
      CrewPost: "/CrewPost",
      title: "-",
      summary: "-",
      user: "-",
      isTrendActive: true,
      selected: "trend",
    };
  },
  setup() {
    const boardData = ref({
      crewName: "",
      crewIntro: "",
      crewImg: "",
      ownerInfo: "",
    });
    const getCrewList = async () => {
      await apiClient("crew/getCrewList")
        .then((r) => {
          boardData.value = r.data;
          for (let item in r.data) {
            r.data[item].color = `hsl(${
              parseInt(Math.random() * 24, 10) * 15
            }, 16%, 75%)`;
          }
        })
        .catch((e) => {
          alert("크루 정보를 불러올 수 없습니다.");
          console.log(e);
        });
    };
    const JoinCrew = async (e) => {
      const userLocalInfo = JSON.parse(
        commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO)
      );
      if (userLocalInfo.isMember) {
        alert("이미 크루에 가입된 사용자입니다!");
        return; // Stop further execution of the function
      }
      await apiClient("crew/JoinCrew", {
        userIdx: userLocalInfo.userIdx,
        crewIdx: boardData.crewName,
      })
        .then((r) => {
          alert("크루 가입 성공!");
          location.reload();
        })
        .catch((e) => {
          alert("오류 발생!");
          location.reload();
        });
    };

    onMounted(() => {
      getCrewList();
    });

    return {
      boardData,
      JoinCrew,
    };
  },
};
</script>

<template>
  <div class="crewmain-container">
    <div class="recommended-crews">
      <h2>전체 크루 목록</h2>
      <div class="crew-box-container">
        <div class="crew-box" v-for="item in boardData" :key="item._crewId">
          <router-link :to="{ name: 'CrewPost', query: { id: item._id } }">
            <div
              class="crew-avatar"
              :style="`background-color: ${item.color}`"
            />
          </router-link>
          <div class="crew-info">
            <h3>{{ item.crewName }}</h3>
            <p class="crew-description">{{ item.crewIntro }}</p>
            <button type="submit" class="CrewJoin-button" @click="JoinCrew">
              크루가입
            </button>
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
@import "../assets/style/view/CrewMain.css";
</style>
