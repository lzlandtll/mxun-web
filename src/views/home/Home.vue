<script setup>
import ChatAI from "@/views/ChatAI/ChatAI.vue";
import Nav from "@/views/Nav/Nav.vue";
</script>

<template>
  <div class="home_container">
    <ChatAI class="ai_content" />
    <Nav class="nav_container" />
    <router-view class="home_content"></router-view>
  </div>
</template>

<style scoped>
  .home_container{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100%);
    gap: var(--out-padding);
  }
  .nav_container{
    position: relative;
    display: flex;
    width: calc(100%);
    height: var(--nav-height);
    background: #f6e9e9;
    border-radius: 5px;
  }

  .home_content{
    position: relative;
    display: flex;
    height: calc(100% - var(--nav-height) - var(--out-padding));
    justify-content: space-evenly;
  }

</style>
