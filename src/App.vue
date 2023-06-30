<script setup>
<<<<<<< HEAD
import topbar from "./components/topBar.vue";
import sidebar from "./components/sideBar.vue";

</script>

<template>
  <sidebar />
  <topbar />
=======
import topBar from "./components/topBar.vue";
import sideBar from "./components/sideBar.vue";
</script>

<template>
  <topBar />
  <sideBar />
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
  <router-view />
</template>

<style>
@import "./assets/style/App.css";
</style>
