<script>
import { apiClient } from "../utils/axios.js";
import { onMounted, ref } from "vue";
import { CONSTANTS } from "../utils/constants.js";
import commonUtil from "../utils/common-util.js";
import router from "../router/index.js";

export default {
  name: "App",
  computed: {
    CONSTANTS() {
      return CONSTANTS;
    },
  },
  data() {
    //데이터 변수값 저장
    return {
      PostMain: "/PostMain",
      isDarkMode: false,
      i: "",
      title: "-",
      summary: "-",
      user: "-",
      isTrendActive: true,
      selected: "trend",
    };
  },
  methods: {
    //함수만드는곳 this. 꼭 붙힐것
    toggleMode() {
      this.isDarkMode = !this.isDarkMode;
    },
    toggleTrend() {
      this.isTrendActive = !this.isTrendActive;
    },
    likeCountTap(item) {
      // const data = apiClient("board/likeCount", item);
      console.log(item);
    },
  },
  setup() {
    const boardData = ref({
      id: 0,
      writeTime: "",
      boardTitle: "",
      boardContents: "",
      userName: "",
      profileImg: "",
      likeCount: 0,
    });
    const getBoardList = async () => {
      const data = await apiClient("board/getBoardList", {});
      if (!boardData.resultCode === 1) {
        alert("게시물 정보를 불러올 수 없습니다.");
      } else {
        boardData.value = data.data;
      }
    };

    onMounted(() => {
      getBoardList();
    });

    return {
      boardData,
    };
  },
};
</script>

<template>
  <div class="maintext" :class="{ 'dark-mode': isDarkMode }">
    <div>
      <div class="container">
        <div class="box" v-for="item in boardData" :key="item._id">
          <router-link :to="{ name: 'PostMain', query: { id: item._id } }">
            <div class="box-img"></div>
          </router-link>
          <div class="box-summary">
            <div>
              <div class="board-title">{{ item.boardTitle }}</div>
              <div class="board-contents">{{ item.boardContents }}</div>
            </div>
            <div class="circle">
              <img :src="CONSTANTS.API_URL + item.profileImg" alt="" />
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
</template>
