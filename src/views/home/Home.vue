<template>
  <div class="home_box">
    <nav-bar>
      <div slot="center">首页</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
  </div>
</template>
<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
import { getHomeData, getHomeGoods } from '@/network/home.js'
import HomeSwiper from './children/HomeSwiper.vue'
export default {
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  components: { NavBar, HomeSwiper },
  methods: {
    //获取Home页面数据
    getHomeData() {
      getHomeData().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    //接收Home页面的下划商品数据
    getHomeGoods(type) {
      this.Goods[type].page++
      getHomeGoods(type, this.Goods[type].page).then(res => {
        this.Goods[type].list.push(...res.data.list)
      })
    }
  },
  created() {
    this.getHomeData()
  }
}
</script>
<style scoped>
.home_box {
  position: relative;
  height: 100%;
  width: 100%;
}
.nav-bar {
  background: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 99;
}
.fixed {
  position: fixed;
  top: 44px;
  right: 0;
  left: 0;
}
.scroll {
  width: 100%;
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>
