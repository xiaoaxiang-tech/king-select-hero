<template>
  <div class="box">
    <div class="redhero">
      <div v-for="item in redhero" :key="item.id" ref="redh">
        <img :src="item.img" alt="">
      </div>
    </div>
    <div class="bluehero">
      <div v-for="item in bluehero" :key="item.id" ref="blueh">
        <img :src="item.img" alt="">
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, useTemplateRef } from 'vue'
import { useRoute } from 'vue-router';
let route = useRoute()

const redhero = JSON.parse(route.query?.fallred ?? '{}')
const bluehero = JSON.parse(route.query?.fallblue ?? '{}')
const redh = useTemplateRef('redh')
const blueh = useTemplateRef('blueh')
onMounted(() => {
  for (let i = 0; i < redh.value.length; i++) {
    redh.value[i].style.animationDelay = `${i * 0.4}s`
    blueh.value[i].style.animationDelay = `${i * 0.4}s`
    document.documentElement.style.setProperty('--end', `${i + 1 * 20}%`);
  }
})
</script>

<style scoped>
:root {
  --end: 100%;
}

.box {
  width: 1000px;
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 30px auto;

  .redhero,
  .bluehero {
    width: 100%;
    height: 47%;
    display: flex;
    justify-content: space-between;

    div {
      width: 19%;
      height: 100%;
      box-shadow: 0 1px 6px #dddddd;
      animation: slideLeft 0.5s ease-out 1 forwards;
      opacity: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}


@keyframes slideLeft {
  0% {
    transform: translateX(0);
    opacity: 0;
  }

  100% {
    transform: translateX(var(--end));
    opacity: 1;
  }
}
</style>
