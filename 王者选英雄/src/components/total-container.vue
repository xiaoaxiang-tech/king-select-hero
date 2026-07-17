<template>
  <div class="box">
    <div class="top-time-container">
      <top-time></top-time>
    </div>
    <!-- 禁用英雄区域 -->
    <div class="forbid-hero">
      <div class="left">
        <forbidHero v-for="item in NewforbidStore.LEftforbidInit" :key="item.id" :forbidhero="item">
        </forbidHero>
      </div>
      <div class="right">
        <forbidHero v-for="item in NewforbidStore.RIGHTforbidInit" :key="item.id" :forbidhero="item">
        </forbidHero>
      </div>
    </div>
    <div class="search-area">
      <searchInput :herodata="saveresult" @searchedheroList-event="searchList"></searchInput>
    </div>
    <!-- 英雄分类 -->
    <div class="hero-card">
      <heroCard v-for="(item, index) in newheroArr.heroArr" :key="item.id" :heroArr="item" :index="index"
        @iscart-event="isclassify" :heroindex="heroindex"></heroCard>
    </div>
    <!-- 英雄选择区 -->
    <div class="hero-select-area">
      <div class="left">
        <selectHeroArea v-for="item in newSelectHero.heroSelectLeft" :key="item.id" :selhero="item">
        </selectHeroArea>
      </div>
      <div class="center" ref="centerScroll" @scroll="renderInit">
        <div class="by-hero-container" ref="byHeroContainer">
          <heroByArea v-for="(item, index) in result.slice(startInx, endInx + 1)" :key="item.id" :heroData="item"
            :byheroData="byheroData" :i="index + startInx" @select-hero="ispick" :goyid="forbidhero.goyfilter">
          </heroByArea>
        </div>
      </div>
      <div class="right">
        <selectHeroArea v-for="(item) in newSelectHero.heroSelectRight" :key="item.id" :selhero="item">
        </selectHeroArea>
      </div>
    </div>

    <!-- 确认按钮 -->
    <div class="notarize-container">
      <notarizeBtn :mapherolist="mapForbid" @event-isClick="isclicker"></notarizeBtn>
    </div>
  </div>
</template>

<script setup>
import topTime from './TopTime/top-time.vue';
import forbidHero from './forbidhero/forbid-hero.vue';
import searchInput from './seachInput/search-input.vue';
import heroCard from './heroCard/hero-card.vue';
import selectHeroArea from './selecthero/select-hero.vue';
import notarizeBtn from './notarize/notarize-btn.vue';
import heroByArea from './selecthero/hero-by-area.vue';
import { v4 as uuidv4 } from 'uuid'
import { forbidStore } from '@/stores/forbid';
import { classifyHero } from '@/stores/classify-hero';
import { selectHero } from '@/stores/hero-select.js';
import { render } from '@/utils/API';
import { onMounted, ref, useTemplateRef, reactive } from 'vue'
import { classifyedArr, elementHeight, renderBetween } from '@/utils';
import { btnForbid } from '@/stores/btn-forbid';
const NewforbidStore = forbidStore() //响应式数组ref 禁用英雄数据
const newheroArr = classifyHero() //英雄选项卡Store
const newSelectHero = selectHero() // 选择英雄仓库
const byHeroContainer = useTemplateRef('byHeroContainer')
const centerScroll = useTemplateRef('centerScroll')
let result = ref([])
let saveresult = ref([])
let oldresult = ref([])
let byheroData = ref({
  maxCol: 6,
  rowSpace: 32,
  colSpace: 32,
  total: result,
  itemW: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--heroCartW')),
  itemH: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--heroCartH')),
})
let startInx = ref(0)
let endInx = ref(0)

let heroindex = ref(0) //默认展示全部
const mapForbid = reactive(new Map())  //缓存英雄列表
const forbidhero = btnForbid()
const forbid = forbidStore()
let isClick = ref(true)
onMounted(async () => {
  let res = await render()

  result.value = res.map(item => {
    return {
      ...item,
      id: uuidv4()
    }
  })
  oldresult.value = result.value
  saveresult.value = result.value
  // 缓存英雄列表数据
  function mapListHero() {
    mapForbid.clear()
    oldresult.value.forEach(item => {
      mapForbid.set(item.id, item.fmlb_4536)
    })
  }
  mapListHero()
  let ElHeight = elementHeight(byheroData)
  byHeroContainer.value.style.height = ElHeight + 'px'
  renderInit() // 初始化渲染
})
function renderInit() {
  let { startIndex, endIndex } = renderBetween(centerScroll, byheroData)
  startInx.value = startIndex
  endInx.value = endIndex
}

function ispick(item) {
  if (isClick.value) {
    forbidhero.isdisbale = false
    forbidhero.goyfilter = item.id
    if (forbidhero.indexForbid > forbid.LEftforbidInit.length - 1 && !forbidhero.flags) {
      forbidhero.indexForbid = null
    }
  }
}

// 卡片分类
function isclassify(index, text) {
  heroindex.value = index
  // 分类
  classifyedArr(text, result, oldresult)

  // 分类之后重新布局
  let ElHeight = elementHeight(byheroData)
  byHeroContainer.value.style.height = ElHeight + 'px'
  renderInit()
  saveresult.value = result.value
}
// 搜索函数
function searchList(newres) {
  !newres.value.length || (result.value = newres.value)
}

// 是否可点击
function isclicker() {
  isClick.value = false
}
</script>

<style scoped>
.box {
  width: 800px;
  margin: 0 auto;

  .top-time-container {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .forbid-hero {
    width: 100%;
    height: 50px;
    display: flex;

    .left,
    .right {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    .left {
      /* border-right: 3px solid #ccc; */
    }

  }

  /* 搜索区域 */
  .search-area {
    width: 100%;
    height: 30px;
    margin: 10px 0;
    display: flex;
    flex-direction: row-reverse;
  }

  /* 英雄分类 */
  .hero-card {
    width: 100%;
    height: 50px;
    background-color: rgba(10, 83, 200, 0.2);
    display: flex;
  }

  .hero-select-area {
    width: 100%;
    height: 400px;
    display: flex;
    --w: 10%;

    .left {
      width: var(--w);
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
    }

    .center {
      width: calc(100% - (var(--w) * 2));
      height: 100%;
      overflow: scroll;
      scrollbar-width: none;
      /* Firefox */
      -ms-overflow-style: none;

      /* IE/Edge */
      .by-hero-container {
        width: 100%;
        position: relative;
      }
    }

    .right {
      width: var(--w);
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
    }
  }

  .notarize-container {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
