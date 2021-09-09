<template>
  <div v-if="isAuth">
    <h1>{{ uid }}</h1>
    <button type="button" @click="signOut">
      登出
    </button>
    <Nuxt />
  </div>
</template>

<script>
import backReq from '@/api/backReq'
import { apiSignOut, apiCheckAuth } from '@/api'

export default {
  data () {
    return {
      isAuth: false,
      uid: ''
    }
  },
  mounted () {
    this.setHeader()
    this.checkAuth()
  },
  methods: {
    setHeader () {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)Journey\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      backReq.defaults.headers.common.Authorization = `${token}`
    },
    async checkAuth () {
      try {
        const { data } = await apiCheckAuth()
        this.isAuth = true
        this.uid = data.uid
      } catch (err) {
        const { message } = err.response.data
        this.isAuth = false
        this.uid = ''
        this.$router.push('/login')
        console.log(err.response.data)
        alert(message)
      }
    },
    async signOut () {
      try {
        const { data } = await apiSignOut()
        alert(data.message)
        document.cookie = 'Journey=;expires=Thu, 01 Jan 1970 00:00:00 UTC;'
        this.$router.push('/login')
      } catch (err) {
        const { message } = err.response.data
        alert(message)
      }
    }
  }
}
</script>
