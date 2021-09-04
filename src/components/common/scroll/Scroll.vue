<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: ['probeType', 'pullUpLoad'],
  data() {
    return {
      scroll: null
    }
  },
  //el挂载后创建Bscroll实例
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      //监听类型
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    console.log(this.scroll)
    //监听滚动时的坐标变化
    this.scroll.on('scroll', positon => {
      this.$emit('scroll', positon)
    })
    //监听上拉加载
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  }
}
</script>

<style scoped></style>
