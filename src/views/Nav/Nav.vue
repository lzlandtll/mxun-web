<script setup lang="tsx">
import Login from '@/views/Login/Login.vue'

import paramsStore from '@/store/modules/params'
import StringUtil from '@/utils/StringUtil'
import userStore from '@/store/modules/user'
import {SEARCH_PATH} from '@/constants'
import {ElMessage} from "element-plus";
import { Search } from '@element-plus/icons-vue'
import {onMounted, ref} from "vue";
import { useRoute } from 'vue-router';
import AppUtils from "@/utils/AppUtils";
const route = useRoute()

const query = ref('')
const inputRef = ref(null); // 引用 el-input

onMounted( () => {
  addIconClickListener()
  query.value = AppUtils.getUrlQuery("query")
  handleSearch()
})

const handleSearch = () => {
  if(SEARCH_PATH == route.path){
    paramsStore.updateNavFilterKey(query.value)
    return;
  }
  window.open(SEARCH_PATH + "?query=" + query.value, '_blank');
}
const addIconClickListener = () => {
  const suffixIcon = inputRef.value?.$el.querySelector('.el-input__suffix');
  if (suffixIcon) {
    suffixIcon.addEventListener('click', handleSearch);
  }
}
const clickWrite = () => {
  if(!userStore.hasLogin()){
    ElMessage({
      message: '请先进行登录...',
      type: 'warning',
    })
    return false;
  }
  window.open('/write', '_blank');
}
</script>

<template>
  <div class="nav">
    <div class="left_nav">

    </div>
    <div class="center_nav">
      <el-input
          v-model="query"
          class="w-50 m-2 customer_search"
          placeholder="搜索"
          :suffix-icon="Search"
          @keyup.enter="handleSearch"
          ref="inputRef"
      />
    </div>
    <div class="right_nav">
      <Login class="right_nav_item" />
      <div class="right_nav_item">
        <el-button @click="clickWrite" type="danger">创作</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .left_nav{
    flex: 3;
  }
  .center_nav{
    position: relative;
    display: flex;
    flex: 4;
    align-items: center;
    justify-content: center;
  }
  .right_nav{
    flex: 3;
    position: relative;
    display: flex;
    justify-content: space-around;
    justify-content: center;
    align-items: center;
  }
  .right_nav_item{
    flex: 1;
    text-align: center;
    line-height: 100%;
  }
  .customer_search{
    width: 200px;
    transition: width 0.5s ease;
  }
  .customer_search:hover{
    width: 80%;
  }
</style>
