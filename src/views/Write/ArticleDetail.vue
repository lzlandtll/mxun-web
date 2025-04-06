<script setup lang="ts">

import Editor from '@/components/Editor/Editor.vue'
import { getOpenArticleDetail } from '@/api/art'
import {nextTick, onMounted, ref} from "vue";
import ToolButton from"./ToolButton.vue"
import AppUtils from "@/utils/AppUtils";

const previewRef = ref()
const menuList = ref()
const detailsConstant = ref<HTMLElement | null>(null)
const currentScrollTop = ref(0)
const isShowMenu = ref(true)
/**
 * 获取Markdown目录列表
 *
 * @returns 返回Markdown目录列表，包含标题文本、行索引和缩进级别以及是否激活
 */
const getMarkdownMenuList  = async () => {
  if (!previewRef.value) return
  // 获取所有的标题元素
  const headerElements  = previewRef.value.mdEditorRef.$el.querySelectorAll('h1,h2,h3,h4,h5,h6')
  // 将所有标题元素转换为数组，并过滤掉空白标题
  const validHeaders  = Array.from(headerElements).filter((title: any) => !!title.innerText.trim())
  if (!validHeaders .length) return

  // 获取所有不同的标题标签，并进行排序
  const hTags = Array.from(new Set(validHeaders .map((title: any) => title.tagName))).sort()
  // 遍历标题数组，并生成包含标题文本、行索引和缩进级别的对象数组
  return validHeaders .map((el: any) => ({
    title: el.innerText, // 标题文本
    lineIndex: el.getAttribute('data-v-md-line'), // 行索引
    indent: hTags.indexOf(el.tagName), // 缩进级别
    isActive: false // 是否激活
  }))
}

const jumpTo = (lineIndex: number) => {
  const target = previewRef.value.mdEditorRef.$el.querySelector(`[data-v-md-line="${lineIndex}"]`)
  if (target && detailsConstant.value) {
    detailsConstant.value.scrollTop = target.offsetTop - 10;

    // 更新当前高亮的目录项
    const activeIndex = menuList.value.findIndex(item => item.lineIndex === lineIndex);
    if (activeIndex !== -1) {
      menuList.value.forEach((item, index) => {
        item.isActive = index === activeIndex;
      });
    }
  }
}

onMounted(async () => {

  try {
    await getOpenArticleDetailHandler()
    // 等待Vue完成对DOM的更新
    await nextTick();
    // 获取Markdown目录列表并更新目录列表状态
    const res = await getMarkdownMenuList();
    if (res) {
      menuList.value = res;
    }
  } catch (error) {
    console.error('Failed to load the Markdown file:', error);
  }
  if( detailsConstant.value) {
    detailsConstant.value.addEventListener('scroll', scrollPreview);
  }
})
const getOpenArticleDetailHandler = async () => {
  let res = await getOpenArticleDetail(AppUtils.getUrlQuery("articleId"))
  if(res.code != "200"){
    return
  }
  article.value = res.data
}
const article = ref({})


const scrollPreview = () => {
  if (!detailsConstant.value) return
  currentScrollTop.value = detailsConstant.value.scrollTop
  // 延迟更新当前激活的目录项，防止在滚动时出现激活项闪烁的问题
  setTimeout(() => {
    updateActiveMenu(currentScrollTop.value)
  }, 10);
}
const updateActiveMenu = (scrollTop: number) => {
  if (!detailsConstant.value) return

  // 获取编辑器元素
  const editorEl = previewRef.value.mdEditorRef.$el;

  // 获取所有的标题元素
  const headerElements = editorEl.querySelectorAll('h1, h2, h3, h4, h5, h6');

  // 初始化激活目录索引为 -1
  let activeIndex = -1;

  // 遍历所有的标题元素
  for (let i = 0; i < headerElements.length; i++) {
    const anchor = headerElements[i];
    const offsetTop = anchor.offsetTop;
    const offsetBottom = anchor.offsetTop + anchor.offsetHeight;
    // 判断滚动位置是否在标题元素的范围内
    if (scrollTop >= offsetTop - 100 && scrollTop < offsetBottom - 100) {
      activeIndex = i;
      break;
    }
  }

  // 如果找到了激活目录索引
  if (activeIndex !== -1) {
    // 遍历目录列表，设置对应的目录项为活动状态
    menuList.value.forEach((item, index) => {
      // 如果当前索引等于活动索引，则设置为活动状态
      item.isActive = index === activeIndex;
    });
  }
}

const showMenu = () => {
  isShowMenu.value = !isShowMenu.value
}
const toTop = () => {
  if (detailsConstant.value && currentScrollTop.value > 300) {
    detailsConstant.value.scrollTop = 0
  }
}
</script>

<template>
  <div class="article_container">
    <div class="left_container"></div>
    <div class="middle_container" @scroll="scrollPreview" ref="detailsConstant">
      <Editor ref="previewRef" class="editor" :isReadonly="true" v-model:text="article['content']"></Editor>
    </div>
    <div class="right_container">
      <div class='details-menu'>
        <div class="menu-title">
          <span>目录</span>
        </div>
        <ul>
          <li v-for="(item, index) in menuList" :key="index" @click="jumpTo(item.lineIndex ?? 0)">
            <div class="menu-item"
                 :style="{paddingLeft: `${item.indent * 20}px`}"
                 :class="{'menu-active': item.isActive || ''}">
              {{item.title}}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <ToolButton :currentScrollTop="currentScrollTop" :isShowMenuBox="true" @toTop="toTop" @showMenu="showMenu"/>
  </div>
</template>

<style lang="scss" scoped>
  .article_container{
    position: relative;
    display: flex;
    gap: var(--out-padding);
    height: 100%;
  }
  .left_container{
    flex: 1;
    z-index: 2;
    border-radius: 5px;
    background: #a1d2c6;
  }
  .middle_container{
    position: relative;
    flex: 3;
    height: 100%;
    border-radius: 5px;
    z-index: 2;
    background: beige;
    overflow: scroll;
  }

  .right_container{
    position: relative;
    flex: 1;
    z-index: 2;
    height: 100%;
    border-radius: 5px;
    overflow: scroll;
  }

  .middle_container::-webkit-scrollbar {
    display: none;
  }

  .right_container::-webkit-scrollbar {
    display: none;
  }
  .editor{
    width: 100%;
  }

  .details-menu {
    position: relative;
    width: 100%;
    height: calc(100% - 20px);
    max-height: calc(100% - 20px);
    min-width: 200px;
    overflow-y: scroll;
    padding: 20px 20px 0 0px;
    background: linear-gradient(30deg, #fcf4f4, #f2ffff);
    box-shadow: 0 0 10px 1px #dbdbdb;
    border-radius: 5px;
    .menu-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
      color: #333;
      text-align: center;
      padding-bottom: 10px;
      border-bottom: 1px dashed #b6b6b6;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        margin-right: 5px;
        width: 25px;
        height: 25px;
      }
    }
    ul li {
      height: 22px;
      color: #333;
      list-style: none;
      div {
        text-wrap: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        line-height: 20px;
        font-weight: 600;
        vertical-align: middle;
      }
    }
    ul li:hover {
      cursor: pointer;
      color: #da6416;
      border-radius: 3px;
    }
  }

  .details-menu::-webkit-scrollbar {
    display: none;
  }
  .menu-active {
    color: #da6416;
    background-color: #da641618;
    border-radius: 3px;
  }
  .details-contant {
    margin-top: 50px;
    height: calc(100vh - 100px);
    overflow-y: scroll;
    scroll-behavior: smooth; // 滚动行为平滑
  }
</style>
