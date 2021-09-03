<template>
  <div class="shopcart_box"></div>
</template>

<style scoped>
.shopcart_box {
  height: 100%;
}
.nav-bar {
  background: var(--color-tint);
  color: #fff;
  z-index: 99;
  position: relative;
  top: 0;
  right: 0;
  left: 0;
}
.scroll {
  width: 100%;
  position: absolute;
  top: 44px;
  right: 0;
  left: 0;
  bottom: 98px;
  overflow: hidden;
}
.cart-tab-bar {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 49px;
  z-index: 99;
}
</style>
