<script setup lang="ts">

import paramsStore from '@/store/modules/params'
import {onMounted, ref, watch} from "vue"
import { getArticleListByParam } from '@/api/art'
import AppUtils from "@/utils/AppUtils";
import userStore  from '@/store/modules/user'

onMounted(() => {
  setTimeout(() => {
    if(!requested.value){
      param.value.queryKey = AppUtils.getUrlQuery("filterUserKey")
      getArticleListByParamHandler()
    }
  }, 10)
})

watch(
    () => paramsStore.getFilterUserKey(),
    (newParams) => {
      param.value.queryKey = newParams
      param.value.pageNum = 1
      articleList.value = []
      getArticleListByParamHandler()
    }
);
const requested = ref(false)
const articleList = ref([])
const totalPage = ref(2)
const userId = ref(Number(AppUtils.getUrlQuery("userId")))
const param = ref({
  "userId": userId.value,
  "queryKey": paramsStore.getFilterUserKey(),
  "pageNum": 1
})

const getArticleListByParamHandler = async () => {
  if(param.value.pageNum > totalPage.value){
    return
  }
  let res = await getArticleListByParam(param.value)

  param.value.pageNum ++;
  articleList.value.push(...res.data.records)
  totalPage.value = res.data.totalPage
}
const clickArticle = (articleId) => {
  window.open(`/articleDetail?articleId=${articleId}`, '_blank');
}
const clickWrite = (articleId) => {
  window.open(`/write?articleId=${articleId}`, '_blank');
}
</script>

<template>
  <div class="user_article_list_container"
       v-infinite-scroll="getArticleListByParamHandler"
       infinite-scroll-delay="200"
       infinite-scroll-immediate="false">

    <div v-for="article in articleList"  @click="clickArticle(article['id'])" class="article_item_container">
      <div class="title_container">
        {{article["title"]}}
      </div>
      <div class="summary_container">
        {{article["summary"]}}
      </div>
      <div class="count_container">
        <div class="count_item">
          <el-icon><View /></el-icon>
          &nbsp; 浏览 &nbsp;{{article["viewCount"]}} &nbsp;
        </div>
        <div class="count_item">
          <el-icon><Pointer /></el-icon>
          &nbsp; 点赞 &nbsp;{{article["likeCount"]}} &nbsp;
        </div>
        <div class="count_item">
          <el-icon><Star /></el-icon>
          &nbsp; 收藏 &nbsp;{{article["collectionCount"]}}
        </div>
        <div @click="clickWrite(article['id'])" v-if="userStore.isSelf(userId)" class="count_item edit_button">
          <el-icon>
            <Edit />
          </el-icon>
          &nbsp;编辑
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user_article_list_container{
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--inner-padding);
  background: #b2e5d8;
  border-radius: var(--border-radius);
  overflow: scroll;
}
.article_item_container{
  display: flex;
  flex-direction: column;
  gap: var(--out-padding);
  padding: var(--inner-padding);
  background: #d0edef;
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
.edit_button{
  position: absolute;
  right: 10px;
}
</style>
