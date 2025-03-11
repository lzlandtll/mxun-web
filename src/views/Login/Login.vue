<script setup lang="tsx">
import {ref} from "vue";
import Dialog from '@/components/Dialog/Dialog.vue'
const dialogVisible = ref(false)

import AccountLogin from './AccountLogin.vue'
import AccountRegister from './AccountRegister.vue'

const accountInfoIndex = ref("01")
const switchAccountInfo = () => {
  if(accountInfoIndex.value == "02"){
    accountInfoIndex.value = "01"
  }else {
    accountInfoIndex.value = "02"
  }
}

const eventCallback = (type) => {
  console.log("children event type", type)
  switch(type){
    case "01":
      dialogVisible.value = false;
      break;
    case "02":
      accountInfoIndex.value = "01";
      break;
  }
}
</script>

<template>
  <Dialog v-model="dialogVisible">
    <div class="dialogContent">
      <div class="flexItem gapLineBox"></div>
      <div class="flexItem ">
        <div class="switchAccountInfo" @click="switchAccountInfo">
          <div v-if="accountInfoIndex == '02'">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;登录</div>
          <div v-if="accountInfoIndex != '02'">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注册</div>
        </div>
        <div class="accountInfo">
          <AccountLogin v-if="accountInfoIndex == '01'" @eventCallback="eventCallback"></AccountLogin>
          <AccountRegister v-if="accountInfoIndex == '02'" @eventCallback="eventCallback"></AccountRegister>
        </div>
      </div>
    </div>
  </Dialog>
  <div class="loginSwitch" @click="dialogVisible = !dialogVisible"></div>
</template>
<style scoped>
.dialogContent{
  position: relative;
  display: flex;
  width: 50vw;
  height: 56vh;
  border-radius: 5px;
  overflow: hidden;
  background: white;
}

.flexItem{
  position: relative;
  flex: 1;
}

.switchAccountInfo {
  width: 70px;
  height: 70px;
  background-color: #caf4e8;
  position: absolute;
  top: 0;
  right: 0;
  clip-path: polygon(100% 0, 100% 100%, 0 0);
  cursor: pointer;
  text-align: center;
  line-height: 45px;
  font-size: 14px;
}

.accountInfo{
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64%;
  height: 60%;
  padding: 5%;
  background: #f8f3f3;
}

.gapLineBox::after {
  content: '';
  position: absolute;
  top: 25%; /* 边框距离顶部10%，确保它位于中间80%的高度 */
  right: 0; /* 定位到右侧 */
  width: 1px; /* 边框的宽度 */
  height: 50%; /* 占据容器高度的80% */
  background-color: #b580f2; /* 边框颜色 */
}


.loginSwitch{
  margin-top: calc(var(--nav-height) / 2);
  right: 20px;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 20px;
  background: url('@/assets/imgs/login.png');
  background-size: 100% 100%;
  color: #e5ab3d;
  text-align: center;
  line-height: 34px;
  font-size: 20px;
  z-index: 9999999999;
}
</style>
