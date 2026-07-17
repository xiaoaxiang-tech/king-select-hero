<template>
    <!-- 模块一 -->
    <div class="banner">
        <img src="@/assets/image/banner.png" alt="">
        <img src="@/assets/image/立即下载.png" alt="" :class="{ 'ishover': isHover }" @mouseenter="isHover = isHover = true"
            @mouseleave="isHover = isHover = false">
    </div>
    <!-- 模块二 人物介绍-->
    <div class="jueshe">
        <div class="left">
            <div class="jobproduce">
                <p>角色介绍</p>
                <p>CHARACTER</p>
                <p>02</p>
            </div>
        </div>
        <JobIntroduce></JobIntroduce>
    </div>

    <!-- 模块三 新闻资讯-->
    <div class="newszixun">
        <div class="left">
            <!-- 轮播组件 -->
            <NewMsg></NewMsg>
        </div>
        <div class="right">
            <div class="newstext">
                <p> 新闻资讯</p>
                <p>lates news</p>
                <p>03 </p>
            </div>
        </div>
    </div>

    <!-- 模块四 -->
    <div class="gamefeature">
        <div class="left">
            <div class="gametext">
                <p> 游戏特色</p>
                <p>feature</p>
                <p>04</p>
            </div>
        </div>
        <div class="right">
           <GameFeature></GameFeature>
        </div>
    </div>
</template>

<script setup>
import JobIntroduce from './JobIntroduce.vue'  //模块二组件
import NewMsg from './NewMsg.vue'  // 模块三组件
import GameFeature from './GameFeature.vue' //模块三组件
import { onMounted, reactive, ref, useTemplateRef } from 'vue'

let isHover = ref(false)

</script>

<style scoped lang="less">
@import '@/varibleLess/index.less';

.banner {
    width: @wrap;
    margin: @margin;
    height: auto;
    display: flex;

    img:nth-child(1) {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    img:nth-child(2) {
        width: 288px;
        height: 153px;
        object-fit: contain;
        transform: translate(-340px, 50px);
    }

}

//动画类名
.ishover {
    animation: fastload 1s ease-in-out;
}


@keyframes fastload {
    0% {
        transform: translate(-340px, 50px) scale(1);
    }

    20% {
        transform: translate(-340px, 50px) scale(1.2);
    }

    30% {
        transform: translate(-340px, 50px) scale(1.2) rotate(-10deg);
    }

    40% {
        transform: translate(-340px, 50px) scale(1.2) rotate(10deg);
    }

    50% {
        transform: translate(-340px, 50px) scale(1.2) rotate(-10deg);
    }

    60% {
        transform: translate(-340px, 50px) scale(1.2) rotate(10deg);
    }

    70% {
        transform: translate(-340px, 50px) scale(1.2) rotate(-10deg);
    }

    80% {
        transform: translate(-340px, 50px) scale(1.2) rotate(10deg);
    }

    90% {
        transform: translate(-340px, 50px) scale(1.2) rotate(-10deg);
    }

    100% {
        transform: translate(-340px, 50px) scale(1);
    }
}


// 模块二角色介绍
.jueshe {
    position: relative;
    width: @wrap;
    height: 400px;
    margin: @margin;
    background-color: #d8fa00;
    display: flex;
    margin-top: 100px;

    .left {
        width: 30%;
        height: 100%;
        display: flex;
        flex-direction: row-reverse;

        .jobproduce {
            width: fit-content;
            height: fit-content;
            margin: 50px 0;

            p {
                margin: -5px 10px 10px 10px;
            }

            p:nth-child(1) {
                font-size: 30px;
                font-weight: 900;
                font-family: 华文细黑;
            }

            p:nth-child(2) {
                font-size: 16px;
                font-weight: 900;
                font-family: 华文细黑;
            }

            p:nth-child(3) {
                font-size: 70px;
                font-weight: 900;
                font-family: 华文细黑;
            }
        }
    }


}

// 模块三新闻资讯
.newszixun {
    width: 1000px;
    height: 450px;
    margin: 100px auto 0 auto;
    display: flex;

    .left {
        width: 70%;
        height: 100%;
        margin-top: 45px;
    }

    .right {
        width: 40%;
        height: 100%;
        display: flex;
        flex-direction: row;
        position: relative;

        .newstext {
            margin-left: 100px;

            p {
                margin: -5px 10px 10px 10px;
            }

            p:nth-child(1) {
                font-size: 30px;
                font-weight: 900;
                font-family: 华文细黑;
            }

            p:nth-child(2) {
                font-size: 16px;
                font-weight: 900;
                font-family: 华文细黑;
            }

            p:nth-child(3) {
                font-size: 70px;
                font-weight: 900;
                font-family: 华文细黑;
            }
        }
    }
}

// 模块四 游戏特色
.gamefeature {
    position: relative;
    width: @wrap;
    height: 400px;
    margin: @margin;
    display: flex;
    margin-top: 100px;
    .flex-between(start);


    .left {
        width: 30%;
        height: 100%;
        display: flex;
        flex-direction: row-reverse;
         background-color: #d8fa00;
         transform: skew(-40deg);

        .gametext {
            width: fit-content;
            height: fit-content;
            margin: 20px;

            p {
                margin: -5px 10px 10px 10px;
            }

            p:nth-child(1) {
                font-size: 30px;
                font-weight: 900;
                font-family: 华文细黑;
            }

            p:nth-child(2) {
                font-size: 16px;
                font-weight: 900;
                font-family: 华文细黑;
            }

            p:nth-child(3) {
                font-size: 70px;
                font-weight: 900;
                font-family: 华文细黑;
            }
        }
    }

    .right {
        width: 80%;
        height: 100%;
    }
}
</style>