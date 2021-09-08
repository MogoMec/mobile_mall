<template>
  <div class="recommend">
    <Goods :goods="recommends" whichgoods="detail" />
  </div>
</template>

<script>
import Goods from '../../../components/content/goods/Goods'
export default {
  props: ['recommends'],
  components: {
    Goods
  }
}
</script>

<style scoped></style>
