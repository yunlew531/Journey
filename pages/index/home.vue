<template>
  <div>
    <section class="banner position-relative">
      <div class="j-filter" />
      <div
        class="position-absolute text-center tracking-3 start-50 top-50 translate-middle"
      >
        <p class="text-white fs-3 lh-1 mb-8">
          刻下動人的記憶
        </p>
        <h3 class="text-white journey-text display-1 lh-1 mb-8">
          JOURNEY
        </h3>
        <p class="text-white fs-5 lh-1">
          喚起心中的悸動
        </p>
      </div>
      <div
        class="start-travel position-absolute start-50 bottom-25 translate-middle"
      >
        <button
          type="button"
          class="start-travel-btn text-white tracking-3 bg-transparent border rounded-1 px-5 py-2"
        >
          開啟旅程
        </button>
      </div>
      <div
        class="scroll-area d-flex flex-column align-items-center position-absolute end-25 bottom-0"
      >
        <span class="tracking-3 pb-2">scroll</span>
        <div class="scroll-down-anime overflow-hidden">
          <div class="scroll-down" />
        </div>
      </div>
    </section>
    <div class="position-relative overflow-hidden">
      <Introduce />
      <PhotoWall />
      <div class="globe w-100">
        <img
          class="mountain-img position-absolute start-0"
          src="@/assets/images/desert.png"
          alt="mountain"
        >
      </div>
    </div>
    <Area :continents="continents" />
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Introduce from '@/components/index/home/introduce.vue'
import PhotoWall from '@/components/index/home/photoWall.vue'
import Area from '@/components/index/home/area.vue'
import { apiGetContinents } from '@/api'

gsap.registerPlugin(ScrollTrigger)
export default {
  components: {
    Introduce,
    PhotoWall,
    Area
  },
  async asyncData () {
    let continents = {}
    try {
      const { data } = await apiGetContinents()
      const { continents: resContinents, photo } = data
      continents = {
        data: resContinents,
        quantity: resContinents.length,
        photo,
        currentContinentIdx: 0
      }
    } catch (err) {
      alert('網站維護中')
    }

    return {
      continents
    }
  },
  mounted () {
    const mountainTween = gsap.to('.mountain-img', {
      y: 0,
      duration: 1
    })
    mountainTween.pause()

    ScrollTrigger.create({
      trigger: '.globe',
      start: 'top top',
      end: '+=2500',
      pin: true,
      onEnter: () => mountainTween.restart(),
      onLeaveBack: () => mountainTween.reverse(),
      onLeave: () =>
        gsap.to('.globe', {
          filter: 'brightness(0)',
          duration: 1
        }),
      onEnterBack: () =>
        gsap.to('.globe', {
          filter: 'brightness(1)',
          duration: 1
        })
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styleSheets/custom/variables';

.journey-text {
  font-family: $font-family-sans-narrow;
}
.banner {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/banner.jpg') center;
}
.j-filter {
  width: 100%;
  height: 100%;
  background: url('@/assets/images/Journey.png') center;
  background-size: cover;
}
.scroll-area {
  font-family: $font-family-sans-narrow;
}
.scroll-down-anime {
  height: 100px;
}
.scroll-down {
  width: 2px;
  height: 100%;
  padding-top: 30px;
  background: rgba($white, 0.3);
  animation: 5s scroll-down infinite;
}
@keyframes scroll-down {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}
.start-travel {
  &::before,
  &::after {
    transition: 0.5s;
    content: '';
    position: absolute;
    background-color: $white;
    height: 0;
    width: 1px;
    top: 0px;
    animation: 5s start-btn-anime-top-bottom infinite ease-out;
  }
  &::before {
    left: -5px;
    top: 10px;
  }
  &::after {
    right: -5px;
    top: -10px;
  }
}
@keyframes start-btn-anime-top-bottom {
  20% {
    opacity: 0;
    height: 0;
  }
  60% {
    opacity: 1;
    height: 100%;
  }
  100% {
    opacity: 0;
    height: 100%;
  }
}
.start-travel-btn {
  &::before,
  &::after {
    width: 0;
    transition: 0.5s;
    content: '';
    position: absolute;
    background-color: $white;
    height: 1px;
    animation: 5s start-btn-anime-left-right infinite ease-out;
  }
  &::before {
    left: 10px;
    top: -5px;
  }
  &::after {
    right: 10px;
    bottom: -5px;
  }
}
@keyframes start-btn-anime-left-right {
  20% {
    opacity: 0;
    width: 0;
  }
  60% {
    opacity: 1;
    width: 100%;
  }
  100% {
    width: 100%;
    opacity: 0;
  }
}
.globe {
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: url('@/assets/images/sky-up-1.jpg') center no-repeat;
  background-size: cover;
  transform: scaleY(1.1);
  > .mountain-img {
    bottom: 0;
    transform: translateY(100%);
  }
  filter: brightness(1);
}
</style>
