<script setup lang="tsx">
import {defineProps, ref} from "vue";


const message = defineProps<{ message: {content: any, role: any} }>()

// import VMdEditor from '@kangc/v-md-editor'
// VMdEditor.use(githubTheme, {
//   Hljs: hljs
// })
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import hljs from 'highlight.js'
VMdPreview.use(githubTheme, {
  Hljs: hljs,
})
ref(false);
</script>

<template>
  <div class="messageRow">
    <div style="width: 100%" v-if="message.message['role'] == 'system'">
      <div class="systemImg"></div>
      <VMdPreview class="systemContent" :text="message.message['content']"></VMdPreview>
    </div>
    <div class="userContentBox" v-if="message.message['role'] == 'user'">
      <div class="userContent">{{message.message['content']}}</div>
    </div>
  </div>
</template>
<style scoped>
  .messageRow{
    position: relative;
    width: 100%;
    background: white;
  }

  .systemImg{
    position: absolute;
    top: 5px;
    left: 8px;
    width: 32px;
    height: 32px;
    border: solid 1px #decbcb;
    background-image: url(/src/assets/imgs/chatgpt.png);
    background-color: #ffffff;
    background-size: 80%;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 16px;
  }

  .systemContent{
    text-align: left;
    padding-left: 40px
  }

  .systemContent :deep(.github-markdown-body) {
    padding: 8px !important
  }

  .userContentBox{
    width: calc(100% - 58px);
    display: flex;
    justify-content: flex-end;
    padding: 8px 8px 8px 50px;
  }

  .userContent{
    padding: 8px;
    background: #e1e7e9;
    max-width: 75%;
    border-radius: 16px;
  }
</style>
