<template>
    <div class="containerImg" v-for="(item, index) in gameImg" :key="index"
        :class="[{ 'imgActive': imgIndex === index }]">
        <div class="jiantou">
            <div class="pre" @click="pre">
                <img src="@/assets/gemetese/箭头pre.png" alt="">
            </div>
            <div class="next" @click="next">
                <img src="@/assets/gemetese/箭头next.png" alt="">
            </div>
        </div>
        <img :src="UrlImg(item.img, 'gemetese')" alt="">
        <div class="imgTextIntroduce">
            <div class="imgtextTop">{{ item.introduce }}</div>
            <div class="imgtextbottom"></div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { UrlImg } from '../../utils';
const gameImg = reactive([

    {
        introduce: '独特音画，沉浸体验',
        img: '独特音画.png',
    },
    {
        introduce: '各方势力，错综复杂',
        img: '各方势力.png',
    },
    {
        introduce: '双重身份，别样生活',
        img: '双重身份.png',
    },
    {
        introduce: ' 小队组合，高速激斗',
        img: '小队组合.png',
    },
])
let imgIndex = ref(0)
// 上一张
function pre() {
    if (imgIndex.value <= 0) {
        imgIndex.value = gameImg.length - 1
    } else {
        imgIndex.value--
    }

}
// 下一张
function next() {
    if (imgIndex.value >= gameImg.length - 1) {
        imgIndex.value = 0
    } else {
        imgIndex.value++
    }
}
</script>

<style scoped lang="less">
@import '@/varibleLess/index.less';

.containerImg {
    width: inherit;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-direction: column-reverse;
    position: absolute;
    opacity: 0;
    transition: all .3s;

    .jiantou {
        width: 100%;
        height: 113px;
        // background-color: red;
        position: absolute;
        z-index: 2;
        top: 50%;
        transform: translateY(-50%);
        .flex-around(center);

        .pre,
        .next {
            width: 50px;
            height: 50px;

            //  background-color: skyblue;
            img {
                width: 50px;
                height: 50px;
                object-fit: cover;
                opacity: 0.5;
                cursor: pointer;
            }
        }
    }

    img {
        width: 100%;
        height: auto;
        object-fit: cover;
        position: absolute;
        overflow: hidden;
    }

    .imgTextIntroduce {
        width: 100%;
        height: 170px;
        z-index: 2;


        .imgtextTop {
            width: 100%;
            height: 120px;
            background-color: rgba(0, 0, 0, .7);
            clip-path: polygon(9.7% 1%, 100% 0, 100% 100%, 0.2% 99%);
            display: flex;
            align-items: center;
            flex-direction: row-reverse;
            padding: 0 30px;
            font-size: 50px;
            font-family: 华文细黑;
            color: rgb(200, 230, 5);
            font-weight: 900;
        }

        .imgtextbottom {
            width: 100%;
            height: 50px;
            background-color: rgba(200, 230, 5, 0.5);
            opacity: 0.5;
            border-radius: 20px 0 0 26px;
            margin-top: -1px;
        }
    }
}

.imgActive {
    opacity: 1;
}
</style>