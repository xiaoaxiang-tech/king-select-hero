<template>
    <div class="lunbo">
        <div class="bigcantainer" ref="bigcantainer">
            <div class="boxUl" v-for="(item, index) in imgData" :key="index" ref="boxUl">
                <div class="topImg">
                    <img :src="UrlImg(item.img, 'newsImage')" alt="">
                    <div class="gundongtext">
                        <p ref="maxP" :class="[{ 'addGundongtextAnmin': index === Pnum }]">{{ item.textLife }}</p>
                    </div>
                </div>
                <div class="centertext">
                    <div class="textproduce">
                        <p>{{ item.time }}</p>
                        <p>{{ item.staticText }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="Bottomcontrol">
            <div class="yuancontainer">
                <div v-for="(item, index) in imgData" :key="index" :class="{ 'pan-yuanpoint': activeIndex === index }"
                    @click="fnmove(index)">
                </div>
            </div>
            <Btn text="查看更多" :btnclass="['button']"></Btn>

        </div>
    </div>
</template>

<script setup>
import Btn from '../../components/Btn.vue';
import { computed, onMounted, reactive, ref, useTemplateRef } from 'vue'
import { mouseMoveImg, prevnext, UrlImg } from '../../utils';

let activeIndex = ref(0)
let imgData = reactive([
    {
        img: '狂怒觉醒.png',
        textLife: '亲爱的绳匠，奥菲丝&「鬼火」EP《FURYON 狂怒觉醒》现已上架音乐平台。',
        time: '09/19/2025',
        staticText: '《绝区零》奥菲丝&鬼火EP《FURYON 狂怒觉醒》现已上架音乐平台'
    },
    {
        img: '机制介绍.png',
        textLife: '资料库中已收录代理人【奥菲丝&「鬼火」】的战斗相关信息，重点内容解析完毕，请查收。',
        time: '09/19/2025',
        staticText: '代理人机制介绍丨奥菲丝&「鬼火」篇'
    },
    {
        img: '狂怒觉醒无字.png',
        textLife: '我踏火而来，先声已至。',
        time: '09/19/2025',
        staticText: '《绝区零》奥菲丝&鬼火EP | FURYON 狂怒觉醒'
    },
    {
        img: '默契大挑战.png',
        textLife: '「队长，回答问题前一定要三思，喷火更是不可以！」',
        time: '09/17/2025',
        staticText: '丽都有丽事丨默契大挑战！'
    },
    {
        img: '闲钱赏金.png',
        textLife: '「先遣赏金-定期清剿」活动期间，绳匠进入「定期清剿」，挑战并通过任意关卡即可获得双倍奖励！',
        time: '09/16/2025',
        staticText: '「先遣赏金-定期清剿」活动说明'
    },
    {
        img: '激战聚光决胜.png',
        textLife: '完成活动挑战任务，可获得[调律校音器]、[菲林]等奖励。',
        time: '09/11/2025',
        staticText: '「激战聚光决胜」活动说明'
    },
])
const bigcantainer = useTemplateRef('bigcantainer')
const boxUl = useTemplateRef('boxUl')
const maxP = useTemplateRef('maxP')
let Pnum = ref(0)

function fnmove(index) {
    activeIndex.value = index
    prevnext(bigcantainer.value, boxUl.value[0], activeIndex)
    sum.value = -(activeIndex.value * boxUl.value[0].offsetWidth)
    Pnum.value = activeIndex.value //移动到那张图片就给那张图片加动画
}
let sum = ref(0) //我移动容器当前的位置
onMounted(() => {
    bigcantainer.value.onmousedown = (e) => {
        e.preventDefault()
        bigcantainer.value.style.transition = 'none'
        document.onmousemove = (e) => {
            activeIndex.value = mouseMoveImg(bigcantainer.value, boxUl, e, sum).value
        }
        document.onmouseup = () => {
            document.onmousemove = null
            bigcantainer.value.style.transition = 'all .3s'
            sum.value = -(activeIndex.value * boxUl.value[0].offsetWidth)
            prevnext(bigcantainer.value, boxUl.value[0], activeIndex)
            Pnum.value = activeIndex.value
            getPmax()
        }
    }

    getPmax() //刚开始文字就要开始滚动
})

//得到p 标签最大的滚动距离
function getPmax() {
    let maxPWidth = maxP.value[Pnum.value].offsetWidth
    const root = document.documentElement
    let maxDistanceP = maxPWidth
    root.style.setProperty('--maxPMove', `-${maxDistanceP}px`)
    // const rootStyle = getComputedStyle( document.documentElement)
    // let a = rootStyle.getPropertyValue('--maxPMove')
}
</script>

<style scoped lang="less">
@import '@/varibleLess/index.less';
@borderRaduis: 15px;
@boxUl: 500px;

:root {
    --maxPMove: 0
}

.lunbo {
    width: @boxUl;
    height: 100%;
    overflow: hidden;

    .bigcantainer {
        width: fit-content;
        height: fit-content;
        display: flex;
        transition: all .3s;

        .boxUl {
            width: @boxUl;
            height: fit-content;
            overflow: hidden;


            .topImg {
                width: 100%;
                height: 300px;
                position: relative;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: @borderRaduis @borderRaduis @borderRaduis @borderRaduis;
                }

                .gundongtext {
                    width: 100%;
                    height: 45px;
                    position: absolute;
                    bottom: 0;
                    display: flex;
                    align-items: center;
                    background-color: #000;
                    border-radius: 0 0 @borderRaduis @borderRaduis;

                    p {
                        font-size: 20px;
                        font-weight: 900;
                        font-style: oblique;
                        font-family: 华文细黑;
                        color: #808080;
                        white-space: nowrap;
                        transform: translateX(@boxUl);
                    }
                }
            }

            .centertext {
                width: 100%;
                height: 70px;
                display: flex;
                align-items: center;

                .textproduce {
                    padding: 0 10px;

                    p {
                        text-align: justify;
                        font-size: 16px;
                        font-weight: 900;
                        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
                    }
                }
            }
        }
    }

    .Bottomcontrol {
        width: 100%;
        height: 60px;
        .flex-between(center);

        .yuancontainer {
            width: 255px;
            height: 30px;
            border-radius: 30px;
            .flex-between(center);

            div {
                width: 20px;
                height: 20px;
                background-color: #000;
                border-radius: 50%;

            }

        }

        button {
            width: 100px;
            height: 40px;
            font-size: 14px;

            &:hover {
                border: 5px solid #000;
                background-color: #fff;
                color: #000;
            }
        }
    }
}

@keyframes gundongtext {
    0% {
        transform: translateX(@boxUl);
    }

    100% {
        transform: translateX(var(--maxPMove));
    }
}

.addGundongtextAnmin {
    animation: gundongtext 10s linear infinite;
}
</style>