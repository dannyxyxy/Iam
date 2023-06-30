<script>
import { apiClient } from "../utils/axios.js";
import { onMounted, ref } from "vue";
import { CONSTANTS } from "../utils/constants.js";
<<<<<<< HEAD
import commonUtil from "../utils/common-util.js";
import router from "../router/index.js";
=======
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43

export default {
  name: "App",
  computed: {
    CONSTANTS() {
      return CONSTANTS;
    },
  },
<<<<<<< HEAD
  data() {
    //데이터 변수값 저장
    return {
      PostMain: "/PostMain",
      isDarkMode: false,
=======

  data() {
    return {
      PostMain: "/PostMain",
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
      i: "",
      title: "-",
      summary: "-",
      user: "-",
      isTrendActive: true,
      selected: "trend",
    };
  },
<<<<<<< HEAD
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
=======
  setup() {
    const boardData = ref({});

    const getBoardList = async () => {
      await apiClient("board/getBoardList")
        .then((r) => {
          boardData.value = r.data;
          for (let item in r.data) {
            r.data[item].color = `hsl(${
              parseInt(Math.random() * 24, 10) * 15
            }, 16%, 75%)`;
          }
        })
        .catch((e) => {
          alert("게시물 정보를 불러올 수 없습니다.");
          console.log(e);
        });
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
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
  <div class="maintext">
    <div>
      <div class="container">
        <div class="box" v-for="item in boardData" :key="item._id">
          <router-link :to="{ name: 'PostMain', query: { id: item._id } }">
<<<<<<< HEAD
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
=======
            <div class="box-img" :style="`background-color: ${item.color}`" />
          </router-link>
          <div class="box-summary">
            <div>
              <div class="board-title">
                {{ item.boardTitle }}
              </div>
              <div class="board-contents">{{ item.boardContents }}</div>
            </div>
            <div class="meta-info-box">
              <div class="circle">
                <img
                  v-if="item.profileImg !== null || undefined"
                  :src="CONSTANTS.API_URL + item.profileImg"
                  alt=""
                />
                <div
                  v-else
                  class="exchangeImg"
                  :style="`background-color: ${item.color}`"
                />
              </div>
              <div class="username">
                <span style="font-weight: lighter">by </span>
                <span style="font-weight: bold">{{ item.userName }}</span>
              </div>
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
