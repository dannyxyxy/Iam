<script setup>
import topbar from "./components/topBar.vue";
import sidebar from "./components/sideBar.vue";

</script>

<template>
  <sidebar />
  <topbar />
  <router-view />
</template>

<style>
@import "./assets/style/App.css";
</style>
