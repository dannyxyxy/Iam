<script>
import { CONSTANTS } from "../utils/constants.js";
import { ref } from "vue";
import { apiClient } from "../utils/axios.js";
import router from "../router/index.js";

export default {
  name: "Search",
  computed: {
    CONSTANTS() {
      return CONSTANTS;
    },
  },

  setup() {
    const data = ref("");
    const searchResults = ref([]);

    const search = async () => {
      await apiClient("board/search", { searchQuery: data.value })
        .then((r) => {
          searchResults.value = r.data;
          for (let item in r.data) {
            r.data[item].color = `hsl(${
              parseInt(Math.random() * 24, 10) * 15
            }, 16%, 75%)`;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    return {
      data,
      searchResults,
      search,
    };
  },
};
</script>

<template>
  <div class="maintext">
    <div class="container">
      <div class="search">
        <input
          type="text"
          placeholder="검색어를 입력하세요."
          @input="data = $event.target.value"
          @submit.prevent
          @keydown.enter.prevent="search"
        />
        <div class="search_img">
          <button
            @click="search"
            style="background-color: transparent; border: none; padding: 0"
          >
            <img
              src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"
              alt=""
            />
          </button>
        </div>
      </div>

      <div class="search-results">
        <h2>검색 결과</h2>
        <div class="container-box" v-if="searchResults.length > 0">
          <div class="box" v-for="item in searchResults" :key="item._id">
            <router-link :to="{ name: 'PostMain', query: { id: item._id } }">
              <div class="box-img" :style="`background-color: ${item.color}`" />
            </router-link>
            <div class="box-summary">
              <div>
                <div class="board-title">
                  {{ item.boardTitle }}
                </div>
              </div>
              <div>
                <div class="board-contents">
                  {{ item.boardContents }}
                </div>
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
        <div v-show="searchResults.length === 0 && data !== ''">
          검색 결과가 없습니다.
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.search {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
}
.search input {
  width: 100%;
  border: 1px solid #bbb;
  border-radius: 10px;
  padding: 30px;
  font-size: 20px;
}
.search img {
  position: absolute;
  width: 30px;
  top: 25px;
  right: 20px;
  margin: 0;
}
.container-box {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
</style>
