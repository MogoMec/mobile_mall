<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <maintabbar />
  </div>
</template>
<script>
import maintabbar from "./components/content/mainTabbar/maintabbar.vue";
export default {
  components: {
    maintabbar
  }
};
</script>
<style>
@import "assets/css/base.css";
</style>
