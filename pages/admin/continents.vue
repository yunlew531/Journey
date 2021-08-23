<template>
  <div class="container">
    <input v-model="continent.title" type="text" placeholder="請輸入洲名">
    <input v-model="continent.photo" type="text" placeholder="請輸入圖片位置">
    <client-only>
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
    </client-only>
    <button type="button" @click="createContinent">
      新增
    </button>
  </div>
</template>

<script>
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
      }
    }
  },
  methods: {
    createContinent () {
      this.$axios
        .post('/admin/continents/create', this.continent)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          const errors = err.response.data.message
          alert(errors)
        })
    }
  }
}
</script>

<style></style>
