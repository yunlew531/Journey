<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  watch: {
    '$route.path': {
      handler (path) {
        if (process.browser) {
          if (path === '/home') {
            document.body.classList.add('hide')
          } else {
            document.body.classList.remove('hide')
          }
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="scss">
body {
  &.hide {
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
