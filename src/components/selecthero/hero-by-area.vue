<template>
  <div ref="heroItemRefs" :style="{
    transform: `translate(${left}px,${top}px)`,
  }">
    <img
      :src="thumbUrl"
      alt=""
      ref="heroimg"
      decoding="async"
      loading="lazy"
      @click="$emit('select-hero', heroData)"
      :class="[
        { active: heroData.id === goyid && btnforbids.indexForbid !== null },
        { active2: btnforbids.flag.includes(heroData.id) },
        { active3: heroData.id === goyid && btnforbids.indexForbid === null },
        { active4: btnforbids.flagcomfirm.includes(heroData.id) }
      ]">

    <span>{{ heroData.yxmclb_9965 }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { btnForbid } from '@/stores/btn-forbid';
import { layout } from '@/utils';
let p = defineProps(['heroData', 'byheroData', 'i', 'goyid'])
let { left, top } = layout(p.i, p.byheroData)
const btnforbids = btnForbid()

const BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

// 通过后端代理缩放图片：2000px → 160px，体积从 MB → KB
const thumbUrl = computed(() => {
  return `${BASE_URL}/image?url=${encodeURIComponent(p.heroData.fmlb_4536)}&w=160`
})
</script>

<style scoped>
@import '@/assets/main.css';

div {
  width: var(--heroCartW);
  height: var(--heroCartH);
  cursor: pointer;
  position: absolute;
  text-align: center;
  content-visibility: auto;
  contain-intrinsic-size: var(--heroCartW) var(--heroCartH);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter .3s;
    border-radius: 50%;
  }
}

.active {
  filter: grayscale(100%);
}

.active2 {
  filter: grayscale(100%);
  pointer-events: none;
}

.active3 {
  border: var(--border);
}

.active4 {
  border: var(--border);
}
</style>
