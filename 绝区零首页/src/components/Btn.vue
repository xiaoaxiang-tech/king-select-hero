<template>
    <button :class="['mybtn','btnclass']">{{ text }}</button>
</template>

<script setup>
import { ref } from 'vue'

defineProps(['text','btnclass'])
</script>

<style scoped>
.mybtn {
    border: 5px solid #767678;
    outline: none;
    cursor: pointer;
    background-color: #000;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    color: #fff;
    border-radius: 40px;
    font-size: 20px;
    font-weight: 900;
    transition: all .3s;
}
</style>