<script setup lang="tsx">
import {ref, defineProps, defineEmits, watch} from 'vue';

// 定义 props 和 emits
const props = defineProps<{
  modelValue: boolean; // 使用 modelValue 接收父组件传递的值
}>();
watch(
    () => props.modelValue,
    (newValue) => {
      visible.value = newValue;
    }
);
const emit = defineEmits(['update:modelValue']);

// 本地状态用于同步输入框的值
const visible = ref(props.modelValue);

const switchVisible = () => {
  visible.value = !visible.value
  emit('update:modelValue', visible.value)
}
const clickStop = () => {
  return false
}
</script>

<template>
  <div v-if="visible" class="customDialog" @click="switchVisible">
    <div class="dialogInnerWrapper" @click.stop="clickStop">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.customDialog{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(150, 150, 150, 0.3);
  z-index: 2;
}

.dialogInnerWrapper{
  position: relative;
  margin-top: 50vh;
  margin-left: 50vw;
  transform: translate(-50%, -50%);
}

</style>
