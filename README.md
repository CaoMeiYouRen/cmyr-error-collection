<h1 align="center">cmyr-error-collection </h1>
<p>
  <a href="https://www.npmjs.com/package/cmyr-error-collection" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/cmyr-error-collection.svg">
  </a>
  <a href="https://github.com/CaoMeiYouRen/error-collection/actions?query=workflow%3ARelease" target="_blank">
    <img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/CaoMeiYouRen/error-collection/release.yml?branch=master" /></a>
  <img alt="node-current"  src="https://img.shields.io/node/v/cmyr-error-collection" />
  <a href="https://github.com/CaoMeiYouRen/error-collection" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/CaoMeiYouRen/error-collection/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>
> 一个基于 leancloud 的简易全局错误捕获工具，会将未全局捕获的错误上报到 leancloud。
>
> 也可以自定义上报的地址。

### 🏠 [主页](https://github.com/CaoMeiYouRen/error-collection)


## 依赖要求

- node >=12

## 安装

```sh
yarn install
```

## 使用

```typescript
// Node 端
// cjs 版本
const { ErrorCollection } = require('cmyr-error-collection') // index.js
// esm 版本
import { ErrorCollection } from 'cmyr-error-collection' // index.esm.js

//浏览器端
// 非 esm 版本 index.umd.js 
// <script src="./index.umd.js">
const ErrorCollection = window.CmyrErrorCollection.ErrorCollection
// esm 版本 index.esm.browser.js  <script type="module">
import { ErrorCollection } from './index.esm.browser.js'


ErrorCollection.init({
    projectName: '测试browser',
    appId: 'xxxxx',
    appKey: 'yyyy',
    // createObjectURL?: string。提交数据的地址，例如 https://api.example.com/1.1/classes/ErrorInfo。该地址为最高优先级，可自定义地址，然后处理提交的数据。提交方式为 POST
})
```

## 作者


👤 **CaoMeiYouRen**

* Website: [https://blog.cmyr.ltd/](https://blog.cmyr.ltd/)
* GitHub: [@CaoMeiYouRen](https://github.com/CaoMeiYouRen)

## 🤝贡献

欢迎 Contributions, issues and feature!<br />如有问题请查看 [issues page](https://github.com/CaoMeiYouRen/error-collection/issues). 

## 支持

如果觉得这个项目有用的话请给一颗⭐️，非常感谢

## 📝 License

Copyright © 2021 [CaoMeiYouRen](https://github.com/ CaoMeiYouRen).<br />
This project is [MIT](https://github.com/CaoMeiYouRen/error-collection/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
