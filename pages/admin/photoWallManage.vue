<template>
  <section>
    <h4>前面的圖片牆</h4>
    <ul class="imgs-list d-flex flex-wrap list-unstyled border rounded p-8">
      <li
        v-for="(url, key) in frontImgsUrl"
        :key="url"
        class="d-flex justify-content-center align-items-center border position-relative"
      >
        <span v-show="!url">請選擇圖片</span>
        <input
          type="file"
          class="d-block opacity-0 position-absolute w-100 h-100 z-10"
          @change="upLoadImg(key, $event)"
        >
        <img :src="url" class="position-absolute w-100 h-100">
      </li>
    </ul>
    <p>1</p>
  </section>
</template>

<script>
import { apiUpLoadImg } from '@/api'

export default {
  data () {
    return {
      frontImgsUrl: []
    }
  },
  created () {
    this.frontImgsUrl = new Array(18).fill()
  },
  methods: {
    async upLoadImg (key, event) {
      const file = event.target.files[0]
      const formData = new FormData()
      formData.append('img-file', file)
      formData.append('index', key)
      try {
        const { data } = await apiUpLoadImg(formData)
        this.$set(this.frontImgsUrl, key, data.imgUrl)
      } catch (err) {
        alert(err.response.data.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.imgs-list {
  width: 600px;
  > li {
    width: 32%;
    height: 100px;
    margin: 0 2% 2% 0;
    &:nth-child(3n) {
      margin-right: 0;
    }
    &:nth-last-child(1),
    &:nth-last-child(2),
    &:nth-last-child(3) {
      margin-bottom: 0;
    }
  }
}
</style>
