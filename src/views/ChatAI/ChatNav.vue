<script setup lang="tsx">

import {onMounted, ref} from "vue"
import { getChatSessionList, removeChatSession, addAiKey, removeAiKey } from "@/api/chatai"
import {ElMessage} from "element-plus";
import userStore  from '@/store/modules/user'
import { RoleEnum } from '@/enums/role'

const chatSessionList = ref([])
onMounted(async () => {
  await refreshChatSessionList()
  if(chatSessionList && chatSessionList.value.length > 0){
    emit('clickChatSession', chatSessionList.value[0]["sessionId"])
  }
})

const refreshChatSessionList = async () => {
  let res = await getChatSessionList()
  chatSessionList.value = res.data
}
const emit = defineEmits(['clickChatSession'])
const clickChatSession = (sessionId:any) => {
  emit('clickChatSession', sessionId)
  refreshChatSessionList()
}
const clickRemoveChatSession = async (sessionId:string) => {
  await removeChatSession(sessionId);
  refreshChatSessionList();
  emit('clickChatSession', '')
}

const aiKey = ref("")
const onAiKeyDialogVisible = ref(false)
const offAiKeyDialogVisible = ref(false)
const onAi = async () => {
  onAiKeyDialogVisible.value = false
  const res = await addAiKey(aiKey.value);
  if (res.code == "200") {
    userStore.addRole(RoleEnum.CHAT_AI.roleCode)
    ElMessage({
      message: 'AI权限已开通...',
      type: 'success',
    })
    refreshChatSessionList()
  }
}
const offAi = async () => {
  offAiKeyDialogVisible.value = false
  const res = await removeAiKey()
  if (res.code == "200") {
    userStore.removeRole(RoleEnum.CHAT_AI.roleCode)
    ElMessage({
      message: 'AI权限已关闭...',
      type: 'success',
    })
  }
}
</script>

<template>
  <div class="chatSessionNav">
    <el-button @click="clickChatSession('')" type="success" class="radiusButton">新建对话</el-button>
    <div v-for="(chatSession, index) in chatSessionList"
         @click="clickChatSession(chatSession['sessionId'])"
         class="chatSession"
         :style="index === 0 ? {'border-top': 'solid 1px #e4dede'} : {}">
      {{chatSession['title']}}
      <img @click.stop="clickRemoveChatSession(chatSession['sessionId'])" class="removeImg" src="@/assets/imgs/remove.png" />
    </div>
    <el-button v-if="!userStore.hasRole(RoleEnum.CHAT_AI.roleCode)" @click="onAiKeyDialogVisible = true" type="success" class="radiusButton stickBottom">开通AI权限</el-button>
    <el-button v-if="userStore.hasRole(RoleEnum.CHAT_AI.roleCode)" @click="offAiKeyDialogVisible = true" type="warning" class="radiusButton stickBottom">关闭AI权限</el-button>
  </div>
  <el-dialog v-model="onAiKeyDialogVisible" title="请输入通义千问AI密钥">
    <el-input v-model="aiKey" autocomplete="off" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onAiKeyDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onAi">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog
      v-model="offAiKeyDialogVisible"
      title="提示"
      width="50%"
      :before-close="offAi"
  >
    <span>确认关闭AI功能</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="offAiKeyDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="offAi">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped>
  .chatSessionNav{
    position: relative;
    flex: 1;
    width: 200px;
    height: 100%;
    background: white;
    border-right: solid 1px #eee;
    border-radius: 5px 0 0 5px;
  }
  .radiusButton{
    width: calc(100% - 32px);
    height: 36px;
    line-height: 36px;
    margin: 8px 16px;
    padding: 8px;
    text-align: center;
    border-radius: 40px;
  }

  .stickBottom{
    position: absolute;
    bottom: 5px;
    left: 0;
  }
  .chatSession{
    position: relative;
    width: calc(100% - 24px);
    line-height: 30px;
    font-size: 14px;
    border-bottom: solid 1px #e4dede;
    padding: 8px 8px 8px 16px;
  }
  .chatSession:hover .removeImg{
    display: block;
  }
  .removeImg{
    position: absolute;
    display: none;
    top: 50%;
    right: 5px;
    translate: 0 -50%;
    width: 15px;
  }
</style>
