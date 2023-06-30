<script>
import { defineComponent } from "vue";
<<<<<<< HEAD

export default defineComponent({
  name: ["Home", "Search","Category","Edit","CrewMain"],
=======
export default defineComponent({
  name: ["Home", "Search", "Edit", "CrewMain", "MyPage"],
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
  data() {
    return {
      Home: "/",
      Search: "/Search",
<<<<<<< HEAD
      Edit:"/Edit",
      Mypage:"/Mypage",
      CrewMain:"/CrewMain"
=======
      Edit: "/Edit",
      CrewMain: "/CrewMain",
      Mypage: "/Mypage",
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
    };
  },
});
</script>

<template>
<<<<<<< HEAD
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
=======
  <div class="sidebar">
    <router-link :to="Home">
      <img src="../assets/img/components/sideBar/main.png" alt="" />
    </router-link>
    <router-link :to="Search">
      <img src="../assets/img/components/sideBar/search.png" alt="" />
    </router-link>
    <router-link :to="Edit">
      <img src="../assets/img/components/sideBar/edit.png" alt="" />
    </router-link>
    <router-link :to="CrewMain">
      <img src="../assets/img/components/sideBar/crew.png" alt="" />
    </router-link>
    <router-link :to="Mypage">
      <img src="../assets/img/components/sideBar/mypage.png" alt="" />
    </router-link>
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
  </div>
</template>
