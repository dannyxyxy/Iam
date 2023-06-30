<<<<<<< HEAD
<template>
  <div class="maintext">
    <div class="search">
      <input
        type="text"
        placeholder="검색어를 입력하세요."
        @input="data.searchQuery = $event.target.value"
        @submit.prevent
      />
      <div class="search_img">
        <button
          @click="search"
          style="background-color: transparent; border: none; padding: 0"
        >
          <img
            src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"
          />
        </button>
      </div>
    </div>

    <div class="search-results">
      <h2>검색 결과</h2>
      <ul v-if="searchResults">
        <li v-for="item in searchResults" class="search-result">
          <ul>
            <li><h3>{{ item.boardTitle }}</h3></li>
            <li><p>{{ item.boardContents }}</p></li>
          </ul>
        </li>
      </ul>
      <p v-if="!searchResults">
        <h2>검색 결과가 없습니다.</h2>
        검색 결과가 없습니다.</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { apiClient } from "../utils/axios.js";

export default {
  setup() {
    const data = ref({
      searchQuery: "",
    });
    const searchResults = ref([]);
    const hasSearchResults = ref(false);

    const search = async () => {
      await apiClient("board/search", data.value)
        .then((r) => {
          console.log(r);
          searchResults.value = r.data;
=======
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
          console.log(r);
          searchResults.value = r.data;
          for (let item in r.data) {
            r.data[item].color = `hsl(${
              parseInt(Math.random() * 24, 10) * 15
            }, 16%, 75%)`;
          }
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
        })
        .catch((e) => {
          console.log(e);
        });
    };

    return {
      data,
      searchResults,
<<<<<<< HEAD
      hasSearchResults,
=======
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
      search,
    };
  },
};
</script>

<<<<<<< HEAD
<style>
.search {
  margin-top: 50px;
  position: relative;
  width: 100%;
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
.search-bar {
  width: 220px;
  height: 27px;
  border-radius: 5px;
  border: solid 1px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  opacity: 1;
}
.search-bar__input {
  width: 50px;
  border: none;
  text-align: center;
  margin-left: 10px;
  overflow: auto;
  z-index: -1;
  font-size: 15px;
}
.search-bar__input:focus {
  outline: none;
  width: 300px;
  text-align: left;
}
.fa-search {
  font-size: 15px;
}
.search-results input[type="text"] {
  width: 500px; /* 늘리고자 하는 크기에 맞게 값을 변경해주세요 */
  height: 50px;
  padding: 10px 10px;
  font-size: 16px;
  border: 1px solid #000;
  border-radius: 20px;
  outline: none;
  box-shadow: none;
}
.search-results {
  margin: 20px;
}
.search-result {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px 20px 30px 20px;
  border: 1px solid #ffffff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(238, 238, 238, 0.933);
  background-color: #ffffff;
  position: relative;
}
.search-result:before {
  content: "";
  position: absolute;
  top: -10px;
  right: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 10px 10px 0;
  border-color: transparent #ffffff transparent transparent;
}
</style>
=======
<template>
  <div class="maintext">
    <div class="search-container">
      <div class="search">
        <input
          type="search"
          placeholder="검색어를 입력하세요."
          @input="data = $event.target.value"
          @submit.prevent
          @keydown.enter.prevent="search"
        />
        <img
          src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"
          alt=""
        />
      </div>

      <div class="search-results">
        <h2>검색 결과</h2>
        <div class="search-results-box" v-if="searchResults.length > 0">
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
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
