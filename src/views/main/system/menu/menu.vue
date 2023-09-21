<template>
  <div class="menu">
    <page-content :content-config="contentConfig"></page-content>
  </div>
</template>

<script setup lang="ts">
import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/contentConfig'
</script>

<style lang="less" scoped></style>
