<script setup lang="ts">

import {ElInput} from "element-plus";
import {ref} from "vue"


const question = ref('')


const emit = defineEmits(['clickSendQuestion'])
const clickSendQuestion = () => {
  if(!question.value){
    return false
  }
  emit('clickSendQuestion', question.value)
  question.value = ''
}
</script>

<template>
  <div class="questionWrapper">
    <div class="QuestionBox">
      <el-input class="questionContent"
                v-model="question"
                :autosize="{ minRows: 2, maxRows: 6 }"
                type="textarea"
                placeholder="Please input" />
      <div class="sendQuestionBtn" @click="clickSendQuestion"></div>
    </div>
  </div>
</template>

<style scoped >

  .questionWrapper{
    position: absolute;
    bottom: 0;
    width: calc(100% - 38px);
    padding: 0 8px 8px 30px;
    background: #fff;
  }
  .QuestionBox{
    width: calc(100%);
    left: 5%;
    background: #e8e7e7;
    height: auto;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 8px 8px 40px 8px ;
  }
  .questionContent {
    position: relative;
    width: calc(100% - 25px);
  }
  .questionContent :deep(.el-textarea__inner) {
    border: none; /* 移除边框 */
    background-color: transparent; /* 设置背景颜色为透明 */
    padding: 0; /* 调整内边距 */
    resize: none; /* 禁用调整大小手柄 */
    box-shadow: none;
  }

  .sendQuestionBtn{
    position: absolute;
    right: 10px;
    bottom: 10px;
    width: 32px;
    height: 32px;
    background-image: url(/src/assets/imgs/send.png);
    background-color: #3b7055;
    border-radius: 20px;
    background-size: 80%;
    background-position: center;
    background-repeat: no-repeat;
    transition: transform 0.3s ease;
  }
  .sendQuestionBtn:hover {
    transform: scale(0.8); /* 鼠标移上去时缩小至原来的 80% */
  }
  .sendQuestionBtn:active {
    transform: scale(0.4); /* 鼠标移上去时缩小至原来的 80% */
  }
</style>
