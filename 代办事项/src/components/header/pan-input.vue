<template>
  <input type="text" placeholder="请输入添加的内容" :value="inputValue" @input="handleInput" @keydown.enter="enter">
</template>

<script setup>
defineProps(['inputValue'])
const emits = defineEmits(['event-input', 'event-enter'])

function handleInput(e) {
  emits('event-input', e.target.value)
}

function enter() {
  emits('event-enter')

}

</script>

<style scoped>
input {
  width: 68%;
  height: 48px;
  padding: 0 18px;
  outline: none;
  border: 2px solid transparent;
  border-radius: 24px;
  font-size: 15px;
  color: #333;
  background: rgba(255, 255, 255, 0.95);
  transition: all 0.25s ease;
  box-sizing: border-box;
}
input::placeholder {
  color: #aab;
  font-size: 14px;
}
input:focus {
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.2);
  background: #fff;
}
</style>
