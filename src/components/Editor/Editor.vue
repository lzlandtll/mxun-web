<script lang="tsx" setup>
import { ref } from 'vue'
import VMdEditor from '@kangc/v-md-editor/lib/base-editor';
// 导入编辑器的基础样式
import '@kangc/v-md-editor/lib/style/base-editor.css';
// 导入 VuePress 主题的脚本和样式
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

// 导入 Prism 用于代码高亮
import Prism from 'prismjs';
// 导入行号插件和复制代码插件及其样式
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

// 导入自定义 CSS 样式
import '@/assets/css/custom-v-md-style.css';

// 使用 VuePress 主题配置 Markdown 编辑器，包括 Prism 和代码高亮扩展映射
VMdEditor.use(vuepressTheme, {
  // Prism,
  codeHighlightExtensionMap: {
    vue: 'html',
  },
});

// 使用行号插件和复制代码插件扩展 Markdown 编辑器功能
VMdEditor.use(createLineNumbertPlugin());
VMdEditor.use(createCopyCodePlugin());


const props = defineProps({
  menuList: { // 目录列表
    type: Array,
    default: []
  },
  isReadonly: {
    type: Boolean,
    default: true
  },
  text: { // 编辑器内容
    type: String,
    default: ''
  },
  includeLevel: { // 目录显示层级
    type: Object,
    default: [1, 2, 3, 4, 5, 6]
  },
  leftToolbar: { // 左侧工具栏配置
    type: String,
    default: "undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code tip| save"
  },
  rightToolbar: { // 右侧工具栏配置
    type: String,
    default: "preview toc sync-scroll fullscreen"
  },
  disabledMenus: { // 开启上传图片菜单
    type: Array,
    default: []
  },
  defaultShowToc: { // 是否默认展示目录
    type: Boolean,
    default: true
  },
  tocNavPositionRight: { // 目录导航是否在右侧
    type: Boolean,
    default: false
  },
  autofocus: { // 编辑器加载完是否自动聚焦
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:text']);
const updateText = (newText) => {
  console.log("newText: ", newText)
  emit('update:text', newText); // 触发父组件更新
}
const handleUploadImage = (event: any, insertImage: any, files: any) => {
  console.log(event)
  // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
  console.log(files);
  // 此处只做示例
  insertImage({
    url:'https://gulimall--mun.oss-cn-shenzhen.aliyuncs.com/2024-03-18/16a631c8-9c63-4aac-8166-4afe4bfae6dc_1701421635562.jpg',
    desc: '七龙珠',
    width: 'auto',
    height: 'auto',
  })
}
const mdEditorRef = ref<HTMLElement | null>(null)
// 暴露给父组件调用，允许外部访问到 mdEditorRef，为后续自定义目录列表做准备
defineExpose({ mdEditorRef })
</script>

<template>
  <div :class="props.isReadonly ? 'md-preview': ''">
    <v-md-editor
        :mode="props.isReadonly ? 'preview' : 'editable'"
        ref="mdEditorRef"
        :model-value="props.text"
        @update:model-value="updateText"
        :include-level="props.includeLevel"
        :left-toolbar="props.leftToolbar"
        :right-toolbar="props.rightToolbar"
        :default-show-toc="props.defaultShowToc"
        :toc-nav-position-right="props.tocNavPositionRight"
        :disabled-menus="props.disabledMenus"
        @upload-image="handleUploadImage"
        :autofocus="props.autofocus"
    ></v-md-editor>
  </div>
</template>

<style scoped>
  .md-preview {
    width: 50%;
    margin: 0 auto;
  }
</style>
