<template>
  <swiper :banners="banners" @anima="anima">
    <div
      v-for="(item, index) in banners"
      class="slide"
      :key="index"
      slot="slide"
      :class="[{ isPlay: isPlay }]"
    >
      <img :src="item" alt="" />
    </div>
  </swiper>
</template>

<script>
import Swiper from '@/components/common/swiper/Swiper.vue'
export default {
  props: ['banners'],
  data() {
    return {
      isPlay: true
    }
  },
  components: {
    Swiper
  },
  methods: {
    anima(value) {
      this.isPlay = value
    }
  }
}
</script>

<style scoped>
.isPlay {
  transition: all 0.3s;
}
</style>
