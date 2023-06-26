<script>
import { apiClient } from "../utils/axios.js";
import { onMounted, ref } from "vue";
import { CONSTANTS } from "../utils/constants.js";

export default {
  name: "App",
  computed: {
    CONSTANTS() {
      return CONSTANTS;
    },
  },
  
  data() {
    return {
      PostMain: "/PostMain",
      i: "",
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
      writeTime: "",
      boardTitle: "",
      boardContents: "",
      userName: "",
      profileImg: "",
      likeCount: 0,
    });
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
            <div class="box-img" :style="`background-color: ${item.color}`" />
          </router-link>
          <div class="box-summary">
            <div>
              <div class="board-title">
                {{ item.boardTitle }}
              </div>
              <div class="board-contents">{{ item.boardContents }}</div>
            </div>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
