export const appData = [
  {
    img: "小红书",
    name: "小红书",
    title: "秋冬平价护肤清单，干敏皮闭眼入",
    content:
      "稚优泉修护面霜才89！上脸不黏腻，搭配珂润化妆水，换季泛红立马缓解～还有薇诺娜特护霜小样，出差带超方便，学生党直接抄作业！",
  },
  {
    img: "抖音",
    name: "抖音",
    title: "双十一直播间隐藏福利，这样抢省一半",
    content:
      '每晚8点头部主播直播间，发送"暗号抢券"领满500减200！数码类记得蹲整点秒杀，昨天抢到的耳机比旗舰店便宜300，附抢券倒计时截图～',
  },
  {
    img: "抖音",
    name: "抖音",
    title: "一人食晚餐合集，30分钟搞定还低脂",
    content:
      "今日分享番茄金针菇肥牛锅！肥牛卷焯水，番茄炒出沙加水煮，最后放金针菇和调料，热量低还饱腹～另外附上凉拌鸡胸肉做法，减脂期也能吃爽！",
  },
  {
    img: "微信",
    name: "微信",
    title: "平价小众包包分享，百元质感拉满",
    content:
      "pdd这家店铺绝了！棕色腋下包才69，皮质软乎乎，搭配大衣超有氛围感～还有黑色帆布托特包，容量能装电脑，通勤上学都合适，已回购两次！",
  },
  {
    img: "微信",
    name: "微信",
    title: "微信新功能实测，这些用法太实用",
    content:
      "最新版本支持聊天记录批量转发带原图啦！还有朋友圈分组编辑功能，发动态不用反复切换分组～附详细操作步骤，看完立马去更新！",
  },
  {
    img: "小红书",
    name: "小红书",
    title: "新手化妆避坑指南，化妆刷怎么选",
    content:
      "新手别买全套刷！散粉刷+眼影刷+眉刷这三支就够～推荐纤维毛材质，抓粉适中还容易清洗，几十块一套，比大牌平替性价比高太多！",
  },
  {
    img: "淘宝",
    name: "淘宝",
    title: "周末citywalk路线，小众不挤还出片",
    content:
      "本地宝整理的老城区路线！从巷口咖啡店出发，路过复古书店和老城墙，最后到江边公园，夕阳下拍照巨美，附具体导航定位和打卡点攻略～",
  },
  {
    img: "淘宝",
    name: "淘宝",
    title: "双十一囤货清单，家居好物低至5折",
    content:
      "全自动感应洗手液机才39！厨房防油贴纸10片9.9，还有无痕挂钩承重超强～记得叠加店铺券和平台满减，结算时自动打折，错过等一年！",
  },
  {
    img: "小红书",
    name: "小红书",
    title: "追剧必备小零食，好吃不胖",
    content:
      "魔芋爽酸辣味超开胃，每包热量才15大卡！还有冻干草莓脆，保留果香还不腻，看剧时不知不觉就吃完一包，已列入无限回购清单～",
  },
  {
    img: "小红书",
    name: "小红书",
    title: "宿舍书桌改造，低成本变温馨",
    content:
      "ins风桌布19.9，LED小串灯插电即亮，再加个分层收纳架，书本杂物全收纳～改造后学习效率都变高了，附链接避坑，宿舍党快冲！",
  },
];

export function createmsgVnode(randomIndex, strTime) {
  let messageVnode = {
    tag: "div",
    className: "msgbox",
    children: [
      {
        tag: "div",
        className: "msgboxheader",
        children: [
          {
            tag: "img",
            src: `./images/${appData[randomIndex].img}.png`,
            className: "msgboximg",
          },
          {
            tag: "span",
            className: "msgname",
            context: `${appData[randomIndex].name}`,
          },
          {
            tag: "span",
            className: "shuxian",
            context: `/`,
          },
          {
            tag: "span",
            className: "msgtime",
            context: `${strTime}`,
          },
        ],
      },
      {
        tag: "div",
        className: "msgboxcontent",
        children: [
          {
            tag: "p",
            className: "msgtitle",
            context: `${appData[randomIndex].title}`,
          },
          {
            tag: "p",
            className: "msgcontent",
            context: `${appData[randomIndex].content}`,
          },
        ],
      },
    ],
  };

  return messageVnode;
}
