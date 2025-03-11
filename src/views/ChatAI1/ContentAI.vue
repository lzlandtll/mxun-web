<script setup lang="tsx">
import {defineProps, onMounted, ref, watch} from "vue";
import WSService from "@/ws/WSService.js";
import MessageRow from './MessageRow.vue'
import QuestionBox from './QuestionBox.vue'
import {getMessageList, sendQuestion} from '@/api/chatai'

interface Message {
  content: string;
  role: string;
}

const assistantMessage = ref({'role': 'system', 'content': '你需要帮助吗'})
const sessionId = ref('')
const props = defineProps<{ sessionId: string }>()
watch(
    () => props.sessionId, // 监听 sessionId
    (newValue, oldValue) => {
      console.log('sessionId changed:', newValue, oldValue);
      // 这里可以根据需要处理数据变化的逻辑
      sessionId.value = newValue
      refreshMessageList()
    }
)

const messageList = ref<Message[]>([])

const currentMessage = ref<Message>({ content: '', role: '' })
onMounted(() => {
  WSService.connect();  // 建立 WebSocket 连接

  // 订阅消息更新
  WSService.subscribe("02",(message:any) => {
    receiveAiMessage(message);  // 通过方法控制显示
  });
})

const receiveAiMessage = (message:any) => {
  if(message['code'] != 200){
    return ;
  }
  let aiResponse = message.data
  if(aiResponse.status == '01'){
    currentMessage.value = {content: aiResponse.content, role: 'system'}
    messageList.value.push(currentMessage.value)
  }

  if(aiResponse.status == '02'){
    currentMessage.value.content = currentMessage.value.content + aiResponse.content
  }
  if(aiResponse.status == '03'){
    console.log('messageList: ', messageList.value)
  }
}
const clickSendQuestion = async (question:any) => {
  let chatMessage = {'sessionId': sessionId.value, 'content': question, 'role': 'user'}
  messageList.value.push(chatMessage)
  let res = await sendQuestion(chatMessage)
  sessionId.value = res['data']['sessionId']
}

const refreshMessageList = async () => {
  messageList.value = []
  if(sessionId.value){
    let res = await getMessageList(sessionId.value)
    messageList.value = res['data']['data']
  }
}
</script>

<template>
  <div class="aiContent">
    <div class="messageBox">
      <div class="hiddenBar">
        <MessageRow :message="assistantMessage"/>
        <MessageRow v-for="message in messageList" :message="message"/>
      </div>
    </div>
    <QuestionBox @clickSendQuestion="clickSendQuestion" />
  </div>
</template>
<style scoped>
  .aiContent{
    position: relative;
    flex: 3;
    width: calc(100% - 200px);
    height: 100%;
    padding: 0 8px 0 0;
  }
  .messageBox{
    position: relative;
    width: 100%;
    height: 85%;
    overflow: hidden;
  }
  .hiddenBar{
    height: 100%;
    overflow-y: auto;
  }

  .hiddenBar::-webkit-scrollbar {
    display: none;
  }

</style>
