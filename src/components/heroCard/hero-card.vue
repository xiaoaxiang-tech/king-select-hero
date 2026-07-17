<template>
  <div class="heroCard" @click="heroclassify(index)" :class="{ active: index === heroindex }" ref="herocard">
    {{ heroArr.name }}
  </div>
</template>

<script setup>
import { ref,useTemplateRef } from 'vue'
defineProps(['heroArr', 'index', 'heroindex'])
const herocard = useTemplateRef('herocard')
const emit = defineEmits(['iscart-event'])
function heroclassify(index) {
  let text = herocard.value.textContent
  emit('iscart-event',index,text)
}
</script>

<style scoped>
.heroCard {
  width: calc(100% / 6);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  font-family: 'Courier New', Courier, monospace;
  color: #fff;
  cursor: pointer;
  transition: all .3s;
}

.heroCard:hover {
  background-color: red;
}

.active {
  background-color: red;
}
</style>
