<template>
  <button @click="addTodolist">添加</button>
</template>

<script setup>
const emits = defineEmits(['event-enter'])

function addTodolist () {
   emits('event-enter')
}
</script>

<style scoped>
button {
  border: 0;
  width: 90px;
  height: 48px;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  color: #667eea;
  background: #fff;
  cursor: pointer;
  transition: all 0.25s ease;
  letter-spacing: 1px;
}
button:hover {
  background: #f0f0ff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}
button:active {
  transform: translateY(0);
}
</style>
