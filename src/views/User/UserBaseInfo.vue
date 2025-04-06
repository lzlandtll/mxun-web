<script setup lang="ts">
import {getOpenUserInfo} from '@/api/mem'
import {onMounted, ref} from "vue";
import AppUtils from "@/utils/AppUtils";

const userId = ref(AppUtils.getUrlQuery("userId"))
const userInfo = ref({})
onMounted(() => {
  getOpenUserInfoHandler()
})

const getOpenUserInfoHandler = async () => {
  let res = await getOpenUserInfo(userId.value)
  if(res.code != "200"){
    return
  }
  userInfo.value = res.data
}
</script>

<template>
  <div class="person_container">
    <div class="base_user_info">
      <div class="person_icon"></div>
      <div class="title_summary_container">
        <div class="title_container">
          昵称: {{userInfo["username"]}}
        </div>
        <div class="summary_container">
          简介: {{userInfo["summary"]}}
        </div>
      </div>
    </div>
    <div class="expand_user_info">
      <div class="user_count_item left_line">
        <div class="user_count_digest">{{userInfo["articleCount"]}}</div>
        <div class="user_count_name">文章</div>
      </div>
      <div class="user_count_item left_line">
        <div class="user_count_digest">{{userInfo["followCount"]}}</div>
        <div class="user_count_name">粉丝</div>
      </div>
      <div class="user_count_item left_line">
        <div class="user_count_digest">{{userInfo["articleLikeCount"]}}</div>
        <div class="user_count_name">点赞</div>
      </div>
      <div class="user_count_item">
        <div class="user_count_digest">{{userInfo["articleCollectionCount"]}}</div>
        <div class="user_count_name">收藏</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.person_container{
  display: flex;
  width: 100%;
  height: 200px;
  flex-direction: column;
  gap: var(--inner-padding);
  background: #dff3f5;
  border-radius: var(--inner-padding);
  overflow: hidden;
}
.base_user_info{
  position: relative;
  flex: 1;
  display: flex;
  background: #e4f7f7;
  justify-content: center;
  align-items: center;
  justify-content: space-evenly;
}
.expand_user_info{
  display: flex;
  flex: 1;
  background: #d4f8f8;
  justify-content: space-evenly;
}

.user_count_item{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0;
}
.left_line{
  position: relative;
}
.left_line::after {
  content: ""; /* 必须设置 content 属性 */
  position: absolute; /* 使用绝对定位将伪元素放置在右侧 */
  right: 0; /* 贴近元素的右边 */
  top: 50%; /* 垂直居中 */
  transform: translateY(-50%); /* 精确垂直居中 */
  width: 1px; /* 分割线的宽度 */
  height: 30px; /* 分割线的高度 */
  border-right: 1px dashed #5a61ea; /* 设置虚线样式 */
}
.user_count_digest, .user_count_name{
  display: inline;
  text-align: center;
}

.person_icon{
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: url('@/assets/imgs/login.png');
  background-size: 100% 100%;
  color: #e5ab3d;
}

.title_summary_container{
  position: relative;
  display: flex;
  flex-direction: column;
  width: calc(100% - 40px - 90px);
  height: 100%;
  background: #9cd3c6;
  justify-content: space-evenly;
}
.title_container, .summary_container{
  position: relative;
  display: flex;          /* 启用 Flexbox 布局 */
  align-items: center;
}

</style>
