<template>
  <div class="icon-box">
    <div class="icon-item" v-if="isBackTop || isInsideTop" @click="scrollToTop">
      <el-button>top</el-button>
    </div>
    <div class="icon-item show-menu" v-if="props.isShowMenuBox" @click="showMenu">
      <el-button>目录</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
const props = defineProps({
  currentScrollTop: { // 内部滚动条位置
    type: Number,
    default: null,
  },
  isShowMenuBox: { // 是否显示菜单
    type: Boolean,
    default: false,
  }
});
const isBackTop = ref(false);
// 内部块滚动条是否在顶部
const isInsideTop = computed(() => {
  return props.currentScrollTop > 300;
});
const handleScroll = () => {
  isBackTop.value = window.scrollY > 300; // 根据需要调整阈值
}

const scrollToTop = () => {
  // 全局滚动到顶部
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  if (props.currentScrollTop !== null) {
    // 内部div滚动到顶部
    emit('toTop');
  }
};
const showMenu = () => {
  emit('showMenu');
};
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
const emit = defineEmits(['toTop', 'showMenu']);
</script>
<style lang="scss" scoped>
.icon-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 50px;
  height: 200px;
  z-index: 10;
}
.icon-item {
  background-color: #9cd496;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  img {
    width: 30px;
    height: 30px;
  }
}
.icon-item:hover {
  background-color: #7ad8df;
  cursor: pointer;
  color: #fff;
}
.show-menu {
  img {
    width: 25px;
    height: 25px;
  }
}
</style>
