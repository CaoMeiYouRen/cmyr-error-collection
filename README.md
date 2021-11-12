# cmyr-error-collection

一个基于 leancloud 的简易全局错误捕获工具，会将未全局捕获的错误上报到 leancloud。



```ts
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
})

```

