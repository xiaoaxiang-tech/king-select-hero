<template>
  <div class="toptime">
    <p>{{ selectText }}</p>
    <p>{{ selectHerojiziTime }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps(['selectHerojiziTime', 'selectText'])

</script>

<style scoped>
.toptime {
  width: 300px;
  height: 90px;
  background-color: bisque;
  clip-path: polygon(10% 0, 91% 0, 100% 100%, 0% 100%);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  p:nth-child(1) {
    font-size: 16px;
    font-weight: 900;
    font-family: 微软雅黑;
    margin-top: 10px;
  }

  p:nth-child(2) {
    font-size: 25px;
    font-weight: 900;
    font-family: 楷体;
    margin-top: 10px;
    color: #000;
    letter-spacing: 5px;
  }
}
</style>
