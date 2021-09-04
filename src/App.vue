<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <maintabbar />
  </div>
</template>
<script>
import maintabbar from './components/content/mainTabbar/maintabbar.vue'
export default {
  components: {
    maintabbar
  }
}
</script>
<style>
@import 'assets/css/base.css';
#app {
  height: 100%;
  width: 100%;
}
</style>
