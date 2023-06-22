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
        })
        .catch((e) => {
          console.log(e);
        });
    };

    return {
      data,
      searchResults,
      hasSearchResults,
      search,
    };
  },
};
</script>

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
