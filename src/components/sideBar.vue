<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: ["Home", "Search", "Edit", "CrewMain", "MyPage"],
  data() {
    return {
      Home: "/",
      Search: "/Search",
      Edit: "/Edit",
      CrewMain: "/CrewMain",
      Mypage: "/Mypage",
    };
  },
});
</script>

<template>
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
  </div>
</template>
