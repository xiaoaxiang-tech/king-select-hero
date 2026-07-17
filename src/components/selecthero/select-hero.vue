<template>
  <div class="hero-select-area-alone">
    <img :src="UrlImg(selhero.img, '默认图片')" alt="">
  </div>
</template>

<script setup>
import { UrlImg } from '@/utils';
defineProps(['selhero'])

</script>

<style scoped>
.hero-select-area-alone {
  width: 40px;
  height: 40px;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
}
</style>
