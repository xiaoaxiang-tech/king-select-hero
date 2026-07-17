export function getUniqueStr() {
  // 时间戳（毫秒级，确保基础唯一性） + 随机数（0-9999，避免同毫秒重复）
  return Date.now() + '-' + Math.floor(Math.random() * 10000)
}

// 清空输入框
export function isClearInput(value) {
  if (typeof value.value === 'object') {
    for (let k in value.value) {
      value.value[k] = ''
    }
  } else {
    value.value = ''
  }
}

// 往页面添加一个dom元素
export function addDom(InputData, inputVal) {
  InputData.value.push({
    id: getUniqueStr(),
    context: inputVal.value,
    y:0,
    x:0,
    speed: 5,
  })
}

export const getRandomNum = (min, max) => {
  // 处理min > max的情况，自动交换值，避免生成负数范围
  if (min > max) [min, max] = [max, min]
  // 核心公式：生成[min, max]闭区间随机整数
  return Math.floor(Math.random() * (Math.floor(max) - Math.floor(min) + 1)) + Math.floor(min)
}
