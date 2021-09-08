<template>
  <div class="nav-bar">
    <nav-bar>
      <div slot="left" class="left" @click="backClick">
        <img src="../../../assets/img/common/back.svg" alt="" />
      </div>

      <div slot="center" class="center">
        <span
          v-for="(item, index) in CenterItems"
          :key="index"
          class="title"
          @click="titleClick(index)"
          :class="{ active: currentTitle === index }"
        >
          {{ item }}
        </span>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '../../../components/common/navbar/NavBar'
export default {
  data() {
    return {
      CenterItems: ['商品', '参数', '评论', '推荐'],
      currentTitle: 0
    }
  },
  components: {
    NavBar
  },
  methods: {
    titleClick(i) {
      this.currentTitle = i
      this.$emit('navbarClick', i)
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.nav-bar {
  background: #fff;
}
.left img {
  margin-top: 11px;
}
.center {
  display: flex;
}
.title {
  flex: 1;
  font-size: 13px;
}
.active {
  color: var(--color-tint);
}
</style>
