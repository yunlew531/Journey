<template>
  <div class="">
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
        <h3 class="tour-text fs-5 tracking-2 mt-5 mx-auto">
          旅行
        </h3>
      </div>
    </header>
    <div class="banner">
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
          體驗心弦的悸動
        </p>
      </div>
      <div
        class="start-travel position-absolute start-50 bottom-25 translate-middle"
      >
        <button
          type="button"
          class="start-travel-btn text-white tracking-3 bg-transparent border rounded-1 px-5 py-2"
        >
          啟動旅程
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
    </div>
  </div>
</template>

<script>
export default {}
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
</style>
