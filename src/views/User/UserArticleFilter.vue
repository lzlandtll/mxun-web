<script setup>
import {onMounted, ref} from 'vue';
import paramsStore from '@/store/modules/params'
import {Search} from "@element-plus/icons-vue";
import AppUtils from "@/utils/AppUtils";

const filterUserKey = ref(''); // 绑定输入框的值

onMounted(() => {
  filterUserKey.value = AppUtils.getUrlQuery("filterUserKey")
  handleSearch()
})

const handleSearch = () => {
  paramsStore.updateFilterUserKey(filterUserKey.value); // 更新搜索参数
}
</script>
<template>
  <div>
    <el-input
        v-model="filterUserKey"
        class="w-50 m-2 customer_search"
        placeholder="搜索"
        :suffix-icon="Search"
        @keyup.enter="handleSearch"
        ref="inputRef"
    />
  </div>
</template>
<style scoped>

.customer_search{
  width: 160px;
  transition: width 0.5s ease;
}
.customer_search:hover{
  width: 40%;
}
</style>
