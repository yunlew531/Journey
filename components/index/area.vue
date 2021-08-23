<template>
  <section class="north-america-panel continent position-relative">
    <div class="north-america-panel-bg overflow-hidden z-10 m-0">
      <ul class="list-unstyled">
        <li
          v-for="(continent, key) in continents.data"
          v-show="key === continents.currentContinentIdx"
          :key="continent.id"
        >
          <img
            :src="continent.photo"
            :alt="continent.title"
            class="america-img position-absolute h-100"
          >
        </li>
      </ul>
      <div class="wave" />
    </div>
    <div class="container z-10">
      <ul class="list-unstyled">
        <li
          v-for="(continent, key) in continents.data"
          v-show="key === continents.currentContinentIdx"
          :key="continent.id"
        >
          <h2 class="title position-absolute">
            {{ continent.title }}
          </h2>
          <div class="row">
            <div class="col-6 d-flex flex-column justify-content-center">
              <div class="p-8 m-0">
                <h2 class="fw-bold fs-1 mb-8 tracking-3">
                  {{ continent.title }}
                </h2>
                <div
                  class="tour-content fs-5 tracking-2"
                  v-html="continent.description"
                />
                <div class="d-flex justify-content-end mt-12">
                  <NuxtLink to="/" class="text-white text-decoration-none">
                    <span class="more-btn border rounded-circle">
                      <span class="more-btn-arrow" />
                      <span class="more-btn-text tracking-2">MORE</span>
                    </span>
                  </NuxtLink>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="rounded bg-secondary shadow-lg p-1">
                <img :src="continent.photo" :alt="continent.title">
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    continents: {
      type: Object,
      default: () => ({}),
      require: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/node_modules/bootstrap/scss/functions';
@import '@/assets/styleSheets/custom/variables';

.north-america-panel {
  background: linear-gradient(
    90deg,
    rgb(16, 17, 31) 0%,
    rgba(25, 26, 48, 1) 100%
  );
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
.title {
  font-size: 200px;
  letter-spacing: 3rem;
  font-family: 'Long Cang', cursive;
  color: rgba($white, 0.1);
  transform: rotate(-5deg);
  left: 10%;
  bottom: 10%;
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
