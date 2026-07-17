<template>
  <div class="forbid-heros">
    <img :src="UrlImg(forbidhero.img, '禁止图片')" alt="">
  </div>
</template>

<script setup>

import { UrlImg } from '@/utils';
defineProps(['forbidhero'])

</script>

<style scoped>
.forbid-heros {
  width: 40px;
  height: 40px;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
}
</style>
