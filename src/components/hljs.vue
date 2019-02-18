<template>
<div>
  <pre>
    <code v-html="html"></code>
  </pre>
  <router-view/>
</div>
</template>
<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
export default {
  name: 'Home',
  data () {
    return {
      html: `
var express = require('express');var app = express();app.get('/', function (req, res) {res.send('http://yunkus.com');});
var server = app.listen(3000, function () { var host = server.address().address; var port = server.address().port; console.log('云库网123123', host, port);
});`
    }
  },
  methods: {
    modifyCode () {
      this.$nextTick(function () {
        let blocks = document.querySelectorAll('pre code')
        blocks.forEach(block => {
          hljs.highlightBlock(block)
        })
      })
    }
  },
  created () {
    this.modifyCode()
  }
}
</script>
