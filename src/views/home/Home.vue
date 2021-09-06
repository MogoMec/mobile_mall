<template>
  <div class="home_box">
    <nav-bar>
      <div slot="center">首页</div>
    </nav-bar>
    <scroll
      class="scroll"
      ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @scroll="contentsScroll"
      @pullingUp="loadmore"
    >
      <home-swiper :banners="banners"></home-swiper>
      <recommends :recommends="recommends"></recommends>
      <week-hot></week-hot>
      <tab-control
        class="sticky"
        :controlItems="['流行', '新款', '精选']"
        @tabControlClick="getGoodsType"
        ref="tabcontrol"
      ></tab-control>
      <goods :goods="Goods[currentGoodsType].list" whichgoods="home"></goods>
    </scroll>
    <back-top @click.native="backToTop" v-show="isBackTopShow"></back-top>
  </div>
</template>
<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
import { getHomeData, getHomeGoods } from '@/network/home.js'
import HomeSwiper from './children/HomeSwiper.vue'
import Recommends from './children/Recommends.vue'
import WeekHot from './children/WeekHot.vue'

import TabControl from '../../components/content/tabcontrol/TabControl.vue'
import Goods from '../../components/content/goods/Goods.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'
import BackTop from '../../components/content/backtop/BackTop.vue'
export default {
  data() {
    return {
      banners: [],
      recommends: [],
      Goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentGoodsType: 'pop',
      isBackTopShow: false, //判断是否显示backup
      tabcontrolTop: 0, //记录tabcontrol离顶部的距离
      isTabShow: false //判断tabcontrol是否吸顶
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    Recommends,
    WeekHot,
    TabControl,
    Goods,
    Scroll,
    BackTop
  },
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
      console.log(type)
      this.Goods[type].page++
      getHomeGoods(type, this.Goods[type].page).then(res => {
        this.Goods[type].list.push(...res.data.list)
      })
    },
    getGoodsType(type, index) {
      //获得当前的Tabcontrol类型
      this.currentGoodsType = type
      //使两个tabcontrol的active保持一直
      this.$refs.tabcontrolFade.currentItem = index
      this.$refs.tabcontrol.currentItem = index
    },
    //判断backtop的显示和隐藏
    contentsScroll(position) {
      //判断返回顶部按钮的隐藏和出现
      this.isBackTopShow = -position.y > 1000
      //判断tabcontrol是否吸顶
      this.isTabShow = -position.y > this.tabcontrolTop
    },
    //实现页面可以多次滚动上拉加载功能
    loadmore() {
      this.getHomeGoods(this.currentGoodsType)
      this.$refs.scroll.scroll.finishPullUp()
    },
    //返回顶部
    backToTop() {
      //使用BScroll内部函数
      this.$refs.scroll.scroll.scrollTo(0, 0, 500)
    }
  },
  created() {
    this.getHomeData()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
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
.scroll {
  width: 100%;
  position: absolute;
  overflow: hidden;
  right: 0;
  left: 0;
  top: 44px;
  bottom: 49px;
}
</style>
