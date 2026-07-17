import { computed, ref, reactive } from "vue";

// 显示图片
export function UrlImg(imgUrl, fileStr) {
  return new URL(`../assets/${fileStr}/${imgUrl}`, import.meta.url).href;
}

// 滚动图片公共的代码
export function prevnext(moveElement, container, index) {
  let containerWidth = ref(container.offsetWidth);
  let distance = computed(() => {
    return index.value * containerWidth.value;
  });

  moveElement.style.transform = `translateX(-${distance.value}px)`;
}
//上一张图片
export function preview(moveElement, container, index) {
  index.value--;
  prevnext(moveElement, container, index);
}

//下一张图片
export function nextview(moveElement, container, index) {
  index.value++;
  prevnext(moveElement, container, index);
}

// 每张图片阻尼的最大距离
function getMaxDistance(boxUl) {
  let maxDistanceArr = reactive([]);
  for (let i = 0; i < boxUl.value.length; i++) {
    let maxDistance = computed(() => {
      return -(i * boxUl.value[0].offsetWidth - boxUl.value[0].offsetWidth / 2);
    });
    maxDistanceArr.push(maxDistance.value);
  }
  return maxDistanceArr;
}
// 鼠标移动轮播图图片
export function mouseMoveImg(moveElement, boxUl, event, sum) {
  let x = event.movementX;
  // console.log(sum.value); //移动的距离
  let j = ref(0);
  let moveX = computed(() => {
    return (sum.value += x);
  });
  for (let i = 0; i < getMaxDistance(boxUl).length; i++) {
    if (sum.value < getMaxDistance(boxUl)[i]) {
      j.value = i;
    }
  }
  moveElement.style.transform = `translateX(${moveX.value}px)`;
  return j;
}
