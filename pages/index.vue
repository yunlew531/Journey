<template>
  <div>
    <Header />
    <main>
      <Nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/index/header.vue'
import Footer from '@/components/index/footer.vue'

export default {
  components: {
    Header,
    Footer
  },
  middleware ({ route, redirect }) {
    if (route.name === 'index') {
      return redirect('/home')
    }
  },

  mounted () {
    this.checkEnvVariable()
  },
  methods: {
    checkEnvVariable () {
      if (!process.env.API_KEY) {
        alert('偵測不到 env 環境變數，專案無法被正確執行。請聯繫開發者!')
      }
    }
  }
}
</script>
