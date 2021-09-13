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
    <section
      class="introduce-panel d-flex flex-column align-items-center py-50"
    >
      <h2 class="introduce-title tracking-3 display-3 mb-10">
        JOURNEY
      </h2>
      <p class="fs-4">
        體驗豐富的旅行，解鎖新的知識。
      </p>
      <p class="fs-4">
        融入當地的文化 —— 更好地了解世界。
      </p>
      <div class="introduce-panel-numbers d-flex py-10">
        <p class="fs-4 px-10">
          會員成長
          <span class="fs-1 ms-1 text-danger">{{ numbers.membersGrow }} +</span>
        </p>
        <p class="fs-4 px-10">
          賣出數量
          <span class="fs-1 ms-1 text-danger">{{ numbers.salesQty }} +</span>
        </p>
        <p class="fs-4 px-10">
          回購率
          <span class="fs-1 ms-1 text-danger">{{ numbers.repurchase }} %</span>
        </p>
      </div>
    </section>
    <PhotoWall />
    <Area :continents="continents" />
  </div>
</template>

<script>
import { gsap } from 'gsap'
import Area from '@/components/index/home/area.vue'
import PhotoWall from '@/components/index/home/photoWall.vue'
import { apiGetContinents } from '@/api'

export default {
  components: {
    Area,
    PhotoWall
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
  data () {
    return {
      numbers: {
        membersGrow: 0,
        repurchase: 0,
        salesQty: 0
      }
    }
  },
  mounted () {
    this.setScrollTrigger()
  },
  methods: {
    setScrollTrigger () {
      const numbers = {
        membersGrow: 0,
        repurchase: 0,
        salesQty: 0
      }
      const snap = gsap.utils.snap(1)

      const membersGrowTween = gsap.to(numbers, {
        ease: 'power4',
        onUpdate: () => {
          const { membersGrow } = numbers
          this.numbers.membersGrow = snap(membersGrow)
        },
        membersGrow: 500,
        duration: 6,
        scrollTrigger: {
          trigger: '.introduce-panel-numbers',
          end: () => '+=100%',
          onEnter: () => {
            membersGrowTween.restart()
          },
          onLeave: () => {
            membersGrowTween.restart().pause()
          },
          onEnterBack: () => {
            membersGrowTween.restart()
          },
          onLeaveBack: () => {
            membersGrowTween.restart().pause()
          }
        }
      })
      membersGrowTween.pause()

      const salesQtyTween = gsap.to(numbers, {
        ease: 'power4',
        onUpdate: () => {
          const { salesQty } = numbers
          this.numbers.salesQty = snap(salesQty)
        },
        salesQty: 6500,
        duration: 6,
        delay: 1.5,
        scrollTrigger: {
          trigger: '.introduce-panel-numbers',
          end: () => '+=100%',
          onEnter: () => {
            salesQtyTween.restart(true)
          },
          onLeave: () => {
            salesQtyTween.restart().pause()
          },
          onEnterBack: () => {
            salesQtyTween.restart(true)
          },
          onLeaveBack: () => {
            salesQtyTween.restart().pause()
          }
        }
      })
      salesQtyTween.pause()

      const repurchaseTween = gsap.to(numbers, {
        ease: 'power4',
        onUpdate: () => {
          const { repurchase } = numbers
          this.numbers.repurchase = snap(repurchase)
        },
        repurchase: 80,
        duration: 8,
        delay: 3,
        scrollTrigger: {
          trigger: '.introduce-panel-numbers',
          end: () => '+=100%',
          onEnter: () => {
            repurchaseTween.restart(true)
          },
          onLeave: () => {
            repurchaseTween.restart().pause()
          },
          onEnterBack: () => {
            repurchaseTween.restart(true)
          },
          onLeaveBack: () => {
            repurchaseTween.restart().pause()
          }
        }
      })
      repurchaseTween.pause()

      gsap.to('.introduce-panel', {
        y: -200,
        scrollTrigger: {
          trigger: '.introduce-panel-numbers',
          start: () => '-=300',
          scrub: 1.5
        }
      })
    }
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
.introduce-title {
  font-family: $font-family-sans-narrow;
}
</style>
