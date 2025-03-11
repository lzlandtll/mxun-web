<script setup lang="tsx">

import {onMounted, ref} from "vue"
import { getChatSessionList } from "@/api/chatai"

const chatSessionList = ref([])
onMounted(() => {
  refreshChatSessionList()
})

const refreshChatSessionList = async () => {
  let res = await getChatSessionList()
  chatSessionList.value = res['data']['data']
}
const emit = defineEmits(['clickChatSession'])
const clickChatSession = (sessionId:any) => {
  emit('clickChatSession', sessionId)
  refreshChatSessionList()
}
</script>

<template>
  <div class="chatSessionNav">
    <div @click="clickChatSession('')" class="createSession">新建对话</div>
    <div v-for="(chatSession, index) in chatSessionList"
         @click="clickChatSession(chatSession['sessionId'])"
         class="chatSession"
         :style="index === 0 ? {'border-top': 'solid 1px #e4dede'} : {}">
      {{chatSession['title']}}
    </div>
  </div>
</template>
<style scoped>
  .chatSessionNav{
    flex: 1;
    width: 200px;
    height: 100%;
    background: white;
    border-right: solid 1px #eee;
    border-radius: 5px 0 0 5px;
  }
  .createSession{
    width: calc(100% - 32px);
    line-height: 24px;
    margin: 8px;
    padding: 8px;
    text-align: center;
    background: #c9ecf7;
    border-radius: 40px;
    color: #344987;
  }
  .chatSession{
    width: calc(100% - 24px);
    line-height: 30px;
    font-size: 14px;
    border-bottom: solid 1px #e4dede;
    padding: 8px 8px 8px 16px;
  }
</style>
