<script setup lang="ts">
import { ref } from "vue";
import { getRegisterSmsCode, registerAccount } from '@/api/login'
import RSAEncoder from '@/utils/RSAEncoder'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['eventCallback']);
const user = ref({
  tel: '',
  password: '',
  confirmPassword: '',
  code: ''
})

const doAccountRegister = () => {
  if(user.value.password != user.value.confirmPassword){
    ElMessage({
      message: '请确认输入密码一致...',
      type: 'warning',
    })
    return false;
  }
  RSAEncoder.encode(user.value.password).then(async password => {
    let registerUser = {
      tel: user.value.tel,
      password: password,
      code: user.value.code
    }
    let res = await registerAccount(registerUser);
    if(res['data']['code'] == "200"){
      ElMessage({
        message: '注册成功...',
        type: 'success',
      })
      emit('eventCallback', "02");
    }
  })
}
</script>

<template>
  <el-input class="flexItem center-text-input" v-model="user['tel']" placeholder="电话" clearable />
  <el-input
      class="flexItem center-text-input"
      v-model="user['password']"
      type="password"
      placeholder="密码"
      show-password
  />
  <el-input
      class="flexItem center-text-input"
      v-model="user['confirmPassword']"
      type="password"
      placeholder="确认密码"
      show-password
  />
  <div class="flexItem">
    <el-input
        class="center-text-input"
        v-model="user['code']"
        type="password"
        placeholder="验证码"
        show-password
        style="width: 50%;"
    />
    <el-button
        @click="getRegisterSmsCode(user.tel)"
        class="flexItem"
        type="success"
        plain
        style="width: 50%;"
    >获取验证码</el-button>
  </div>

  <el-button @click="doAccountRegister" class="flexItem" type="success" plain>注册</el-button>
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
