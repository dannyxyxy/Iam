<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: ["Home", "Search", "Category", "Edit", "CrewMain"],
  data() {
    return {
      Home: "/",
      Search: "/Search",
      Edit: "/Edit",
      Mypage: "/Mypage",
      CrewMain: "/CrewMain",
    };
  },
});
</script>

<template>
  <div class="sidebar">
    <div class="menu">
      <router-link :to="Home">
        <img src="../assets/img/components/sideBar/main.png" />
      </router-link>
      <router-link :to="Search">
        <img src="../assets/img/components/sideBar/search.png" />
      </router-link>
      <router-link :to="Edit">
        <img src="../assets/img/components/sideBar/edit.png" />
      </router-link>
      <router-link :to="CrewMain">
        <img src="../assets/img/components/sideBar/crew.png" />
      </router-link>
      <router-link :to="Mypage">
        <img src="../assets/img/components/sideBar/mypage.png" />
      </router-link>
    </div>
  </div>
</template>
