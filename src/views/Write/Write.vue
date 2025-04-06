<script setup lang="tsx">
import Editor from '@/components/Editor/Editor.vue'
import {onMounted, ref} from "vue";
import StringUtil from '@/utils/StringUtil'
import {
  getEditArticleHistoryDetail,
  getCategoryList,
  getTagList,
  createCategory,
  saveArticleHistory,
  publishArticle
} from '@/api/art'
import {ElMessage} from "element-plus";
import AppUtils from "@/utils/AppUtils";
onMounted(() => {
  getTagListHandler("")
  getCategoryListHandler()
  if(StringUtil.isNotEmpty(articleHistory.value.id)){
    getEditArticleHistoryDetailHandler()
  }
})
const articleHistory = ref({
  id: AppUtils.getUrlQuery("articleId"),
  articleId: null,
  title: '',
  summary: '',
  content: '',
  tagIds: [],
  categoryId: '',
  saveStatus: '01'
});
const tagList = ref([])
const categoryList = ref([])

const getEditArticleHistoryDetailHandler = async () => {
  let res = await getEditArticleHistoryDetail(articleHistory.value.id)
  if(res.code != "200"){
    return
  }
  articleHistory.value = res.data
  articleHistory.value.saveStatus = "01"
}

const getTagListHandler = async (str) => {
  let res = await getTagList(str);
  if (res.code != "200") {
    return false
  }
  tagList.value = res.data
}

const getCategoryListHandler = async () => {
  let res = await getCategoryList()
  categoryList.value = res.data
}

const categoryChange = async () => {
  if (StringUtil.isEmpty(articleHistory.value.categoryId)) {
    return false;
  }
  for (let category of categoryList.value) {
    if (category["id"] == articleHistory.value.categoryId) {
      console.log("匹配成功")
      return;
    }
  }
  let res = await createCategory(articleHistory.value.categoryId)
  if (res.code != "200") {
    return;
  }
  articleHistory.value.categoryId = res.data.id
  getCategoryListHandler()
}

const saveArticle = async () => {
  let res = await saveArticleHistory(articleHistory.value)
  if(res.code != "200"){
    return
  }
  articleHistory.value.id = res.data.id
  articleHistory.value.articleId = res.data.articleId
  ElMessage({
    message: '文章保存成功...',
    type: 'success',
  })
}

const publishArticleHandler = async () => {
  let res = await publishArticle(articleHistory.value)
  if(res.code == "200"){
    ElMessage({
      message: '文章发布成功...',
      type: 'success',
    })
  }
}

</script>

<template>
  <div class="write_container">
    <div class="top">
      <div class="back">
        <el-icon size="24"><Back /></el-icon>&nbsp;&nbsp;返回主页
      </div>
      <div class="main_info">
        <div class="main_item">
          <el-input v-model="articleHistory.title" placeholder="标题" />
        </div>
        <div class="main_item">
          <el-input
              v-model="articleHistory.summary"
              :autosize="{ minRows: 2, maxRows: 2 }"
              type="textarea"
              placeholder="文章简介"
          />
        </div>
        <div class="main_item">
          <el-select
              v-model="articleHistory.tagIds"
              multiple
              filterable
              class="m-2"
              remote
              reserve-keyword
              placeholder="选择标签"
              remote-show-suffix
              :remote-method="getTagListHandler"
              style="width: 240px"
          >
            <el-option
                v-for="item in tagList"
                :key="item['id']"
                :label="item['name']"
                :value="item['id']"
            />
          </el-select>
          <el-select
              v-model="articleHistory.categoryId"
              filterable
              class="m-2"
              allow-create
              default-first-option
              :reserve-keyword="false"
              placeholder="选择集合"
              style="width: 240px"
              @change="categoryChange"
          >
            <el-option
                v-for="item in categoryList"
                :key="item['id']"
                :label="item['name']"
                :value="item['id']"
            />
          </el-select>
        </div>
      </div>

      <div class="publish">
        <el-button @click="saveArticle" class="save_article" type="danger" round>保存文章</el-button>
        <el-button @click="publishArticleHandler" class="save_article" type="danger" round>发布文章</el-button>
      </div>
    </div>
    <div class="editor_container">
      <Editor class="editor" :isReadonly="false" v-model:text="articleHistory.content"></Editor>
    </div>
  </div>
</template>

<style scoped>
.write_container{
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.top {
  display: flex;
  width: 100vw;
  border-bottom: solid 1px #ddd;
}

.back{
  width: calc(200px - 32px);
  padding: 8px 16px;
  display: flex;        /* 启用 Flex 布局 */
  align-items: center;  /* 垂直居中 */
  justify-content: center;  /* 水平居中 */
  border-right: 1px solid #ddd;
}

.main_info{
  display: flex;
  flex-direction: column;
  flex: 5;
  gap: 8px;
  padding: 8px;
}

.main_item{
  display: flex;
  gap: 8px;
}

.publish{
  width: calc(200px - 32px);
  display: flex;        /* 启用 Flex 布局 */
  flex-direction: column;
  align-items: center;  /* 垂直居中 */
  justify-content: center;  /* 水平居中 */
  gap: 8px;
}


.editor_container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.editor {
  position: relative;
  dispaly: flex;
  width: 100%;
  height: 100%;
}

.save_article{
  margin-left: 0;
}
</style>
