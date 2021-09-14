<template>
  <section
    class="introduce-panel position-relative z-10 d-flex flex-column align-items-center py-50"
  >
    <h2 class="introduce-title fw-bold tracking-3 display-3 mb-10">
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
        <span
          class="fs-1 ms-1 fw-bold text-danger"
        >{{ numbers.membersGrow }} +</span>
      </p>
      <p class="fs-4 px-10">
        賣出數量
        <span
          class="fs-1 ms-1 fw-bold text-danger"
        >{{ numbers.salesQty }} +</span>
      </p>
      <p class="fs-4 px-10">
        回購率
        <span
          class="fs-1 ms-1 fw-bold text-danger"
        >{{ numbers.repurchase }} %</span>
      </p>
    </div>
  </section>
</template>

<script>
import { gsap } from 'gsap'

export default {
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
          start: () => '-=400',
          scrub: 1.5
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styleSheets/custom/variables';

.introduce-title {
  font-family: $font-family-sans-narrow;
}
</style>
