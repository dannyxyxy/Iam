<template>
<div class="maintext">
  <div class="search">
    <input type="text" placeholder="검색어를 입력하세요">
      <div class="search_img">
        <button @click="search" style="background-color: transparent; border: none; padding: 0;">
          <img src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png">    
        </button>
      </div>
  </div>

  <div class="search-results">
      <h2>검색 결과</h2>
      <ul v-if="searchResults.length > 0">
        <li v-for="result in searchResults" :key="result.id" class="search-result">
          <h3>{{ result.title }}</h3>
          <p>{{ result.content }}</p>
        </li>
      </ul>
      <p v-else>검색 결과가 없습니다.</p>
    </div>
</div>
  
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const searchQuery = ref('');
    const searchResults = ref([]);
    const hasSearchResults = ref(false);

    function search() {
      // 검색어로 검색 요청을 보내고 검색 결과를 searchResults에 할당합니다.
      searchResults.value = [
        { id: 1, title: 'Vue.js 입문', content: 'Vue.js를 배워보세요.' },
        { id: 2, title: 'Vue.js 심화', content: 'Vue.js를 더욱 깊이 이해해보세요.' },
        { id: 3, title: 'React vs Vue.js', content: 'React와 Vue.js의 장단점을 비교해보세요.' },
        { id: 4, title: 'Angular vs Vue.js', content: 'Angular와 Vue.js의 차이점을 비교해보세요.' },
        { id: 5, title: 'Vue.js 채용 공고', content: 'Vue.js 개발자를 모집합니다.' },
      ];

      // 검색어와 일치하는 검색 결과만 추출하여 filteredResults에 저장합니다.
      const filteredResults = searchResults.value.filter(result => result.title.includes(searchQuery.value));

      // filteredResults 배열을 searchResults에 할당합니다.
      searchResults.value = filteredResults;

      // 검색 결과가 있는지 확인하여 hasSearchResults 값을 업데이트합니다.
      hasSearchResults.value = searchResults.value.length > 0;
    }

    return {
      searchQuery,
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
}


.search input {
  width: 100%;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
}

.search img {
  position : absolute;
  width: 17px;
  top: 10px;
  right: 12px;
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
  height:50px;
  padding: 10px 10px;
  font-size: 16px;
  border: 1px solid #000;
  border-radius: 5px;
  outline: none;
  box-shadow: none;
}


.search-results {
  margin: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
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


h3 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #7b5cc0;
}

p {
  font-size: 16px;
  color: #555;
}

.icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url('https://example.com/icon.png');
  background-size: cover;
  margin-right: 5px;
}
</style>
