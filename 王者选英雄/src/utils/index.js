import { ref } from 'vue'
// 显示图片
export function UrlImg(imgUrl, fileStr) {
  if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://')) {
    return imgUrl
  }
  return new URL(`../assets/${fileStr}/${imgUrl}`, import.meta.url).href
}
// 滚动元素的高度
export function elementHeight(bySetElObj) {
  let elHeight = 0
  let total = bySetElObj.value.total.length
  let maxRow = Math.ceil(total / bySetElObj.value.maxCol) //总共的列
  elHeight = maxRow * (bySetElObj.value.itemH + bySetElObj.value.rowSpace)
  return elHeight
}

// 得到要渲染的下标 start -> end
export function renderBetween(elScroll, bySetElObj) {
  let startRow = Math.floor(
    elScroll.value.scrollTop / (bySetElObj.value.itemH + bySetElObj.value.rowSpace),
  )
  let endRow = Math.ceil(
    (elScroll.value.scrollTop + elScroll.value.clientHeight) /
      (bySetElObj.value.itemH + bySetElObj.value.rowSpace),
  )
  let startIndex = startRow * bySetElObj.value.maxCol
  let endIndex = Math.min(bySetElObj.value.total.length, endRow * bySetElObj.value.maxCol)
  return { startIndex, endIndex }
}

// 布局列表函数
export function layout(index, bySetElObj) {
  let top = Math.floor(index / bySetElObj.maxCol) * (bySetElObj.itemH + bySetElObj.rowSpace)
  let left = (index % bySetElObj.maxCol) * (bySetElObj.itemW + bySetElObj.colSpace)
  return { top, left }
}

// 搜索函数
export function searchFun(herolist, heroname, emit) {
  let res = ref([])
  for (let i = 0; i < herolist.length; i++) {
    if (herolist[i].yxmclb_9965.includes(heroname)) {
      res.value.push(herolist[i])
    }
  }
  emit('searchedheroList-event', res)
}

// 得到分类过后的数组
export function classifyedArr(value, resultArr, oldArr) {
  if (value === '全部') {
    resultArr.value = oldArr.value
  } else {
    resultArr.value = oldArr.value.filter((item) => {
      return value === item.fllb_2105
    })
  }
}
