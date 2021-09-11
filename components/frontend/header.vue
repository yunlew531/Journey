<template>
  <header
    class="d-flex justify-content-between position-fixed start-0 end-0 top-0 p-8 z-30"
  >
    <h1 class="align-self-start d-flex m-0">
      <NuxtLink
        to="/home"
        class="title fs-3 tracking-2 text-decoration-none"
        :class="`text-${styleSheets.color}`"
      >
        JOURNEY
      </NuxtLink>
    </h1>
    <div>
      <h3
        class="location-btn fs-6 tracking-2 d-flex justify-content-center align-items-center border rounded-circle m-0"
        :class="`text-${styleSheets.color} border-${styleSheets.color}`"
      >
        地區
      </h3>
      <h3
        class="tour-text fs-5 tracking-3 mt-5 mx-auto"
        :class="`text-${styleSheets.color}`"
      >
        旅行
      </h3>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
      styleSheets: {
        color: 'white'
      }
    }
  },
  watch: {
    '$route.path': {
      handler (path) {
        if (path === '/home' || path === '/login') {
          this.styleSheets.color = 'white'
        } else {
          this.styleSheets.color = 'primary'
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/node_modules/bootstrap/scss/functions';
@import '@/assets/styleSheets/custom/variables';
@import '@/node_modules/bootstrap/scss/mixins';

.title {
  font-family: $font-family-sans-narrow;
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
</style>
