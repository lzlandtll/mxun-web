<script setup lang="ts">
import {ref} from "vue";
import { accountLogin } from '@/api/login'
import RSAEncoder from '@/utils/RSAEncoder'
import { userStoreHandler } from '@/store/modules/user'
import {ElMessage} from "element-plus";

const userStore = userStoreHandler()
const emit = defineEmits(['eventCallback']);
const user = ref({
  username: '18311516877',
  password: '123456'
})


const doAccountLogin = () => {
  RSAEncoder.encode(user.value.password).then(async password => {
    let loginUser = {
      username: user.value.username,
      password: password
    }
    let res = await accountLogin(loginUser);
    if(res['data']['code'] == "200"){
      userStore.setUserInfo(res['data']['data'])
      ElMessage({
        message: '登录成功...',
        type: 'success',
      })
      emit('eventCallback', "01");
    }
  })
}
</script>

<template>
  <el-input class="flexItem center-text-input" v-model="user['username']" placeholder="用户名|邮箱|电话" clearable />
  <el-input
      class="flexItem center-text-input"
      v-model="user['password']"
      type="password"
      placeholder="密码"
      show-password
  />
  <el-button @click="doAccountLogin" class="flexItem" type="success" plain>登录</el-button>
</template>

<style scoped>
.flexItem{
  flex: 1;
  max-height: 32px;
}
.center-text-input /deep/ .el-input__inner {
  text-align: center !important;
}
</style>
