<script setup lang="tsx">
import {ref} from "vue";
import ContentAI from './ContentAI.vue'
import ChatNav from './ChatNav.vue'

const chatAiVisible = ref(false)
const sessionId = ref('')
const clickAiSwitch = () => {
  chatAiVisible.value = !chatAiVisible.value
}
const clickStop = () => {
  return false
}
const clickChatSession = (clickSessionId:any) => {
  sessionId.value = clickSessionId
}
</script>

<template>
  <div class="customDialog" v-if="chatAiVisible" @click="clickAiSwitch">
    <div class="aiContainer" @click.stop="clickStop">
      <ChatNav @clickChatSession="clickChatSession" />
      <ContentAI :sessionId="sessionId" />
    </div>
  </div>
  <div class="aiSwitch" @click="clickAiSwitch">AI</div>
</template>
<style scoped>
.aiContainer{
  position: relative;
  display: flex;
  width: 50vw;
  height: 96vh;
  top: 2vh;
  left: 25vw;
  background: white;
  border-radius: 5px;
}

.aiSwitch{
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: #0d7d62;
  color: #e5ab3d;
  text-align: center;
  line-height: 38px;
  font-size: 20px;
  z-index: 2;
}
</style>
