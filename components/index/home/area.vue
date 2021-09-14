<template>
  <section class="continent-panel">
    <ul
      class="continent-list list-unstyled d-flex flex-nowrap overflow-hidden mb-0"
    >
      <li
        v-for="(continent, key) in continents.data"
        :key="continent.id"
        class="continent position-relative"
      >
        <p
          class="overflow-hidden tracking-3 fs-2 text-white position-absolute end-0 bottom-0 mb-5 me-12 z-10"
        >
          <span class="continent-quantity">
            {{ key + 1 &lt; 10 ? `0${key + 1}` : key + 1 }} /
            {{
              continents.data.length &lt; 10
                ? `0${continents.data.length}`
                : continents.data.length
            }}
          </span>
        </p>
        <div class="continent-panel-bg position-absolute w-100 overflow-hidden">
          <img
            :src="continent.photo"
            :alt="continent.title"
            class="bg-photo h-100 position-absolute"
          >
          <div class="wave-panel position-absolute">
            <div class="wave position-absolute" />
            <div class="ps-8 pt-50">
              <h2
                class="text-third fw-bold fs-1 tracking-3 overflow-hidden mb-8"
              >
                <span class="continent-title d-block">
                  {{ continent.title }}</span>
              </h2>
              <div
                class="tour-content fs-5 tracking-2"
                v-html="continent.description"
              />
            </div>
            <h2 class="title text-center position-absolute">
              {{ continent.title }}
            </h2>
          </div>
        </div>
        <NuxtLink to="/" class="text-white text-decoration-none">
          <span class="more-btn border rounded-circle">
            <span class="more-btn-arrow" />
            <span class="more-btn-text tracking-2">我要去這裡!!</span>
          </span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
  props: {
    continents: {
      type: Object,
      default: () => ({}),
      require: true
    }
  },
  data () {
    return {
      maxWidth: 0,
      sections: [],
      timelines: [],
      canSnap: false
    }
  },
  mounted () {
    this.setScrollTrigger()
  },
  methods: {
    calcMaxWidth () {
      this.maxWidth = this.sections.reduce(
        (accumulate, section) => (accumulate += section.offsetWidth),
        0
      )
    },
    setScrollTrigger () {
      this.sections = gsap.utils.toArray('.continent')
      this.calcMaxWidth()
      // X axis transform for sections
      gsap.to(this.sections, {
        xPercent: -100 * (this.sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: '.continent-list',
          pin: true,
          scrub: 1,
          snap: {
            snapTo: this.directionalSnap(1 / (this.sections.length - 1)),
            duration: 1.5,
            inertia: false,
            ease: 'expo.out'
          },
          end: () => `+=${this.maxWidth}`,
          invalidateOnRefresh: true
        }
      })
      // anime timeline for each section
      this.timelines = this.sections.map((section, key) =>
        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: () =>
              'top top-=' +
              (section.offsetLeft - window.innerWidth / 2) *
                (this.maxWidth / (this.maxWidth - window.innerWidth)),
            end: () =>
              '+=' +
              section.offsetWidth *
                (this.maxWidth / (this.maxWidth - window.innerWidth)),
            invalidateOnRefresh: true,
            onEnter: (process) => {
              this.timelines[key].clear()
              const targetSectionEl = process.trigger
              const titleEl = targetSectionEl.querySelector('.title')
              const bgPhotoEl = targetSectionEl.querySelector('.bg-photo')
              const tourContentEl = targetSectionEl.querySelector(
                '.tour-content'
              )
              const continentTitleEl = targetSectionEl.querySelector(
                '.continent-title'
              )
              const wave = targetSectionEl.querySelector('.wave-panel')
              const moreBtn = targetSectionEl.querySelector('.more-btn')
              const continentQty = targetSectionEl.querySelector(
                '.continent-quantity'
              )

              this.timelines[key]
                .addLabel('start', '+=0.5')
                .fromTo(
                  wave,
                  {
                    width: 0,
                    x: '-80px'
                  },
                  {
                    width: '500px',
                    duration: 1,
                    x: 0
                  },
                  'start'
                )
                .addLabel('wave end')
                .to(moreBtn, {
                  duration: 0.5,
                  scale: 1
                })
                .to(
                  titleEl,
                  {
                    y: 0,
                    opacity: 1,
                    duration: 1
                  },
                  'wave end'
                )
                .to(
                  continentQty,
                  {
                    duration: 1,
                    y: 0,
                    autoAlpha: 1
                  },
                  'wave end'
                )
                .to(
                  tourContentEl,
                  {
                    duration: 1,
                    y: 0,
                    opacity: 1
                  },
                  '-=0.5'
                )
                .fromTo(
                  continentTitleEl,
                  {
                    y: '100%'
                  },
                  {
                    duration: 1,
                    y: 0
                  },
                  'wave end'
                )
                .to(
                  wave,
                  {
                    duration: 1
                  },
                  'wave end'
                )
                .fromTo(
                  bgPhotoEl,
                  {
                    filter: 'brightness(0)'
                  },
                  {
                    duration: 5,
                    filter: 'brightness(1)'
                  },
                  'wave end'
                )
            },
            onEnterBack: (process) => {
              this.timelines[key].clear()
              const targetSectionEl = process.trigger
              const wave = targetSectionEl.querySelector('.wave-panel')
              const titleEl = targetSectionEl.querySelector('.title')
              const continentTitleEl = targetSectionEl.querySelector(
                '.continent-title'
              )
              const tourContentEl = targetSectionEl.querySelector(
                '.tour-content'
              )
              const bgPhotoEl = targetSectionEl.querySelector('.bg-photo')
              const moreBtn = targetSectionEl.querySelector('.more-btn')
              const continentQty = targetSectionEl.querySelector(
                '.continent-quantity'
              )

              this.timelines[key]
                .to(bgPhotoEl, {
                  duration: 0,
                  filter: 'brightness(1)'
                })
                .fromTo(
                  wave,
                  {
                    width: '100%'
                  },
                  {
                    duration: 1,
                    width: '500px'
                  },
                  '+=0.5'
                )
                .addLabel('content start')
                .fromTo(
                  titleEl,
                  {
                    y: '100%',
                    opacity: 0
                  },
                  {
                    duration: 1,
                    y: 0,
                    opacity: 1
                  },
                  'content start'
                )
                .fromTo(
                  continentTitleEl,
                  {
                    y: '100%'
                  },
                  {
                    duration: 1,
                    y: 0
                  },
                  'content start'
                )
                .to(
                  moreBtn,
                  {
                    duration: 0.5,
                    scale: 1
                  },
                  'content start'
                )
                .to(
                  continentQty,
                  {
                    duration: 1,
                    y: 0,
                    autoAlpha: 1
                  },
                  'content start'
                )
                .fromTo(
                  tourContentEl,
                  {
                    y: '100%',
                    opacity: 0
                  },
                  {
                    duration: 1,
                    y: 0,
                    opacity: 1
                  },
                  '-=0.5'
                )
            },
            onLeave: (process) => {
              this.timelines[key].clear()
              const targetSectionEl = process.trigger
              const titleEl = targetSectionEl.querySelector('.title')
              const wave = targetSectionEl.querySelector('.wave-panel')
              const tourContentEl = targetSectionEl.querySelector(
                '.tour-content'
              )
              const moreBtn = targetSectionEl.querySelector('.more-btn')
              const continentQty = targetSectionEl.querySelector(
                '.continent-quantity'
              )

              this.timelines[key]
                .addLabel('start')
                .to(
                  wave,
                  {
                    duration: 1,
                    width: '120%'
                  },
                  'start'
                )
                .to(
                  titleEl,
                  {
                    duration: 1,
                    y: '100%',
                    opacity: 0
                  },
                  'start'
                )
                .to(
                  continentQty,
                  {
                    duration: 1,
                    y: 100,
                    autoAlpha: 0
                  },
                  'start'
                )
                .fromTo(
                  tourContentEl,
                  {
                    y: 0,
                    opacity: 1
                  },
                  {
                    opacity: 0,
                    duration: 1,
                    y: '100%'
                  },
                  'start'
                )
                .to(
                  moreBtn,
                  {
                    duration: 0.2,
                    scale: 0
                  },
                  'start'
                )
            },
            onLeaveBack: (process) => {
              this.canSnap = false
              this.timelines[key].clear()
              const targetSectionEl = process.trigger
              const titleEl = targetSectionEl.querySelector('.title')
              const bgPhotoEl = targetSectionEl.querySelector('.bg-photo')
              const wave = targetSectionEl.querySelector('.wave-panel')
              const continentTitleEl = targetSectionEl.querySelector(
                '.continent-title'
              )
              const tourContentEl = targetSectionEl.querySelector(
                '.tour-content'
              )
              const moreBtn = targetSectionEl.querySelector('.more-btn')
              const continentQty = targetSectionEl.querySelector(
                '.continent-quantity'
              )

              this.timelines[key]
                .addLabel('start')
                .to(
                  bgPhotoEl,
                  {
                    filter: 'brightness(0)'
                  },
                  'start'
                )
                .to(
                  titleEl,
                  {
                    duration: 0.2,
                    y: '100%',
                    opacity: 0
                  },
                  'start'
                )
                .to(
                  continentQty,
                  {
                    duration: 0.2,
                    y: 100,
                    autoAlpha: 0
                  },
                  'start'
                )
                .fromTo(
                  wave,
                  {
                    width: '500px'
                  },
                  {
                    duration: 0.5,
                    width: 0,
                    x: '-80px'
                  },
                  'start'
                )
                .to(
                  tourContentEl,
                  {
                    duration: 0.2,
                    opacity: 0,
                    y: '100%'
                  },
                  'start'
                )
                .fromTo(
                  continentTitleEl,
                  {
                    y: 0
                  },
                  {
                    duration: 0.2,
                    y: '100%'
                  },
                  'start'
                )
                .to(
                  moreBtn,
                  {
                    duration: 0.2,
                    scale: 0
                  },
                  'start'
                )
            }
          }
        })
      )
    },
    directionalSnap (increment) {
      const snapFunc = gsap.utils.snap(increment)
      return (raw, self) => {
        const n = snapFunc(raw)
        if (!this.canSnap) {
          this.canSnap = true
          return n
        } else {
          return self.direction < 0 ? n - increment : n + increment
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/node_modules/bootstrap/scss/functions';
@import '@/assets/styleSheets/custom/variables';

.continent-panel {
  background: linear-gradient(
    90deg,
    rgb(16, 17, 31) 0%,
    rgba(25, 26, 48, 1) 100%
  );
}
.continent-title {
  transform: translateY(100%);
}
.continent-panel-bg {
  height: 100%;
  width: 100%;
  right: 0;
  z-index: -1;
  background-color: black;
}
.title {
  width: 100%;
  font-size: 110px;
  letter-spacing: 3rem;
  font-family: 'Long Cang', cursive;
  color: rgba($white, 0.1);
  transform: rotate(-5deg) translateY(100%);
  left: 0;
  bottom: 10%;
  opacity: 0;
}
.continent {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  overflow: hidden;
}
.bg-photo {
  filter: brightness(0);
  width: calc(100% - 500px);
  right: 0;
}
.wave-panel {
  height: 100%;
  top: 0;
  left: 0;
  background: #161927;
  transform: translateX(-80px);
  width: 0;
}
.wave {
  top: -150px;
  right: -2995px;
  height: 150px;
  width: 3000px;
  transform: rotate(90deg) translateX(calc(-100% + 100vh));
  transform-origin: 0 100% 0;
  background-image: url(@/assets/images/wave-1.svg);
  background-position: bottom left;
  animation: 10s wave infinite cubic-bezier(0.36, 0.45, 0.63, 0.53);
}
@keyframes wave {
  0% {
    transform: rotate(90deg) translateX(calc(-100% + 100vh));
  }
  100% {
    transform: rotate(90deg) translateX(calc(-100% + 100vh + 2000px));
  }
}
.tour-content {
  max-width: 470px;
  color: shade-color($white, 10%);
  line-height: 1.8;
  transform: translateY(100%);
  opacity: 0;
}
.more-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  right: 300px;
  bottom: 30px;
  position: absolute;
  transform: scale(0);
}
.more-btn-arrow {
  width: 150px;
  height: 1px;
  background: $white;
  left: -118px;
  position: absolute;
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 1px;
    background: $white;
    top: 0;
    right: 0;
  }
  &::before {
    transform: rotate(45deg);
    transform-origin: 100% 100% 0;
  }
  &::after {
    transform: rotate(-45deg);
    transform-origin: 100% 0 0;
  }
}
.more-btn-text {
  position: absolute;
  top: -5px;
  left: -110px;
}
.continent-content {
  height: 450px;
}
.continent-quantity {
  display: block;
  transform: translateY(100%);
  font-family: $font-family-sans-narrow;
}
</style>
