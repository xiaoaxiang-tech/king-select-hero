import { createmsgVnode, appData } from "./data.js";
import { renderMessage } from "./utils.js";
console.log(111111111);

const phone = document.querySelector(".phone");
const phonemask = document.querySelector(".phonemask");
const msgfather = document.querySelector(".msgfather");
const delAllmsg = document.querySelector(".delAllmsg");
let randomIndex = 0;
let strTime = 0;
let flag = false;
let msgSave = null;
let msgObj = {
  msgWidth: 0,
  msgElement: 0,
};
let msgMoveTotal = 0;
let initMsgNum = 5; //消息的条数
let delay = 0; //动画延时
function timeStrFun() {
  // 创建当前时间的 Date 实例
  const now = new Date();

  // 获取时、分、秒
  const hours = now.getHours(); // 小时（0-23）
  const minutes = now.getMinutes(); // 分钟（0-59）
  const seconds = now.getSeconds(); // 秒（0-59）

  // 格式化：补零为两位数
  const formattedHours = String(hours).padStart(2, "0"); // 如 8 → "08"
  const formattedMinutes = String(minutes).padStart(2, "0"); // 如 5 → "05"
  const formattedSeconds = String(seconds).padStart(2, "0"); // 如 3 → "03"

  // 组合为 "时:分:秒" 格式
  const timeStr = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  return timeStr;
}

// 移动删除信息
function DelMsg(e, elementMove) {
  e.stopPropagation();
  e.preventDefault();
  document.onmousemove = (e) => {
    MsgMove(e, elementMove);
  };
}

function MsgMove(e, elementMove) {
  let xNum = e.movementX;
  msgMoveTotal += xNum;
  elementMove.style.transform = `translateX(${msgMoveTotal}px)`;
}
// 消息初始化

function msgInit() {
  for (let i = 0; i < initMsgNum; i++) {
    randomIndex = Math.floor(Math.random() * appData.length);
    strTime = timeStrFun();
    msgfather.appendChild(renderMessage(createmsgVnode(randomIndex, strTime)));
  }
  const msgboxSmaks = document.querySelectorAll(".phonemask .msgbox");
  for (let i = 0; i < msgboxSmaks.length; i++) {
    msgboxSmaks[i].addEventListener("mousedown", (e) => {
      msgboxSmaks[i].style.transition = "none";
      msgObj.msgWidth = msgboxSmaks[i].offsetWidth;
      msgObj.msgElement = msgboxSmaks[i];
      DelMsg(e, msgboxSmaks[i]); //移动信息函数
    });
  }
}
// 按钮禁用
function btnIsDisabled() {
  const msgboxSmaks = document.querySelectorAll(".phonemask .msgbox");
  if (!msgboxSmaks.length) {
    delAllmsg.disabled = true; //按钮禁用
  }
}
// 消息是否可以被删除
function isMsgDel() {
  document.onmousemove = null;
  let { msgWidth, msgElement } = msgObj;
  if (msgWidth) {
    let halfmsgWidth = Math.floor(msgWidth / 4);
    if (msgMoveTotal <= -halfmsgWidth) {
      msgElement.style.transform = `translateX(-100%)`;
      msgElement.style.transition = `all .3s`;
      msgElement.addEventListener("transitionend", () => {
        msgElement.remove();
        msgMoveTotal = 0;
        btnIsDisabled()
      });
    }

    if (msgMoveTotal < 0 && msgMoveTotal > -halfmsgWidth) {
      msgElement.style.transform = `translateX(0)`;
      msgElement.style.transition = `all .3s`;
      msgMoveTotal = 0;
    }
    if (msgMoveTotal >= halfmsgWidth) {
      msgElement.style.transform = `translateX(100%)`;
      msgElement.style.transition = `all .3s`;
      msgElement.addEventListener("transitionend", () => {
        msgElement.remove();
        msgMoveTotal = 0;
        btnIsDisabled()
      });
    }
    if (msgMoveTotal > 0 && msgMoveTotal < halfmsgWidth) {
      msgElement.style.transform = `translateX(0%)`;
      msgElement.style.transition = `all .3s`;
      msgMoveTotal = 0;
    }
  }
}

msgInit();
phone.addEventListener("mousedown", isMaskFun);

phonemask.addEventListener("mousedown", isMaskFun);

function isMaskFun(e) {
  e.stopPropagation();
  phonemask.style.transition = "none";
  let ismove = e.pageY - phone.offsetTop <= 30;
  if (ismove || flag) {
    document.addEventListener("mousemove", phonemaskmoveFun);
  }
}
let maskMoveTotal = phonemask.offsetTop;
let TopMaxMovedistance = phone.offsetHeight * 0.9; //从上往下滑最大
let BottomMovedistance = phone.offsetHeight * 0.1; //从下往上滑最大
function phonemaskmoveFun(e) {
  e.preventDefault();
  maskMoveTotal += e.movementY;
  if (maskMoveTotal >= 0) {
    maskMoveTotal = 0;
  } else if (maskMoveTotal <= -phonemask.offsetHeight) {
    maskMoveTotal = -phonemask.offsetHeight;
  }
  phonemask.style.top = maskMoveTotal + "px";
}
// 鼠标弹起时
function cancelMaskMove(e) {
  e.preventDefault();
  document.removeEventListener("mousemove", phonemaskmoveFun);
  maxminMoveDistance();

  isMsgDel();
}
function maxminMoveDistance() {
  if (flag) {
    if (maskMoveTotal <= -BottomMovedistance) {
      maskMoveTotal = -phonemask.offsetHeight;
      phonemask.style.transition = "all .3s";
      phonemask.style.top = maskMoveTotal + "px";
      flag = false;
    } else {
      maskMoveTotal = 0;
      phonemask.style.transition = "all .3s";
      phonemask.style.top = maskMoveTotal + "px";
      flag = true;
    }
  } else {
    if (maskMoveTotal >= -TopMaxMovedistance) {
      maskMoveTotal = 0;
      phonemask.style.transition = "all .3s";
      phonemask.style.top = maskMoveTotal + "px";
      flag = true;
    } else {
      maskMoveTotal = -phonemask.offsetHeight;
      phonemask.style.transition = "all .3s";
      phonemask.style.top = maskMoveTotal + "px";
      flag = false;
    }
  }
}

document.addEventListener("mouseup", cancelMaskMove);

// 消息广播 每个一段时间自动发送一条消息
function getRandom10To20MinutesMs() {
  const min = 0.5 * 60 * 100; // 10分钟的毫秒数：10*60秒*1000毫秒
  const max = 1 * 60 * 100; // 20分钟的毫秒数：20*60秒*1000毫秒
  // 生成min到max之间的随机整数（包含min和max）
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let autoplayTime = getRandom10To20MinutesMs();

// 保存弹出的消息以便后续加到蒙层后面

const informmsg = new Audio("./audio/通知.mp3");
// 每隔一段时间发送一条消息
setInterval(() => {
  delAllmsg.disabled = false; //按钮解禁
  randomIndex = Math.floor(Math.random() * appData.length);
  strTime = timeStrFun();
  phone.appendChild(renderMessage(createmsgVnode(randomIndex, strTime)));
  msgSave = renderMessage(createmsgVnode(randomIndex, strTime));
  const phonemsg = document.querySelector(".phone>.msgbox");
  phonemsg.offsetHeight; // 强行渲染
  phonemsg.style.transform = "translateY(0)";
  // 并且给下拉蒙层增加一条信息
  msgfather.appendChild(msgSave);
  const msgboxAll = document.querySelectorAll(".msgfather .msgbox");
  for (let i = 0; i < msgboxAll.length; i++) {
    msgboxAll[i].onmousedown = (e) => {
      e.stopPropagation();
      e.preventDefault();
      //不用铲除点击事件因为他会覆盖前一个点击事件
      msgboxAll[i].style.transition = "none";
      msgObj.msgWidth = msgboxAll[i].offsetWidth;
      msgObj.msgElement = msgboxAll[i];
      DelMsg(e, msgboxAll[i]); //移动信息函数
    };
  }
  //   播放通知的声音
  informmsg.play();
  //   重置广播随机时间
  autoplayTime = getRandom10To20MinutesMs();

  setTimeout(() => {
    phonemsg.style.transform = "translateY(-100%)";
    phonemsg.addEventListener("transitionend", () => {
      phonemsg.remove();
    });
  }, 2000);
}, autoplayTime)

// 删除所有信息函数
function trueDelMsgFun() {
  const msgboxSmaks = document.querySelectorAll(".phonemask .msgbox");
  // 由于是从后往前面运行动画所以反过来遍历
  for (let i = msgboxSmaks.length - 1; i >= 0; i--) {
    msgboxSmaks[i].classList.add("slide-animation");

    msgboxSmaks[i].style.animationDelay = `${delay}s`;
    delay += 0.2;
    msgboxSmaks[i].addEventListener("animationend", () => {
      msgboxSmaks[i].remove()
    });
  }
  // 将延时复原
  delay = 0;
  delAllmsg.disabled = true; //按钮禁用
}
function delAllmsgFun(e) {
  e.stopPropagation();
  e.preventDefault();
  delAllmsg.addEventListener("click", trueDelMsgFun);
}
delAllmsg.addEventListener("mousedown", delAllmsgFun);
