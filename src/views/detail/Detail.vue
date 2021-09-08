<template>
  <div class="detail">
    <detail-nav-baritem
      class="navbar clear-fix"
      ref="navbar"
      @navbarClick="navbarClick"
    ></detail-nav-baritem>
    <scroll
      :probe-type="3"
      :pull-up-load="true"
      class="scroll"
      ref="scroll"
      @scroll="contentsScroll"
    >
      <detail-swiper :banners="topImages"></detail-swiper>
      <title-info :goods="goods"></title-info>
      <shop-info :shop="shop"></shop-info>
      <goods-info
        :detail-info="detailInfo"
        @goodsImgLoad="goodsImgLoad"
      ></goods-info>
      <params :paramInfo="goodsParams" ref="params"></params>
      <comments :commentInfo="commentsInfo" ref="comment"></comments>
      <recommend :recommends="recommends" ref="recommend"></recommend>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <alert :is-show="alert_isShow"></alert>
  </div>
</template>

<script>
import Scroll from '../../components/common/scroll/Scroll.vue'
import {
  GetDetailData,
  GetRecommend,
  GoodsDate,
  Shop,
  GoodsParams
} from '../../network/detail'
import Alert from './children/Alert.vue'
import Comments from './children/Comments.vue'
import DetailBottomBar from './children/DetailBottomBar.vue'
import DetailNavBaritem from './children/DetailNavBaritem.vue'
import DetailSwiper from './children/DetailSwiper.vue'
import GoodsInfo from './children/GoodsInfo.vue'
import Params from './children/GoodsParams.vue'
import Recommend from './children/Recommend.vue'
import ShopInfo from './children/ShopInfo.vue'
import TitleInfo from './children/TitleInfo.vue'
export default {
  name: 'Detail',
  components: {
    DetailNavBaritem,
    DetailSwiper,
    TitleInfo,
    ShopInfo,
    GoodsInfo,
    Scroll,
    Comments,
    Params,
    Recommend,
    DetailBottomBar,
    Alert
  },
  data() {
    return {
      iid: '', //商品iid值
      topImages: [], //详情页轮播图图片
      goods: {}, //详情页商品基本信息
      shop: {}, //详情页店铺信息
      detailInfo: {}, //商品详情信息
      goodsParams: {}, //商品参数信息
      commentsInfo: {}, //商品评论信息
      recommends: {}, //详情页底部推荐商品
      backUp_isShow: false, //记录返回顶部按钮的状态
      topY: [], //记录滚动Y方向的位置
      navbarIndex: 0, //记录当前滚动位置对应导航栏中哪个标签
      alert_isShow: false //记录'成功加入购物车弹框的状态'
    }
  },
  created() {
    //获取当前iid
    this.iid = this.$route.params.iid
    //请求商品数据
    this.getDetailData()
    //请求商品推荐数据
    GetRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  methods: {
    getTopY() {
      this.topY = []
      this.topY.push(0)
      //获取详情页参数、评论、推荐  三个组件的TopY值
      this.topY.push(this.$refs.params.$el.offsetTop)
      this.topY.push(this.$refs.comment.$el.offsetTop)
      this.topY.push(this.$refs.recommend.$el.offsetTop)
      console.log(this.topY)
    },
    getDetailData() {
      GetDetailData(this.iid).then(res => {
        const data = res.result
        //获取轮播图图片
        this.topImages = data.itemInfo.topImages
        //获取商品标题信息
        this.goods = new GoodsDate(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        )
        //获取商家店铺信息
        this.shop = new Shop(data.shopInfo)
        //获取商品详情信息
        this.detailInfo = data.detailInfo
        //获取商品参数信息
        this.goodsParams = new GoodsParams(data.itemParams)
        //获取用户评论信息(本项目中只有一条评论信息，所以只获取一条)
        if (data.rate.list) {
          this.commentsInfo = data.rate.list[0]
        }
      })
    },
    //检测商品详情图片是否加载完成
    goodsImgLoad() {
      this.$refs.scroll.scroll.refresh()
      this.getTopY()
    },
    contentsScroll(position) {
      //滚动内容时将内容坐标与导航栏标题匹配起来
      if (-position.y >= this.topY[0] && -position.y < this.topY[1]) {
        this.$refs.navbar.currentTitle = 0
      } else if (-position.y >= this.topY[1] && -position.y < this.topY[2]) {
        this.$refs.navbar.currentTitle = 1
      } else if (-position.y >= this.topY[2] && -position.y < this.topY[3]) {
        this.$refs.navbar.currentTitle = 2
      } else if (-position.y >= this.topY[3]) {
        this.$refs.navbar.currentTitle = 3
      }
    },
    //点击详情页导航栏，跳转相应位置
    navbarClick(index) {
      console.log(index)
      this.$refs.scroll.scroll.scrollTo(0, -this.topY[index], 500)
      this.navbarIndex = index
    },
    //监听详情页的加入购物车事件
    addToCart() {
      //先获取添加的商品需要在购物车展示的数据
      const cartgoods = {}
      cartgoods.iid = this.iid
      cartgoods.image = this.topImages[0]
      cartgoods.title = this.goods.title
      cartgoods.price = this.goods.realPrice
      cartgoods.desc = this.goods.desc
      cartgoods.count = 1
      //将商品添加到vuex中
      this.$store.dispatch('addGoods', cartgoods)
      //在此页面显示‘成功加入购物车的弹框’
      this.alert_isShow = true
      setTimeout(() => {
        this.alert_isShow = false
      }, 2000)
    }
  }
}
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
  background-color: #fff;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  top: 44px;
  width: 100%;
  overflow: hidden;
}
</style>
