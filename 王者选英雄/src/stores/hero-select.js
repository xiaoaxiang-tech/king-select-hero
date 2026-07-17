import { ref } from 'vue'
import { defineStore } from 'pinia'
export const selectHero = defineStore('selectHero', () => {
  const heroSelectLeft = ref([
    {
      id: 1,
      img: '默认英雄.png',
    },
    {
      id: 2,
      img: '默认英雄.png',
    },
    {
      id: 3,
      img: '默认英雄.png',
    },
    {
      id: 4,
      img: '默认英雄.png',
    },
    {
      id: 5,
      img: '默认英雄.png',
    },
  ])
  const heroSelectRight = ref([
    {
      id: 6,
      img: '默认英雄.png',
    },
    {
      id: 7,
      img: '默认英雄.png',
    },
    {
      id: 8,
      img: '默认英雄.png',
    },
    {
      id: 9,
      img: '默认英雄.png',
    },
    {
      id: 10,
      img: '默认英雄.png',
    },
  ])
  return {
    heroSelectLeft,
    heroSelectRight,
  }
})
