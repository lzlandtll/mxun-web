<script setup lang="tsx">
import Login from '@/views/Login/Login.vue'
</script>

<template>
  <div class="nav">
    <div class="rightNav">

    </div>
    <div class="centerNav">

    </div>
    <div class="leftNav">
      <Login />
    </div>
  </div>
</template>

<style scoped>
  .nav{
    position: relative;
    display: flex;
    width: 100%;
    height: var(--nav-height);
    background: #f6e9e9;
  }
  .rightNav{
    flex: 3;
  }
  .centerNav{
    flex: 4
  }
  .leftNav{
    flex: 3;
    position: relative;
  }
</style>
