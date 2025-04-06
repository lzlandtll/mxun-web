<script setup lang="tsx">
import Editor from '@/components/Editor/Editor.vue'
import {ref} from "vue";
const text = ref("");
</script>

<template>
  <div style="widht: 100vw; height: 100vh;">
    <div class="title_bar"></div>
    <div class="editor_container">
      <Editor class="editor" :isReadonly="false" :text="text"></Editor>
    </div>
  </div>
</template>

<style scoped>

.title_bar{
  width: 100vw;
  height: 50px;
}

.editor_container{
  position: relative;
  width: 100%;
  height: calc(100vh - 50px);
  overflow-y: auto;
}
.editor{
  dispaly: flex;
  width: 100%;
  height: 100%;
}
</style>
