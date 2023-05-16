<script setup></script>

<template>
  <div class="maintext" :class="{ 'dark-mode': isDarkMode }">
  <div class="search-results">
   <div class="search-bar">
     <input type="text" v-model="searchQuery" @input="search" placeholder="검색어를 입력하세요">
     
     <button @click="search" style="background-color: transparent; border: none; padding: 0;">
     <img src="..\assets\img\search_icon.png" alt="검색" style="display: block; width: 50%;">
   </button>
   </div>
  <h2>검색 결과</h2>
   <ul>
     <li v-for="result in searchResults" :key="result.id" class="search-result">
       <h3>{{ result.title }}</h3>
       <p>{{ result.content }}</p>
     </li>
   </ul>
 </div>
 <div>
   <ul>
     <li v-for="result in searchResults" :key="result.id">{{ result.title }}</li>
   </ul>
 </div>
</div>
</template>



<script>
import { ref } from 'vue';

export default {
 setup() {
   const searchQuery = ref('');
   const searchResults = ref([]);

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
     
   }

   // 검색어 입력 이벤트를 처리하는 함수
   function handleInput() {
     // 검색어 입력 시 검색어를 초기화하고 검색 결과를 비웁니다.
     searchQuery.value = '';
     searchResults.value = [];
   }

   

   return {
     searchQuery,
     searchResults,
     search,
     handleInput,
   };
 },
};

</script>


<style>
.search-results input[type="text"] {
 width: 600px; /* 늘리고자 하는 크기에 맞게 값을 변경해주세요 */
 padding: 10px 20px;
 font-size: 16px;
 border: 1px solid #010000;
 border-radius: 3px;
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
