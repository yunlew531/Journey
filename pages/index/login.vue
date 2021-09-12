<template>
  <section class="login-panel position-relative bg-primary overflow-hidden">
    <div class="login-panel-bg" />
    <div
      class="position-absolute w-100 h-100 d-flex justify-content-center align-items-center"
    >
      <div class="content rounded-3">
        <div class="row g-0 w-100">
          <div class="col-6">
            <img
              src="https://images.unsplash.com/photo-1507830075634-ce51e8b19328?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt=""
              class="photo"
            >
          </div>
          <div
            class="form-area col-6 d-flex flex-column justify-content-center align-items-center position-relative"
          >
            <p
              v-if="status === 'login'"
              class="notice text-white position-absolute"
            >
              "管理員頁面唯讀權限" 帳號。帳號: adminreadonly@gmail.com 密碼:
              000000<br>
              另外也可註冊個人帳號，確保擁有獨立購物車、訂單。p.s.無查看管理頁面權限。
            </p>
            <div v-if="status === 'login'" class="rounded shadow-sm p-12 mb-5">
              <label class="d-block mb-3">
                <span class="d-block mb-1">信箱</span>
                <div class="input-group d-flex align-items-center">
                  <span class="material-icons text-center">mail</span>
                  <input
                    v-model.trim="login.email"
                    type="text"
                    placeholder="請輸入信箱"
                    class="px-2"
                  >
                </div>
              </label>
              <label class="d-block mb-3">
                <span class="d-block mb-1">密碼</span>
                <div class="input-group">
                  <span class="material-icons text-center"> vpn_key </span>
                  <input
                    v-model.trim="login.password"
                    type="password"
                    placeholder="請輸入密碼"
                    class="px-2"
                    @keyup.enter="loginAccount"
                  >
                </div>
              </label>
              <button
                type="button"
                class="w-100 btn btn-dark text-white py-2 mt-5"
                @click="loginAccount"
              >
                登入
              </button>
            </div>
            <div v-else class="rounded shadow-sm px-8 py-5">
              <label class="d-block mb-3">
                <span class="d-block mb-1">信箱</span>
                <div class="input-group d-flex align-items-center">
                  <span class="material-icons text-center">mail</span>
                  <input
                    v-model.trim="register.email"
                    type="text"
                    placeholder="請輸入信箱"
                    class="px-2"
                  >
                </div>
              </label>
              <label class="d-block mb-3">
                <span class="d-block mb-1">密碼</span>
                <div class="input-group">
                  <span class="material-icons text-center"> vpn_key </span>
                  <input
                    v-model.trim="register.password"
                    type="password"
                    placeholder="請輸入密碼"
                    class="px-2"
                  >
                </div>
              </label>
              <label class="d-inline-block mb-3">
                <span class="d-block mb-1">姓名</span>
                <div class="input-group d-flex align-items-center">
                  <span class="material-icons text-center">face</span>
                  <input
                    v-model.trim="register.name"
                    type="text"
                    placeholder="請輸入姓名"
                    class="px-2"
                  >
                </div>
              </label>
              <label class="d-inline-block ms-5 mb-3">
                <span class="d-block mb-1">手機</span>
                <div class="input-group d-flex align-items-center">
                  <span class="material-icons text-center">phone_iphone</span>
                  <input
                    v-model.trim="register.phone"
                    type="text"
                    placeholder="請輸入手機"
                    class="px-2"
                  >
                </div>
              </label>
              <label class="d-block mb-3">
                <span class="d-block mb-1">地址</span>
                <div class="input-group d-flex align-items-center">
                  <span class="material-icons text-center">home</span>
                  <input
                    v-model.trim="register.address"
                    type="text"
                    placeholder="請輸入地址"
                    class="px-2"
                  >
                </div>
              </label>
              <label
                class="cursor-pointer d-inline-flex align-items-center mt-3"
              >
                <input
                  v-model="register.agree"
                  type="checkbox"
                  class="align-self-start mt-1 me-2"
                >
                <span class="text-danger">
                  我了解本網站為個人作品集網站，非真實營利網站。<br>
                  所有商品、訂單皆為虛構，下標後也不會收到任何東西。
                </span>
              </label>
              <button
                :disabled="register.agree !== true"
                type="button"
                class="w-100 btn btn-dark text-white py-2 mt-4"
                @click="registerAccount"
              >
                註冊
              </button>
            </div>
            <div v-if="status === 'login'" class="text-center bg-transparent">
              <p class="fs-6 tracking-2 mb-0">
                還沒有帳戶嗎?
              </p>
              <a
                href="#"
                type="button"
                class="register-link tracking-2 fs-4"
                @click.prevent="status = 'register'"
              >
                立即註冊帳戶
              </a>
            </div>
            <div v-else class="text-center bg-transparent">
              <p class="fs-6 tracking-2 mt-5 mb-0">
                建議帳號、密碼隨意註冊，不要使用常用帳密。
              </p>
              <a
                href="#"
                type="button"
                class="text-danger"
                @click.prevent="status = 'login'"
              >我已有帳戶，直接登入!</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { apiRegister, apiLogin } from '@/api'

export default {
  data () {
    return {
      status: 'login',
      register: {
        email: '',
        password: '',
        name: '',
        phone: '',
        address: '',
        agree: false
      },
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async registerAccount () {
      const { email, password, name, phone, address } = this.register
      const user = {
        email,
        password,
        name,
        phone,
        address
      }
      try {
        const { data } = await apiRegister(user)
        alert(data.message)
        this.$router.go()
      } catch (err) {
        const { message } = err.response.data
        alert(message)
      }
    },
    async loginAccount () {
      try {
        const { data } = await apiLogin(this.login)
        const { message, user } = data

        document.cookie = `Journey=${user.token};expires=${new Date(
          Date.now() + 60 * 60 * 24 * 7 * 1000
        )};`

        alert(message)
        this.$router.push('/admin/continents')
      } catch (err) {
        const { message } = err.response.data
        alert(message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/node_modules/bootstrap/scss/functions';
@import '@/assets/styleSheets/custom/variables';

.login-panel {
  height: 100vh;
  width: 100%;
}
.login-panel-bg {
  background: url(https://images.unsplash.com/photo-1507830075634-ce51e8b19328?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)
    center;
  background-size: cover;
  position: absolute;
  height: 100%;
  width: 100%;
  filter: blur(25px);
}
.content {
  max-width: 1300px;
  z-index: 10;
  background: shade-color($white, 5%);
}
.photo {
  min-height: 600px;
}
.form-area {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 50px;
    height: 100%;
    background: shade-color($white, 5%);
    left: -49px;
    bottom: 0px;
    clip-path: polygon(100% 0%, 0% 100%, 100% 100%);
  }
  > div {
    background: $white;
  }
}
.input-group {
  span,
  input {
    height: 50px;
    border: 1px solid tint-color($primary, 50%);
  }
  span {
    width: 50px;
    margin-right: -1px;
    line-height: 50px;
    border-radius: 5px 0 0 5px;
  }
  input {
    border-radius: 0 5px 5px 0;
    flex-grow: 1;
    &:focus-visible {
      outline: 0;
    }
  }
}
.register-link {
  color: $danger;
  &:hover {
    color: shade-color($danger, 20%);
  }
}
.notice {
  bottom: -80px;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
