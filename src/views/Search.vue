<template>
  <div class="maintext">
    <div class="container">
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
  </div>

    <div class="search-results">

      <h2 > 검색 결과</h2>
      <ul v-if="searchResults">
        <li v-for="item in searchResults" class="search-result">
          <ul>
            
            <div class = "box">
              <router-link :to="{ name: 'PostMain', query: { id: item._id } }">
                <div class="box-img"></div>
              </router-link>

              <div class="box-summary">
                  <li><div class="board-title">
                    <h3>{{ item.boardTitle }}</h3> </div></li>
                  <li><div class="board-contents">
                    <p>{{ item.boardContents }}</p> </div></li>
                
                <div class="username">
                  <span style="font-weight: lighter">by </span>
                  <span style="font-weight: bold">{{ item.userName }}</span>
                </div>
              </div>
            </div>
          </ul>
        </li>
      </ul>
      <p v-if="!searchResults">검색 결과가 없습니다.</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { apiClient } from "../utils/axios.js";
import router from "../router/index.js";

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


ul {
    list-style:none;
}
 
li {
    float: left;
    margin-right: 20pxs;

}

</style>
