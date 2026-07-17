<template>
  <div class="todolist">
    <div class="text">
      <p>{{ todolistData.content }}</p>
      <input type="text" v-show="todolistData.isshow" data-input="xiugai" :value="updateInputValue" @input="updateInput"
        @keydown.enter="updateTodolist" ref="RefInputFocus">
    </div>
    <div class="btns">
      <button @click="updateTodolist" data-btn="xiugai">修改</button>
      <button @click="delTodolist">删除</button>
    </div>
  </div>
</template>

<script setup>
import { useTemplateRef } from 'vue'
const p = defineProps(['todolistData', 'todolistIndex', 'updateInputValue'])
const emits = defineEmits(['event-delTodolist', 'event-input', 'event-updateTodolist'])
const RefInputFocus = useTemplateRef('RefInputFocus')

function delTodolist() {
  emits('event-delTodolist', p.todolistIndex)
}
// 更新数据
function updateTodolist() {
  emits('event-updateTodolist', {
    todolistIndex: p.todolistIndex,
    id: p.todolistData.id,
    inputFocus() {
      RefInputFocus.value.focus()
    }
  })
}

function updateInput(e) {
  emits('event-input', e.target.value)
}
</script>

<style scoped>
.todolist {
  width: 88%;
  min-height: 54px;
  background: #fff;
  margin: 6px 0;
  padding: 0 16px;
  box-sizing: border-box;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.todolist:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateX(2px);
}

.text {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  height: 54px;
  margin-right: 12px;

  p {
    width: 100%;
    font-size: 15px;
    color: #2d3748;
    font-weight: 500;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-all;
  }

  input {
    position: absolute;
    left: 0;
    width: 100%;
    height: 38px;
    outline: none;
    border: 2px solid #667eea;
    border-radius: 8px;
    font-size: 15px;
    color: #333;
    padding: 0 12px;
    box-sizing: border-box;
    background: #fafaff;
    transition: border-color 0.2s;
  }

  input:focus {
    border-color: #764ba2;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
  }
}

.btns {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;

  button {
    padding: 6px 16px;
    outline: none;
    border: 0;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  button:first-child {
    color: #fff;
    background: #667eea;
  }

  button:first-child:hover {
    background: #5a6fd6;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
  }

  button:last-child {
    color: #e53e3e;
    background: #fff5f5;
  }

  button:last-child:hover {
    background: #fed7d7;
    box-shadow: 0 2px 8px rgba(229, 62, 62, 0.25);
  }
}
</style>
