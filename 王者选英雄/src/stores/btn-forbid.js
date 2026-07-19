import { ref } from 'vue'
import { defineStore } from 'pinia'
export const btnForbid = defineStore('btn-forbid', () => {
  let isdisbale = ref(true)
  let flag = ref([])
  let flagcomfirm = ref([])
  let goyfilter = ref(null) //英雄是否被禁用（选择时）
  let indexForbid = ref(0) //禁用英雄下标
  let flags = ref(true) // 是否禁用右边
  let selheroLeft = ref(0) //英雄选择左边
  let selheroRight = ref(0) //英雄选择右边
  let index = ref(0) //决定是左边还是右边的下标
  let isindexTime = ref(false) // 决定我是否点击了确定按钮
  const selectionOrder = ref([
    'left',
    'right',
    'left',
    'left',
    'right',
    'right',
    'left',
    'left',
    'right',
    'right',
  ]) //左边还是右边
  return {
    isdisbale,
    flag,
    goyfilter,
    indexForbid,
    flagcomfirm,
    flags,
    selheroLeft,
    selheroRight,
    index,
    selectionOrder,
    isindexTime,
  }
})
