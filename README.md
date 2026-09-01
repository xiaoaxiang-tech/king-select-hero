# 🎮 王者选英雄 · 王者荣耀选英雄模拟器

一个仿《王者荣耀》排位赛 **禁用（BP）→ 双方轮流选英雄 → 对局加载** 全流程的 Web 全栈项目。

前端基于 **Vue 3**，后端基于 **Node.js + Express**，数据与图片均来自腾讯官方接口（后端代理转发）。

## ✨ 功能特性

- 完整还原排位赛 **BP 禁用流程**：红蓝双方各 5 个禁用位，已禁用英雄置灰不可选
- **红蓝双方轮流选英雄**，每轮倒计时，结束后自动进入对局加载页
- **对局加载动画**：双方已选英雄依次滑入屏幕
- **英雄搜索 + 分路分类**（全部 / 发育路 / 游走 / 中路 / 对抗路 / 打野）
- **虚拟列表渲染**：英雄列表只渲染可视区域，滚动流畅不卡顿
- **图片服务端实时压缩**（Sharp 缩放 + WebP）：原图 MB 级 → 缩略图 KB 级，加载更快

## 🛠 技术栈

- **前端**：Vue 3（Composition API）· Pinia · Vue Router · Vite · Axios · Less
- **后端**：Node.js · Express · Sharp

## 📁 目录结构

```
├── src/                      # 前端源码（页面 / 组件 / Store / 工具函数）
├── 王者选英雄/
│   └── nodejs/               # 后端服务（Express）
│       └── app.js
```

## 🚀 快速开始

> 环境要求：Node.js ≥ 20.19（推荐 22+）

### 1. 启动后端（端口 3000）

```bash
cd 王者选英雄/nodejs
npm install
npm start
```

### 2. 启动前端

在项目根目录打开新终端：

```bash
npm install
npm run dev
```

### 3. 访问

浏览器打开 http://localhost:5173 即可体验。

## ⚙️ 环境变量（可选）

| 变量 | 说明 | 默认值 |
| --- | --- | --- |
| `VITE_API_BASE` | 后端接口地址 | `http://localhost:3000` |

## 📦 生产构建

```bash
npm run build
```

## 🔗 数据来源

- 英雄数据：`https://pvp.qq.com/zlkdatasys/heroskinlist.json`（腾讯官方，由后端 `/render` 代理转发）
- 英雄图片：由后端 `/image` 代理并实时压缩后返回
