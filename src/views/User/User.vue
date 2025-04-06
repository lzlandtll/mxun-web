<script setup lang="ts">
import UserBaseInfo from "@/views/User/UserBaseInfo.vue";
import UserArticleFilter from "@/views/User/UserArticleFilter.vue";
import UserArticleList from "@/views/User/UserArticleList.vue";
</script>

<template>
  <div>
    <div class="user_container">
      <div class="left_container">
        <UserBaseInfo/>
        <div class="other_container">
        </div>
      </div>
      <div class="right_container">
        <UserArticleFilter class="article_filter_container" />
        <UserArticleList class="user_article_list_container" />
      </div>
    </div>
  </div>
</template>

<style scoped>

.user_container{
  position: relative;
  display: inline-flex;
  gap: var(--out-padding);
  width: 80%;
  height: 100%;
}
.left_container{
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 2;
  z-index: 2;
  border-radius: 5px;
  gap: var(--out-padding);
}
.other_container{
  width: 100%;
  min-height: calc(100% - 200px - var(--out-padding));
  background: #dee6ee;
  border-radius: var(--out-padding);
}
.right_container{
  position: relative;
  display: flex;
  flex: 5;
  flex-direction: column;
  z-index: 2;
  height: 100%;
  border-radius: 5px;
  overflow: scroll;
  background: #eaf2f5;
  gap: var(--out-padding);
}

.right_container::-webkit-scrollbar {
  display: none;
}

.article_filter_container{
  position: relative;
  display: flex;
  width: 100%;
  height: 40px;
  align-items: center;
  justify-content: center;
  background: #7ad8df;
  border-radius: var(--border-radius);
  overflow: hidden;
}
.user_article_list_container{
  width: 100%;
  height: calc(100% - 40px - var(--out-padding));
}

.user_article_list_container::-webkit-scrollbar {
  display: none;
}
</style>
