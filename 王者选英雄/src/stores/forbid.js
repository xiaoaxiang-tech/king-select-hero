import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const forbidStore = defineStore('forbid', () => {
  const LEftforbidInit = ref([
    {
      id: 1,
      img: '禁止.png',
      flag: false,
    },
    {
      id: 2,
      img: '禁止.png',
      flag: false,
    },
    {
      id: 3,
      img: '禁止.png',
      flag: false,
    },
    {
      id: 4,
      img: '禁止.png',
      flag: false,
    },
    {
      id: 5,
      img: '禁止.png',
      flag: false,
    },
  ])
  const RIGHTforbidInit = ref([
    {
      id: 6,
      img: '禁止.png',
      flag: false,
    },
    {
      id: 7,
      img: '禁止.png',
      flag: false,
    },
    {
      id: 8,
      img: '禁止.png',
      flag: false,
    },
    {
      id: 9,
      img: '禁止.png',
      flag: false,
    },
    {
      id: 10,
      img: '禁止.png',
      flag: false,
    },
  ])
  return {
    LEftforbidInit,
    RIGHTforbidInit
  }
})
