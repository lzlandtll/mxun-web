<script setup lang="tsx">
import {onMounted, ref} from "vue";
import Dialog from '@/components/Dialog/Dialog.vue'
const dialogVisible = ref(false)
import ContentAI from './ContentAI.vue'
import ChatNav from './ChatNav.vue'
const sessionId = ref('')
onMounted(async () => {
  sessionId.value = '';
})
const clickChatSession = (clickSessionId:any) => {
  sessionId.value = clickSessionId
}
</script>

<template>
  <div>
    <Dialog v-model="dialogVisible">
      <div class="aiContainer">
        <ChatNav @clickChatSession="clickChatSession" />
        <ContentAI :sessionId="sessionId" />
      </div>
    </Dialog>
    <div class="aiSwitch" @click="dialogVisible = !dialogVisible">AI</div>
  </div>
</template>
<style scoped>
.aiContainer{
  position: relative;
  display: flex;
  width: 50vw;
  height: 96vh;
  background: white;
  border-radius: 5px;
  overflow: hidden;
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
  z-index: 8;
}
</style>
