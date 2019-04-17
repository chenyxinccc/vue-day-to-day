<template>
  <div class="notFind-box">
    <p>webUpload组件实践</p>
    <web-upload></web-upload>
  </div>
</template>
<script>
import webupload from '@/assets/vue-webuploader/page.vue'
export default {
  name: 'webUpload',
  data () {
    return {
    }
  },
  components: {
    webupload
  }
}
</script>
