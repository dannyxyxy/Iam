<script>
import { apiClient } from "../utils/axios.js";
import { onMounted, ref } from "vue";

export default {
  name: "App",
  data() {
    //데이터 변수값 저장
    return {
      PostMain: "/PostMain",
      isDarkMode: false,
      i: 6,
      title: "Title",
      summary: "summary",
      user: "danny",
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
      writeTime: "",
      boardTitle: "",
      boardContents: "",
      userName: "",
      likeCount: 0,
    });
    const getBoardData = async () => {
      const data = await apiClient("board/getBoard", {});
      if (!boardData.resultCode === 1) {
        alert("게시물 정보를 불러올 수 없습니다.");
      } else {
        boardData.value = data.data;
      }
    };

    onMounted(getBoardData);

    return {
      boardData,
    };
  },
};
</script>

<template>
  <div class="maintext" :class="{ 'dark-mode': isDarkMode }">
    <div>
      <div class="button-container">
        <button
          class="btn"
          :class="{ active: selected === 'trend' }"
          @click="selected = 'trend'"
        >
          <img src="../assets/img/trend.png" />트렌드
        </button>
        <button
          class="btn"
          :class="{ active: selected === 'latest' }"
          @click="selected = 'latest'"
        >
          <img src="../assets/img/latest.png" />최신순
        </button>
      </div>
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
              <span style="font-weight:lighter">by</span> <span style="font-weight: bold">{{ item.userName }}</span>
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
</template>
