import { debounce } from './utils.js'
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    var newRefresh = debounce.call(this, this.$refs.scroll.scroll.refresh, 100)
    this.itemImgListener = () => {
      console.log(this)
      newRefresh()
    }
    this.$bus.$on('Imghasload', this.itemImgListener)
  }
}
