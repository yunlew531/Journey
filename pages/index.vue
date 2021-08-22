<template>
  <div>
    <header
      class="d-flex justify-content-between position-fixed start-0 end-0 top-0 p-8"
    >
      <h1 class="align-self-start d-flex m-0">
        <NuxtLink to="/" class="title fs-3 tracking-2 text-decoration-none">
          JOURNEY
        </NuxtLink>
      </h1>
      <div>
        <h3
          class="location-btn fs-6 tracking-2 d-flex justify-content-center align-items-center border rounded-circle m-0"
        >
          地區
        </h3>
        <h3 class="tour-text fs-5 tracking-3 mt-5 mx-auto">
          旅行
        </h3>
      </div>
    </header>
    <main>
      <section class="banner">
        <div class="j-filter" />
        <div
          class="position-absolute text-center tracking-3 start-50 top-50 translate-middle"
        >
          <p class="fs-3 lh-1 mb-8">
            刻下動人的記憶
          </p>
          <h3 class="journey-text display-1 lh-1 mb-8">
            JOURNEY
          </h3>
          <p class="fs-5 lh-1">
            喚起心弦的悸動
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
          <div class="scroll-down-anime  overflow-hidden">
            <div class="scroll-down" />
          </div>
        </div>
      </section>
      <section class="north-america-panel container d-flex">
        <div class="continent">
          <div class="north-america-panel-bg overflow-hidden">
            <img
              src="@/assets/images/america-1.jpg"
              alt="north-america"
              class="america-img position-absolute h-100"
            >
            <div class="wave" />
          </div>
          <div class="row">
            <div class="col-6 d-flex flex-column justify-content-center">
              <div class="p-8">
                <h2 class="fw-bold fs-1 mb-8 tracking-3">
                  北美洲
                </h2>
                <p class="tour-content fs-5 tracking-2">
                  這趟旅程將深入了解美國和加拿大的歷史、<br>藝術、地質和野生動物。
                </p>
                <p class="tour-content fs-5 tracking-2">
                  探索加拿大落基山脈，享受北美未受破壞的廣闊荒野，<br>
                  無論您是陸路旅行還是乘船旅行，
                  您都會在該地區多樣迷人的景觀中發現豐富的自然和文化寶藏。
                </p>
                <div class="d-flex justify-content-end mt-12">
                  <NuxtLink to="/" class="text-white text-decoration-none">
                    <span class="more-btn border rounded-circle">
                      <span class="more-btn-arrow" />
                      <span class="more-btn-text tracking-2">MORE</span>
                    </span>
                  </NuxtLink>
                  <Area />
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="rounded bg-secondary shadow-lg p-1">
                <img src="@/assets/images/america-1.jpg" alt="north-america">
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import Area from '@/components/index/area.vue'

export default {
  components: {
    Area
  }
}
</script>

<style lang="scss" scoped>
@import '@/node_modules/bootstrap/scss/functions';
@import '@/assets/styleSheets/custom/variables';
@import '@/node_modules/bootstrap/scss/mixins';

.title {
  font-family: $font-family-sans-narrow;
  color: $secondary;
  transition: 0.3s;
  &:hover {
    color: shade-color($secondary, 30%);
  }
}
.location-btn {
  width: 80px;
  height: 80px;
}
.tour-text {
  writing-mode: vertical-lr;
}
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
.north-america-panel-bg {
  height: 100%;
  position: absolute;
  right: 0;
  z-index: -1;
  background-color: black;
  width: 35%;
  // animation: left-right 6s infinite;
}
@keyframes left-right {
  0% {
    width: 120%;
  }
  60% {
    width: 35%;
  }
  100% {
    width: 35%;
  }
}
.america-img {
  animation: 6s dark-bright infinite;
  filter: brightness(40%);
  // filter: brightness(0);
}
@keyframes dark-bright {
  0% {
    filter: brightness(40%);
    // filter: brightness(0);
  }
  60% {
    // filter: brightness(0);
  }
  99% {
    filter: brightness(40%);
  }
}
.continent {
  height: 100vh;
  display: flex;
  align-items: center;
}
.wave {
  top: -150px;
  left: -1px;
  height: 150px;
  width: 3000px;
  transform: rotate(90deg) translateX(calc(-100% + 100vh));
  transform-origin: 0 100% 0;
  position: absolute;
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
  color: shade-color($white, 10%);
  line-height: 1.8;
}
.more-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  position: relative;
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
  top: -10px;
  left: -85px;
}
</style>
