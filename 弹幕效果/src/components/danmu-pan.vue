<template>
  <div class="danmucontainer" ref="danmuContainer">
    <span v-for="item in danmuData" :key="item.id" :style="danmuStyle" ref="danmuWord">{{ item.context }}</span>
  </div>
  <form @submit.prevent="sendMag" class="sendInput">
    <input type="text" v-model="inputVal">
    <button :disabled="inputVal === '' ? true : false">发送</button>
  </form>
</template>

<script setup>
import { addDom, getRandomNum, getUniqueStr, isClearInput } from '@/utils'
import { ref, useTemplateRef, onMounted } from 'vue'

onMounted(() => {
  requestAnimationFrame(danmuMove)
})
let inputVal = ref('')
const danmuWord = useTemplateRef('danmuWord')
const danmuContainer = useTemplateRef('danmuContainer')
let elIndex = ref(0) //每一条弹幕元素

let danmuData = ref([])
let danmuStyle = ref({
  color: '#000', // 文字颜色
  backgroundColor: '', // 背景色（驼峰式，推荐）
  fontSize: '20px', // 字体大小（短横线式，需加引号）
})
function calculateDanmuPos(element) {
  let height = danmuContainer.value.offsetHeight
  let elementWidth = element.offsetWidth
  let elementHeight = element.offsetHeight
  danmuData.value[elIndex.value].y = getRandomNum(elementHeight, height - elementHeight)
  danmuData.value[elIndex.value].x = -elementWidth
  element.style.top = danmuData.value[elIndex.value].y + 'px'
  element.style.right = danmuData.value[elIndex.value].x + 'px'
}

function danmuMove() {
  for (let i = 0; i < danmuData.value.length; i++) {
    danmuData.value[i].x -= danmuData.value[i].speed
    danmuWord.value[i].style.transform = `translateX(${danmuData.value[i].x}px)`
    if (danmuData.value[i].x < -(danmuContainer.value.offsetWidth + danmuWord.value[elIndex.value - 1].offsetWidth)) {
      setTimeout(() => {
        danmuData.value.splice(i, 1)
        i--
        elIndex.value--
      }, 0)
    }
  }
  requestAnimationFrame(danmuMove)
}

async function sendMag() {
  await addDom(danmuData, inputVal) //添加dom
  isClearInput(inputVal) // 清空输入框
  spanPos(danmuWord)
}

function spanPos(danmuWord) {
  let element = danmuWord.value[elIndex.value]
  element.setAttribute('index', getUniqueStr())
  calculateDanmuPos(element)
  elIndex.value++
}
</script>

<style scoped>
.danmucontainer {
  width: 100vw;
  height: 35vh;
  position: relative;

  span {
    position: absolute;
  }
}

.sendInput {
  position: absolute;
  bottom: 0;
  width: 100vw;
  display: flex;
  --heightForm: 50px;
  --bottomWidth: 10%;

  input {
    width: calc(100% - var(--bottomWidth));
    height: var(--heightForm);
    outline: none;
    border-radius: 0;
    padding: 0 20px;
    font-size: 18px;
    font-family: 黑体;
    font-weight: 600;
  }

  button {
    width: var(--bottomWidth);
    height: var(--heightForm);
    outline: none;
    border-radius: 0;
    font-size: 18px;
    font-family: 黑体;
    font-weight: 600;
    color: transparent;
    background-image: linear-gradient(45deg, #0abee2, rgb(3, 83, 162));
    -webkit-background-clip: text;
    background-clip: text;
    cursor: pointer;

  }
}
</style>
