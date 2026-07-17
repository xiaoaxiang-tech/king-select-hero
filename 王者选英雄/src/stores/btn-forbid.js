import { ref } from 'vue'
import { defineStore } from 'pinia'
export const btnForbid = defineStore('btn-forbid', () => {
  let isdisbale = ref(true)
  let flag = ref([])
  let flagcomfirm = ref([])
  let goyfilter = ref(null) //英雄是否被禁用（选择时）
  let indexForbid = ref(0) //禁用英雄下标
  let flags = ref(true) // 是否禁用右边
  let selheroLeft = ref(-1) //英雄选择左边
  let selheroRight = ref(-1) //英雄选择右边
  return {
    isdisbale,
    flag,
    goyfilter,
    indexForbid,
    flagcomfirm,
    flags,
    selheroLeft,
    selheroRight,
  }
})
