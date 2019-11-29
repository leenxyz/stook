---
id: intro
title: 简介
sidebar_label: 简介
---

为了更好的编程体验，Stook 支持使用 Redux DevTools 调试。

## Install Redux DevTools extension

如果你未安装 Redux DevTools extension，请安装相应浏览器的插件：[Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)。

## Setup

使用 devtools 非常简单，先安装 `stook-devtools` 包：

```bash
npm i stook-devtools
```

然后在项目代码中进入，并初始化：

```js
import { devtools } from './devtools'

devtools.init()
```

如果你不想在生产环境引入：

```js
import { devtools } from './devtools'

if (process.env !== 'production') {
  devtools.init()
}
```

## 效果

生效后，可以在浏览器的 Redux DevTools extension 看到整个应用的 state 状态：

![devtools](/img/stook-devtools.png)
