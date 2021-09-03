<template>
  <div class="detail"></div>
</template>

<script>
export default {}
</script>

<style scoped>
.clear-fix :before {
  content: '';
  display: table;
}
.detail {
  height: 100%;
  width: 100%;
  margin-top: 0;
  position: relative;
  z-index: 101;
  background: #fff;
}
.navbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 99;
}
.scroll {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 49px;
  top: 44px;
  width: 100%;
  overflow: hidden;
}
</style>
