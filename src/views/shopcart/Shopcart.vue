<template>
  <div class="shopcart_box">
    <nav-bar class="nav-bar">
      <div slot="center">购物车&nbsp;({{ $store.state.goodsCount }})</div>
    </nav-bar>
    <scroll class="scroll" :probeType="0" :pull-up-load="false" ref="scroll">
      <contents @webupdate="webupdate"></contents>
    </scroll>
    <cart-tab-bar class="cart-tab-bar"></cart-tab-bar>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'
import CartTabBar from './children/CartTabBar.vue'
import Contents from './children/Contents.vue'
export default {
  components: { NavBar, Scroll, Contents, CartTabBar },
  methods: {
    //监听购物车页面刷新，来刷新滚动距离
    webupdate() {
      this.$refs.scroll.scroll.refresh()
    }
  }
}
</script>
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
