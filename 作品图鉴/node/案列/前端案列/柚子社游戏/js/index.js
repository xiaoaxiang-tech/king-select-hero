const imgs = document.querySelectorAll(".header ul li img");
//音频数组
const audioArr = [
  "丛雨语音1",
  "妃爱语音1",
  "夏目语音1",
  "天音语音1",
  "宁宁语音1",
  "美咕噜语音1",
  "弥荣语音1",
];
// hover图片
const imageHoverArr = [
  undefined,
  undefined,
  "夏目hover",
  "天音hover",
  undefined,
  "美咕噜hover",
  "弥荣hover",
];
// 图片
const imageArr = ["丛雨", "妃爱", "夏目", "天音", "宁宁", "美咕噜", "弥荣"];

/**处理音频的函数 */
function audioFun(i) {
  let audio = new Audio(`./audios/${audioArr[i]}.mp3`);
  audio.play();
}
/**移入图片切换 */
function hoverImg(i) {
  if (imageHoverArr[i] === undefined) return;
  imgs[i].src = `./imgs/${imageHoverArr[i]}.jpg`;
}

/**移出图片复原 */
function outImg(i) {
  imgs[i].src = `./imgs/${imageArr[i]}.jpg`;
}

for (let i = 0; i < imgs.length; i++) {
  imgs[i].addEventListener("click", () => {
    audioFun(i);
  });
  imgs[i].addEventListener("mouseover", () => {
    hoverImg(i);
  });
  imgs[i].addEventListener("mouseout", () => {
    outImg(i);
  });
}

// 获取模式按钮
const btn = document.querySelectorAll("button");

// 初始化卡片
let audioRandom = null; //音频随机
let newAudioRandomArr = []; //图片下标

// 初始化
function CartInit(num, element, cardNum = imageArr.length) {
  //随机播放声音
  const newAudioArr = [...audioArr];
  newAudioArr.splice(cardNum);
  audioRandom = Math.floor(Math.random() * newAudioArr.length);
  newAudioRandomArr = []; //我图片的下标

  let audios = new Audio(`../audios/${newAudioArr[audioRandom]}.mp3`);
  audios.play();

  //   处理图片
  const newImageArr = [...imageArr]; //处理新数组不会修改原数组
  newImageArr.splice(cardNum);

  let numArr = new Array(num).fill(null);
  numArr = numArr
    .map((item, index) => {
      let randomImg = Math.floor(Math.random() * newImageArr.length);
      newAudioRandomArr.push(randomImg);

      return `
    <div>
     <img src="./imgs/${newImageArr[randomImg]}.jpg" alt="">
    </div>
    `;
    })
    .join("");

  element.innerHTML = numArr;
  //   console.log(newAudioRandomArr);
  for (let i = 0; i < newAudioRandomArr.length; i++) {
    
    element.children[i].addEventListener("click", () => {
        
      disposeImg(i, element.children[i], newAudioRandomArr[i]);
    });
  }      
}
// 点击图片后进行一些处理
let count = 0;

// 统计图片对应音频数量函数
function statistics() {
  // 拿到对应音频的图片
  for (let i = 0; i < newAudioRandomArr.length; i++) {
    if (newAudioRandomArr[i] === audioRandom) count++;
  }
}
let arrIndex = []; //存储自定义属性判断是否点击了同一张图片

//判断一个数是否在数组里面出现了两次
function RepetitionFun(arrIndex, index) {
  // console.log(arrIndex,index);

  if (arrIndex.includes(index)) {
    return true;
  }
  arrIndex.push(index);
  return false;
}
function disposeImg(i, element, audioElement) {
  //   没有自定义属性的情况下我才设置
  if (!element.hasAttribute("index")) {
    element.setAttribute("index", i);
  }

  if (newAudioRandomArr[i] === audioRandom) {
    // 处理点击两次的情况
    let index = element.getAttribute("index");

    // 发现点击重复的图片 什么都不干
    if (RepetitionFun(arrIndex, index)) return;
    // 播放点击图片对应音频
    let audios = new Audio(`../audios/${audioArr[audioElement]}.mp3`);
    audios.play();

    element.classList.add("active1");
    count--;
    // 对应图片选光了
    if (count === 0) {
      alert("你赢了");
      clearFun();
    }
  } else {
    element.classList.add("active2");
    alert("很遗憾你失败了");
    clearFun();
  }
}
// 检测是否有对应语音的图片
function checkedAudio(num, element, cardNum = imageArr.length) {
  while (!newAudioRandomArr.includes(audioRandom)) {
    CartInit(num, element, (cardNum = imageArr.length));
    statistics(); //统计
  }
}
// 隐藏container
let CardELement = null; //卡片容器
function isShowContainer(element) {
  CardELement = element;
  container.style.display = "none";
  element.style.display = "block";
}

/**用时多少函数 */
const timesSpan = document.querySelectorAll(".times");

let timer = null;
function TimeFun(element) {
  clearInterval(timer);
  let h = 0; //时
  let m = 0; //分
  let s = 0; //秒
  element.innerHTML = `0${h}:0${m}:0${s}`;
  timer = setInterval(() => {
    s++;
    if (s > 59) {
      s = 0;
      m++;
      if (m > 59) {
        h++;
        m = 0;
      }
    }
    let zoreTime = (time) => (time < 10 ? "0" + time : time); //给我时间让我来看看你是不是需要补零
    element.innerHTML = `${zoreTime(h)}:${zoreTime(m)}:${zoreTime(s)}`;
  }, 1000);
}

//清理函数
function clearFun() {
  container.style.display = "block";
  CardELement.style.display = "none";
  count = 0;
  arrIndex = [];
}
//简单模式
const easyCart = document.querySelector(".easyContainer .tabConTrol");
const easyContainer = document.querySelector(".easyContainer");
const container = document.querySelector(".container");
btn[0].addEventListener("click", () => {
  TimeFun(timesSpan[0]);
  isShowContainer(easyContainer); //隐藏container
  CartInit(9, easyCart, 3);
  statistics();
  checkedAudio(9, easyCart, 3);
});

//困难模式
const diffCart = document.querySelector(".diffContainer .tabConTrol");
const diffContainer = document.querySelector(".diffContainer");
btn[1].addEventListener("click", () => {
  TimeFun(timesSpan[1]);
  isShowContainer(diffContainer);
  CartInit(49, diffCart);
  statistics();
  checkedAudio(49, diffCart);
});
