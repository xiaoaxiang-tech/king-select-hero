<template>
  <div class="catainer">
    <div class="header">
      <pan-input :inputValue="inputValue" @event-input="eventInput" @event-enter="eventEnter"></pan-input>
      <pan-button @event-enter="eventEnter"></pan-button>
    </div>
    <div class="content">
      <div v-if="!proxyData.length" class="empty-state">暂无数据</div>
      <pan-content v-for="(item, index) in proxyData" :key="item.id" :todolistData="item" :todolistIndex="index"
        :updateInputValue="updateInputValue" @event-delTodolist="evenDeltodolist"
        @event-updateTodolist="eventUpdatetodolist" @event-input="eventInputUpdate"></pan-content>
    </div>
    <div class="footer">
      <panFooter :todolistData="proxyData"></panFooter>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onUnmounted } from 'vue';
import PanInput from '@/components/header/pan-input.vue';
import PanButton from '@/components/header/pan-button.vue';
import panContent from '@/components/content/pan-content.vue';
import panFooter from '@/components/footer/pan-footer.vue';

const proxyData = ref([])
const inputValue = ref('') // 这是添加框v-model
const updateInputValue = ref('')  //这是修改框的v-model
const recordTodolist = new Map() // 记录添加的文本
const recordInputShowState = []  // 记录修改输入框展示的状态
const recordUpdateNewOldIndex = [] // 记录修改的新老索引
function clearValue(inpval) {
  inpval.value = ''
}
function eventInput(value) {
  inputValue.value = value
}
// 当按下会车时
function downEnter() {
  proxyData.value.push({
    id: Date.now() + Math.floor(Math.random() * 1000),
    content: inputValue.value.trim(),
    isshow: false, //是否显示编辑框
  })
  if (!recordTodolist.has(inputValue.value.trim())) {
    recordTodolist.set(inputValue.value.trim(), true)
  }
}
function eventEnter() {
  if (!inputValue.value.trim() || recordTodolist.has(inputValue.value.trim())) {
    alert('输入框不能为空  或者  添加的代办清单已经重复了')
  } else {
    downEnter()
    clearValue(inputValue)
  }
}

// 删除todolist
function evenDeltodolist(indexs) {
  recordTodolist.delete(proxyData.value[indexs].content.trim())
  proxyData.value = proxyData.value.filter((item, index) => index !== indexs)
  if (indexs === recordInputShowState[0]) {
    recordInputShowState.pop()
    recordUpdateNewOldIndex.pop()
    clearValue(updateInputValue)
  } else if (indexs < recordInputShowState[0]) {
    recordInputShowState[0]--
    recordUpdateNewOldIndex[0].index--
  }
}

// 修改todolist
async function eventUpdatetodolist(obj) {
  if (!recordUpdateNewOldIndex.length) {
    recordUpdateNewOldIndex.push({
      id: obj.id,
      index: obj.todolistIndex
    })
  }
  // 有人了，后续修改要把关于这个人的isshow 设置为false 隐藏，并删掉他，加入新人
  if (recordInputShowState.length && updateInputValue.value.trim() && !recordTodolist.has(updateInputValue.value.trim())) {
    proxyData.value[recordInputShowState[0]].isshow = false
    recordTodolist.delete(proxyData.value[recordInputShowState[0]].content.trim())
    recordTodolist.set(updateInputValue.value.trim(), true)
    proxyData.value[recordInputShowState[0]].content = updateInputValue.value.trim()
    recordInputShowState.pop()
    clearValue(updateInputValue)
  } else {
    if (recordUpdateNewOldIndex[0].id !== obj.id) {
      proxyData.value[recordUpdateNewOldIndex[0].index].isshow = false
      recordInputShowState.pop()
      recordUpdateNewOldIndex[0].id = obj.id
      recordUpdateNewOldIndex[0].index = obj.todolistIndex
    }
    if (!recordInputShowState.length) {
      proxyData.value[obj.todolistIndex].isshow = true
      await nextTick()  // 等待dom 渲染完毕,因为vue dom 异步更新，而 obj.inputFocus() 是同步的，导致我的input 还没显示就聚焦。
      obj.inputFocus()
      recordInputShowState.push(obj.todolistIndex)
    }
  }
}

// 修改框的内容
function eventInputUpdate(value) {
  updateInputValue.value = value
}
// 点击编辑区域外部时关闭编辑框
function handleClickOutside(e) {
  if (!e.target.getAttribute('data-btn') && !e.target.getAttribute('data-input') && recordInputShowState.length) {
    proxyData.value[recordInputShowState[0]].isshow = false
    recordInputShowState.pop()
    recordUpdateNewOldIndex.pop()
    clearValue(updateInputValue)
  }
}
document.addEventListener('click', handleClickOutside)
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.catainer {
  width: 520px;
  min-height: 500px;
  background: #fff;
  margin: 40px auto;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .header {
    width: 100%;
    height: 80px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .content {
    flex: 1;
    min-height: 300px;
    max-height: 420px;
    padding: 16px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    background: #f8f9fc;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: #d0d5dd;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    scrollbar-width: thin;
    scrollbar-color: #d0d5dd transparent;

    .empty-state {
      margin-top: 100px;
      text-align: center;
      color: #b0b8c8;
      font-size: 15px;
      font-weight: 500;
      letter-spacing: 1px;
      user-select: none;

      &::before {
        content: '';
        display: block;
        width: 80px;
        height: 80px;
        margin: 0 auto 16px;
        background: linear-gradient(135deg, #e8ecf8, #f0e6f6);
        border-radius: 50%;
        position: relative;

        /* 剪贴板图标 */
        background-image:
          linear-gradient(#c4cde0 2px, transparent 2px),
          linear-gradient(#c4cde0 2px, transparent 2px),
          linear-gradient(#c4cde0 2px, transparent 2px);
        background-size: 28px 2px, 28px 2px, 18px 2px;
        background-position: center 26px, center 34px, center 42px;
        background-repeat: no-repeat;
      }

      &::after {
        content: '添加一条待办开始吧';
        display: block;
        font-size: 13px;
        color: #c4cde0;
        margin-top: 6px;
        letter-spacing: 0;
      }
    }
  }

  .footer {
    width: 100%;
    height: 60px;
    background: #fff;
    border-top: 1px solid #eef0f5;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
