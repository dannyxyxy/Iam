<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: ["Home", "Search","Category","Edit","CrewMain"],
  data() {
    return {
      Home: "/",
      Search: "/Search",
      Edit:"/Edit",
      Mypage:"/Mypage",
      CrewMain:"/CrewMain"
    };
  },
});
</script>

<template>
  <div>
    <ul class="menu">
      <router-link :to="Home">
        <img src="../assets/img/components/sideBar/main.png" />
        메인
      </router-link>
      <router-link :to="Search">
        <img src="../assets/img/components/sideBar/search.png" />
        검색
      </router-link>
      <router-link :to="Edit">
        <img src="../assets/img/components/sideBar/edit.png" />
        글작성
      </router-link>
      <router-link :to="CrewMain">
        <img src="../assets/img/components/sideBar/crew.png" />
        크루
      </router-link>
      <router-link :to="Mypage">
        <img src="../assets/img/components/sideBar/mypage.png" />
        마이페이지
      </router-link>
    </ul>
  </div>
</template>
