<template>
  <button :disabled="btnforbids.isdisbale" @click="isforbids">确认</button>
</template>

<script setup>
import { btnForbid } from '@/stores/btn-forbid';
import { forbidStore } from '@/stores/forbid';
import { selectHero } from '@/stores/hero-select';
import { ref } from 'vue'
const btnforbids = btnForbid() //变量仓库
const forbid = forbidStore() //禁用默认图片数据仓库
const selheros = selectHero() // 默认英雄数据仓库
const p = defineProps(['mapherolist'])
const emit = defineEmits(['event-isClick'])
let bol = ref(true)
function isforbids() {
  btnforbids.isdisbale = true
  btnforbids.flag.push(btnforbids.goyfilter)
  if (btnforbids.indexForbid === null) {
    btnforbids.flagcomfirm.push(btnforbids.goyfilter)
    if (btnforbids.selectionOrder[btnforbids.index] === 'left') {
      selheros.heroSelectLeft[btnforbids.selheroLeft].img = p.mapherolist.get(btnforbids.goyfilter)
      btnforbids.selheroLeft++
    } else {
      selheros.heroSelectRight[btnforbids.selheroRight].img = p.mapherolist.get(btnforbids.goyfilter)
      btnforbids.selheroRight++
      if (btnforbids.selheroRight === selheros.heroSelectRight.length) {
        emit('event-isClick')
      }
    }
    btnforbids.index++
    return
  }
  if (btnforbids.indexForbid > forbid.LEftforbidInit.length - 1) {
    if (bol.value) {
      btnforbids.flags = false
      btnforbids.indexForbid = 0
      bol.value = false
    }
  }
  if (!btnforbids.flags) {
    forbid.RIGHTforbidInit[btnforbids.indexForbid].img = p.mapherolist.get(btnforbids.goyfilter)
  } else {
    forbid.LEftforbidInit[btnforbids.indexForbid].img = p.mapherolist.get(btnforbids.goyfilter)
  }
  btnforbids.indexForbid++

}
</script>

<style scoped>
button {
  width: 120px;
  height: 30px;
  border-radius: 0;
  outline: none;
  border: 0;
  background-image: linear-gradient(45deg, skyblue, rgb(6, 108, 136));
  font-size: 16px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 900;
  cursor: pointer;

}
</style>
