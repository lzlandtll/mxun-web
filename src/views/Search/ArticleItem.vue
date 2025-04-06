<script setup lang="ts">

import {defineProps} from "vue";
import {ARTICLE_DETAIL, USER_PATH} from "@/constants";

const props = defineProps<{ article: {} }>()

const clickUser = () => {
  console.log("article: ", props.article)
  window.open(`${USER_PATH}?userId=${props.article['authorId']}`, '_blank');
}

const clickArticle = () => {
  window.open(`${ARTICLE_DETAIL}?articleId=${props.article['id']}`, '_blank');
}
</script>

<template>
  <div class="article_item_container">
    <div class="author_container">
      <div @click="clickUser" class="author_name">{{props.article["authorName"]}}</div>
    </div>
    <div @click="clickArticle" class="title_container">
      {{props.article["title"]}}
    </div>
    <div class="summary_container">
      {{props.article["summary"]}}
    </div>
    <div class="count_container">
      <div class="count_item">
        <el-icon><View /></el-icon>
        &nbsp; 浏览 &nbsp;{{props.article["viewCount"]}} &nbsp;
      </div>
      <div class="count_item">
        <el-icon><Pointer /></el-icon>
        &nbsp; 点赞 &nbsp;{{props.article["likeCount"]}} &nbsp;
      </div>
      <div class="count_item">
        <el-icon><Star /></el-icon>
        &nbsp; 收藏 &nbsp;{{props.article["collectionCount"]}}
      </div>
    </div>
  </div>
</template>

<style scoped>
  .article_item_container{
    display: flex;
    flex-direction: column;
    gap: var(--out-padding);
    padding: var(--inner-padding);
  }
  .author_container{
    display: flex;
  }
  .author_name{

  }
  .title_container{
    font-weight: 600;
  }
  .summary_container{

  }
  .count_container{
    display: flex;
    gap: 10px;
  }
  .count_item{
    display: flex; /* 将容器设置为 Flex 布局 */
    align-items: center;
  }
</style>
