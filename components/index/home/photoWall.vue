<template>
  <section class="photo-wall-panel position-relative">
    <ul
      class="front-photos d-flex flex-wrap justify-content-between list-unstyled position-relative"
    >
      <li
        v-for="photo in frontPhotos"
        :key="photo"
        class="photo-front bg-transparent"
      >
        <img
          class="shadow-lg mx-auto rounded"
          src="https://images.unsplash.com/photo-1524946274118-e7680e33ccc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
          alt=""
        >
      </li>
    </ul>
    <ul
      class="back-photos position-absolute start-50 d-flex flex-wrap flex-column list-unstyled"
    >
      <li v-for="photo in backPhotos" :key="photo" class="photo-back">
        <img
          class="shadow-lg rounded"
          src="https://images.unsplash.com/photo-1630702379394-e202e2fbe01e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2034&q=80"
          alt=""
        >
      </li>
    </ul>
  </section>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
  data () {
    return {
      frontPhotos: 18,
      backPhotos: 10
    }
  },
  mounted () {
    this.setScrollTrigger()
  },
  methods: {
    setScrollTrigger () {
      gsap.to('.front-photos', {
        y: -2000,
        scrollTrigger: {
          trigger: '.photo-wall-panel',
          scrub: 1.5
        }
      })

      gsap.to('.back-photos', {
        y: -1500,
        scrollTrigger: {
          trigger: '.photo-wall-panel',
          scrub: 1.5
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-wall-panel {
  height: 2500px;
}
.front-photos {
  z-index: 10;
}
.back-photos {
  z-index: 0;
  width: 60%;
  top: 300px;
  padding-right: 110px;
  transform: translateX(-50%);
}
.photo-front {
  > img {
    width: 400px;
    height: 300px;
  }
  &:nth-child(3n) {
    width: 100%;
  }
}
.photo-back {
  margin-bottom: 90px;
  > img {
    width: 280px;
    height: 210px;
  }
  &:nth-child(2n) {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
