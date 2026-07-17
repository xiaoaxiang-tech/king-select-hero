<template>
    <img :src="UrlImg(img.imgOpen,'image')">
</template>

<script setup>
import { ref, reactive } from 'vue'
import { UrlImg } from '../utils';
let img = reactive({
    imgOpen: '音乐开.png',
    imgOff: '音乐关.png'
})



</script>

<style scoped>
img {
    width: 45px;
    height: 45px;
    object-fit: contain;
    animation: playMusic 1s infinite ease-in-out;
}



@keyframes playMusic {
    0% {
        /* 初始状态：正常大小 */
        transform: scale(1);
    }

    50% {
        /* 中间状态：放大到1.3倍 */
        transform: scale(1.3);
    }

    100% {
        /* 结束状态：回到正常大小 */
        transform: scale(1);
    }
}
</style>