<template>
    <!-- 模块二部分 -->
    <div class="right">
        <div class="right-left">
            <div class="jiaosheselect">
                <img src="@/assets/image/左箭头.png" alt="" @click="pre" ref="left-jiantou"
                    :class="{ 'pan-opcity': prevBtn }">
                <div class="middle">
                    <div class="fitmiddle" ref="fitmiddle">
                        <div class="movemiddle" v-for="(item, index) in imgSmall" :key="index" ref="movemiddle">
                            <div><img :src="UrlImg(item.img1, 'image')" alt="" ref="smallimg"></div>
                            <div><img :src="UrlImg(item.img2, 'image')" alt="" ref="smallimg"></div>
                            <div><img :src="UrlImg(item.img3, 'image')" alt="" ref="smallimg"></div>
                        </div>
                    </div>
                </div>
                <img src="@/assets/image/左箭头.png" alt="" :class="['right-jiantou', { 'pan-opcity': nextBtn }]"
                    ref="right-jiantou" @click="next">
            </div>
            <transition-group name="elementBigImg">
                <div class="bigimgcontainer" v-for="(item, index) in imgBig" :key="index"
                    v-show="activeIndex === index">
                    <img :src="UrlImg(item.img, 'image')" alt="" class="bigImg"></img>
                    <div class="jobtext">
                        <p>{{ item.factionsName }}</p>
                        <p>{{ item.name }}</p>
                    </div>
                </div>
            </transition-group>
        </div>
        <div class="right-right">
            <Btn text="查看更多" :btnclass="['button']"></Btn>
        </div>
    </div>
</template>

<script setup>
import Btn from '../../components/Btn.vue'
import { onMounted, reactive, ref, useTemplateRef } from 'vue'
import { UrlImg, preview, nextview } from '../../utils'

let index = ref(0) //图片容器下标
let prevBtn = ref(true) //上一张图片按钮状态
let nextBtn = ref(false) //下一张图片按钮状态
const activeIndex = ref(0); // 默认显示第一个元素
const movemiddle = useTemplateRef('movemiddle')
const fitmiddle = useTemplateRef('fitmiddle')
const smallimg = useTemplateRef('smallimg')

onMounted(() => {
    for (let i = 0; i < smallimg.value.length; i++) {
        smallimg.value[i].addEventListener('click', () => {
            activeIndex.value = i
        })
    }
})


function next() {
    if (index.value >= imgSmall.length - 2) {
        //禁右用按钮
        nextBtn.value = true
    } else {
        //移除左按钮类名
        prevBtn.value = false
    }
    nextview(fitmiddle.value, movemiddle.value[0], index)
}
function pre() {
    if (index.value <= 1) {
        //禁用左按钮
        prevBtn.value = true
    } else {
        //移除右按钮类名
        nextBtn.value = false
    }
    preview(fitmiddle.value, movemiddle.value[0], index)
}

// 小图片数据
const imgSmall = reactive([
    {
        img1: '爱丽丝small.png',
        img2: '奥菲丝small.png',
        img3: '扳机small.png',
    },
    {
        img1: '波可娜small.png',
        img2: '浮波柚叶small.png',
        img3: '橘福福small.png',
    },
    {
        img1: '狂野真斗small.png',
        img2: '零号·安比small.png',
        img3: '卢西亚small.png',
    },
    {
        img1: '潘引壶small.png',
        img2: '微微安small.png',
        img3: '席德small.png',
    },
    {
        img1: '医德海莉small.png',
        img2: '仪玄small.png',
        img3: '雨果small.png',
    },
])

//大图片数据

const imgBig = reactive([
    {
        factionsName: '怪啖屋',
        name: '爱丽丝·泰姆菲尔德',
        img: '爱丽丝.png',
    },
    {
        factionsName: '奥波勒斯小队',
        name: '奥菲丝&「鬼火」',
        img: '奥菲丝.png',
    },
    {
        factionsName: '奥波勒斯小队',
        name: '「扳机」',
        img: '扳机.png',
    },
    {
        factionsName: '卡吕冬之子',
        name: '波可娜·费雷尼',
        img: '波可娜.png',
    },
    {
        factionsName: '怪啖屋',
        name: '浮波柚叶',
        img: '浮波柚叶.png',
    },
    {
        factionsName: '云岿山',
        name: '橘福福',
        img: '橘福福.png',
    },
    {
        factionsName: '怪啖屋',
        name: '狛野真斗',
        img: '狂野真斗.png',
    },
    {
        factionsName: '防卫军·白银小队',
        name: '零号·安比',
        img: '零号·安比.png',
    },
    {
        factionsName: '怪啖屋',
        name: '卢西娅',
        img: '卢西亚.png',
    },
    {
        factionsName: '云岿山',
        name: '潘引壶',
        img: '潘引壶.png',
    },
    {
        factionsName: '反舌鸟',
        name: '薇薇安',
        img: '薇薇安.png',
    },
    {
        factionsName: '奥波勒斯小队',
        name: '「席德」',
        img: '席德.png',
    },
    {
        factionsName: '怪啖屋',
        name: '伊德海莉',
        img: '医德海莉.png',
    },
    {
        factionsName: '云岿山',
        name: '仪玄',
        img: '仪玄.png',
    },
    {
        factionsName: '反舌鸟',
        name: '雨果',
        img: '雨果.png',
    },
])

</script>

<style scoped lang="less">
@import '@/varibleLess/index.less';

//动画
.elementBigImg-enter-from {
    /* 开始位置：右侧90% */
    transform: translateX(90%);
    opacity: 0;
}

.elementBigImg-enter-active {
    /* 动画持续时间和缓动效果 */
    transition: all 0.5s ease-out;
}

.elementBigImg-enter-to {
    /* 结束位置：0 */
    transform: translateX(0);
    opacity: 1;
}

/* 离开动画 */
.elementBigImg-leave-from {
    /* 开始位置：0 */
    transform: translateX(0);
    opacity: 1;
}

.elementBigImg-leave-active {
    /* 动画持续时间和缓动效果 */
    transition: all 0.5s ease-in;
    position: absolute;
}

.elementBigImg-leave-to {
    /* 结束位置：右侧90% */
    transform: translateX(90%);
    opacity: 0;
}

// 模块二角色介绍
.right {
    width: 70%;
    height: 100%;
    display: flex;
    background-color: #fff;
    border-radius: 458px 0 0 120px;

    .right-left {
        width: 70%;
        height: 100%;
        position: relative;

        .jiaosheselect {
            width: 435px;
            height: 60px;
            background-color: #000;
            position: absolute;
            z-index: 2;
            bottom: 20px;
            border-radius: 30px;
            .flex-between(center);
            padding: 5px;

            img {
                width: 55px;
                height: 45px;
            }

            .right-jiantou {
                transform: rotate(180deg);
            }

            .middle {
                width: 315px;
                height: 45px;
                // background-color: red;
                border-radius: 5px;
                transform: skewX(-20deg);
                overflow: hidden;

                .fitmiddle {
                    width: fit-content;
                    height: 45px;
                    // background-color: rgb(0, 26, 255);
                    border-radius: 5px;
                    transition: all .3s;
                    display: flex;
                    .flex-between(start);

                    .movemiddle {
                        width: 315px;
                        height: 45px;
                        // background-color: rgb(0, 255, 76);
                        border-radius: 10px;
                        display: flex;
                        .flex-between(start);


                        div {
                            width: 95px;
                            height: 45px;
                            border-radius: 10px;

                            // background-color: #1898c2;
                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                            }
                        }
                    }
                }
            }
        }

        .bigimgcontainer {
            width: 100%;
            height: 100%;
            position: absolute;
            // background-color: red;


            .bigImg {
                width: 100%;
                height: 133%;
                object-fit: contain;
                position: absolute;
                bottom: 0;
                // transform: translateX(90%);
            }

            //  介绍 角色
            .jobtext {
                position: absolute;
                right: -230px;
                top: 30px;
                text-align: right;

                p:nth-child(1) {
                    font-size: 30px;
                    font-family: 华文细黑;
                    font-weight: 900;
                }

                p:nth-child(2) {
                    font-size: 50px;
                    font-family: 华文细黑;
                    font-weight: 900;
                }
            }
        }
    }

    .right-right {
        width: 30%;
        .flex-center()
    }

    button {
        width: 185px;
        height: 55px;
        margin-top: 295px;


        &:hover {
            border: 5px solid #000;
            background-color: #fff;
            color: #000;
        }


    }


}
</style>