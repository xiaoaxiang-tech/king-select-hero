<template>
  <p>目前有{{ todolistData.length }}条数据</p>
</template>

<script setup>
defineProps(['todolistData'])
</script>

<style scoped>
p {
  font-size: 14px;
  font-weight: 500;
  color: #8899aa;
  letter-spacing: 0.5px;
}
</style>
