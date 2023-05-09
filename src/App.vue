<script setup>
import topbar from "./components/topBar.vue";
import sidebar from "./components/sideBar.vue";
import Home from "./views/Home.vue";
</script>

<template>
  <sidebar />
  <topbar />
  <Home />
</template>

<style>
@import "./assets/style/App.css";
</style>
