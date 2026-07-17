<template>
  <form class="search-container" @submit.prevent="searchFun(herodata, heroName, emit), heroName = ''">
    <input type="text" placeholder="请输入搜索的内容" required="请输入英雄名字" v-model="heroName">
    <button class="search">
      <span>🔍</span>
    </button>
  </form>
</template>

<script setup>
import { searchFun } from '@/utils';
import { ref } from 'vue'
const heroName = ref('')
defineProps(['herodata'])
let emit = defineEmits(['searchedheroList-event'])
</script>

<style scoped>
.search-container {
  width: 200px;
  height: 100%;
  display: flex;

  input {
    border-radius: 0;
    border: 2px solid #ccc;
    width: 84%;
    height: 100%;
    padding: 0 10px 0 10px;
    outline: none;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 900;
    flex-shrink: 0;
    /* 弹性盒子不压缩*/

  }

  input::placeholder {
    font-style: oblique;
    font-weight: 500;
    font-family: 'Courier New', Courier, monospace;
  }

  .search {
    width: 20%;
    height: 100%;
    background-color: rgba(12, 160, 201, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 0;
    outline: none;

    span {
      font-size: 20px;
    }
  }

}
</style>
