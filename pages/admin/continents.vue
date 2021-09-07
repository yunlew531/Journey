<template>
  <div class="container">
    <input v-model="continent.title" type="text" placeholder="請輸入洲名">
    <input v-model="continent.photo" type="text" placeholder="請輸入圖片位置">
    <select v-model="areaSelectId" @change="editContinent">
      <option value="">
        選擇地區
      </option>
      <option v-for="option in continents" :key="option.id" :value="option.id">
        {{ option.title }}
      </option>
    </select>
    <client-only>
      <div class="ckeditor">
        <ckeditor
          v-model="continent.description"
          :editor="editor"
          placeholder="請輸入首頁呈現內容"
        />
        <ckeditor
          v-model="continent.content"
          :editor="editor"
          placeholder="請輸入詳細資訊"
        />
      </div>
    </client-only>
    <button type="button" @click="createContinent">
      新增
    </button>
    <button type="button" @click="updateContinent">
      更新
    </button>
    <button type="button" @click="deleteContinent">
      刪除
    </button>
  </div>
</template>

<script>
import {
  apiGetContinents,
  apiCreateContinent,
  apiDeleteContinent,
  apiUpdateContinent
} from '@/api'

let ClassicEditor = null
if (process.browser) {
  ClassicEditor = require('@ckeditor/ckeditor5-build-classic')
}

export default {
  data () {
    return {
      editor: ClassicEditor,
      continent: {
        title: '',
        description: '',
        content: '',
        photo: ''
      },
      continents: {},
      areaSelectId: ''
    }
  },
  created () {
    this.getContinents()
  },
  methods: {
    async getContinents () {
      try {
        const { data } = await apiGetContinents()
        const obj = {}
        data.continents.forEach((contient) => {
          obj[contient.id] = contient
        })
        this.continents = obj
      } catch (err) {
        const { message } = err.response.data
        alert(message)
      }
    },
    async createContinent () {
      try {
        const { data } = await apiCreateContinent()
        alert(data.message)
      } catch (err) {
        const { message } = err.response.data
        alert(message)
      }
    },
    editContinent () {
      const id = this.areaSelectId
      this.continent = {
        title: this.continents[id].title,
        photo: this.continents[id].photo,
        description: this.continents[id].description,
        content: this.continents[id].content
      }
    },
    async deleteContinent () {
      const id = this.areaSelectId
      if (!id) {
        return
      }
      try {
        const { data } = await apiDeleteContinent(id)
        console.log(data)
      } catch (err) {
        const { message } = err.response.data
        alert(message)
      }
    },
    async updateContinent () {
      const id = this.areaSelectId
      if (!id) {
        return
      }
      try {
        const continent = this.continent
        const { data } = await apiUpdateContinent(id, continent)
        console.log(data)
      } catch (err) {
        const { message } = err.response.data
        alert(message)
      }
    }
  }
}
</script>

<style lang="scss">
.ckeditor {
  p {
    color: black;
  }
}
</style>
