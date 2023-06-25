<script>
import { apiClient } from "../utils/axios.js";
import { onMounted, ref } from "vue";
import { CONSTANTS } from "../utils/constants.js";
import router from "../router/index.js";


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
      id: 0,
      crewId : "",
      profileImg : "",
      crewName : "",
      crewIntro : "",
      ownerName : "",
      crewMember: 0,
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

    onMounted(() => {
      getCrewList();
    });

    return {
      boardData,
    };
  },
  methods: {
    JoinCrew(crewId) {
            alert('크루 가입이 완료되었습니다');
    }
  },
};
</script>

<template>
  <div class="maintext">
    <div class="group-page">
      <div class="content-container">
        <div class="recommended-crews">
          <h2>전체 크루 목록</h2>
          <div class="crew-box-container">
            <div class="crew-box" v-for="item in boardData" :key="item._crewId">
              <router-link :to="{ name: 'CrewPost', query: { id: item._crewId } }">
                <div class="crew-avatar" :style="`background-color: ${item.color}`" />
              </router-link>

              <div class="crew-info">
                <h3>{{ item.crewName }}</h3>
                <p class="crew-description">{{ item.crewIntro }}</p>
                <button type="submit" class="CrewJoin-button" @click="JoinCrew">크루가입</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
@import "../assets/style/view/CrewMain.css";
</style>
