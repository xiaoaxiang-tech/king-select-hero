import { ref } from "vue"
import { defineStore } from 'pinia'
export const classifyHero = defineStore('classify-hero', () => {
 const heroArr = ref([
  {
    id:1,
    name:'全部',
  },
  {
    id:2,
    name:'发育路',
  },
  {
    id:3,
    name:'游走',
  },
  {
    id:4,
    name:'中路',
  },
  {
    id:5,
    name:'对抗路',
  },
  {
    id:6,
    name:'打野',
  },
 ])
  return {
   heroArr
  }
})
