<template>
  <div class="goodsitem" @click="goodsitemClick">
    <div class="img">
      <img v-lazy="goodsImg" alt="" class="goods-img" @load="Imghasload" />
    </div>

    <div class="info">
      <div class="goods-txt">{{ goodsitems.title }}</div>
      <div class="goods-price">￥{{ goodsitems.price }}</div>
      <div class="goods-cfav">{{ goodsitems.cfav }}人收藏</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['goodsitems', 'whichgoods'],
  methods: {
    Imghasload() {
      if (this.whichgoods === 'home') {
        this.$bus.$emit('Imghasload')
      } else if (this.whichgoods === 'detail') {
        this.$bus.$emit('Commendhasload')
      }
    },
    goodsitemClick() {
      this.$router.push('/detail/' + this.goodsitems.iid)
    }
  },
  computed: {
    goodsImg() {
      if (this.whichgoods === 'home') {
        return this.goodsitems.show.img
      }
      return this.goodsitems.image
    }
  }
}
</script>

<style scoped>
.goodsitem {
  width: 48%;
  padding-bottom: 40px;
  position: relative;
  display: flex;
}
.img {
  width: 100%;
}
.goodsitem img {
  width: 100%;
  border-radius: 13px;
  padding: 8px 5px;
}
.info {
  padding: 0 8px;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  font-size: 14px;
  text-align: center;
}
.info .goods-txt {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-bottom: 6px;
}
.info .goods-price {
  float: left;
  color: #ff0031;
  font-weight: 700;
  font-size: 16px;
}
.info .goods-cfav {
  margin-left: 5px;
  float: left;
  padding-top: 3px;
  font-size: 12px;
}
</style>
