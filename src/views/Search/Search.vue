<script setup lang="ts">
import { getArticleListByParam } from '@/api/art'
import {onMounted, ref, watch} from "vue";
import ArticleItem   from "@/views/Search/ArticleItem.vue";
import paramsStore from "@/store/modules/params";
import AppUtils from "@/utils/AppUtils";

onMounted(() => {
  setTimeout(() => {
    if(!requested.value){
      param.value.queryKey = AppUtils.getUrlQuery("query")
      getArticleListBySearchHandler()
    }
  }, 10)
})

watch(
    () => paramsStore.getNavFilterKey(),
    (newParams) => {
      param.value = {
        "pageNum": 1,
        "queryKey": newParams
      }
      articleList.value = []
      getArticleListBySearchHandler()
    }
);

const requested = ref(false)
const articleList = ref([])
const totalPage = ref(2)
const param = ref({
  "queryKey": "",
  "pageNum": 1
})

const getArticleListBySearchHandler = async () => {
  if(param.value.pageNum > totalPage.value){
    return
  }
  requested.value = true
  let res = await getArticleListByParam(param.value)
  if (res.code != "200") {
    return
  }
  param.value.pageNum ++;
  articleList.value.push(...res.data.records)
  totalPage.value = res.data.totalPage
}


</script>

<template>

  <div class="search_container">
    <div class="left_container">

    </div>
    <div class="middle_container">
      <div v-infinite-scroll="getArticleListBySearchHandler"
           infinite-scroll-delay="200"
           infinite-scroll-immediate="false"
           class="article_list_container">
          <ArticleItem v-for="article of articleList" :article="article" class="article_container">
          </ArticleItem>
      </div>
    </div>
    <div class="right_container">
    </div>
  </div>
</template>

<style scoped>

  .search_container{
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
    background: #f1f1e4;
    overflow: scroll;
  }

  .right_container{
    position: relative;
    flex: 1;
    z-index: 2;
    height: 100%;
    border-radius: 5px;
    overflow: scroll;
    background: #eaf2f5;
  }

  .middle_container::-webkit-scrollbar {
    display: none;
  }

  .right_container::-webkit-scrollbar {
    display: none;
  }

  .article_list_container{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 100%;
    gap: var(--out-padding);
  }
  .article_container{
    position: relative;
    width: 100%;
    background: #d9f6f8;
  }

</style>
