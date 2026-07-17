<template>
   <RouterLink :class="RouterLinkData">{{ text }}</RouterLink>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router';

const data = defineProps(['text', 'RouterLinkData'])


</script>

<style scoped lang="less">
@import '@/varibleLess/index.less';
/* 公共的按钮样式 */
a {
   border-radius: 50px;
   text-decoration: none;
   font-size: 14px;
   transition: all .5s;
   cursor: pointer;
   .flex-center()
}
</style>