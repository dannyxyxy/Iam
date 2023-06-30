<script setup>
import topBar from "./components/topBar.vue";
import sideBar from "./components/sideBar.vue";
</script>

<template>
  <topBar />
  <sideBar />
  <router-view />
</template>

<style>
@import "./assets/style/App.css";
</style>
