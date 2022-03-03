# cmyr-error-collection

# [1.4.0](https://github.com/CaoMeiYouRen/cmyr-error-collection/compare/v1.3.0...v1.4.0) (2022-03-03)


### ✨ 新功能

* 允许自定义 ajax 方式 ([5d2c720](https://github.com/CaoMeiYouRen/cmyr-error-collection/commit/5d2c720))

# [1.3.0](https://github.com/CaoMeiYouRen/cmyr-error-collection/compare/v1.2.11...v1.3.0) (2022-02-15)


### ✨ 新功能

* 更换底层 ajax 请求为 fetch，减少包体积 ([465446b](https://github.com/CaoMeiYouRen/cmyr-error-collection/commit/465446b))

## [1.2.11](https://github.com/CaoMeiYouRen/cmyr-error-collection/compare/v1.2.10...v1.2.11) (2022-01-28)


### 🐛 Bug 修复

* 修复 axios headers 默认值引发的全局污染问题 ([32f5cad](https://github.com/CaoMeiYouRen/cmyr-error-collection/commit/32f5cad))

## [1.2.10](https://github.com/CaoMeiYouRen/cmyr-error-collection/compare/v1.2.9...v1.2.10) (2022-01-28)


### 🐛 Bug 修复

* 移除 sourcemap ([206af24](https://github.com/CaoMeiYouRen/cmyr-error-collection/commit/206af24))

## [1.2.9](https://github.com/CaoMeiYouRen/cmyr-error-collection/compare/v1.2.8...v1.2.9) (2022-01-28)


### 🐛 Bug 修复

* 添加了兜底 message ([3368ba0](https://github.com/CaoMeiYouRen/cmyr-error-collection/commit/3368ba0))

## [1.2.8](https://github.com/CaoMeiYouRen/cmyr-error-collection/compare/v1.2.7...v1.2.8) (2022-01-25)


### 🐛 Bug 修复

* 更新 safe-json-type 版本 ([13c3d3a](https://github.com/CaoMeiYouRen/cmyr-error-collection/commit/13c3d3a))

## [1.2.7](https://github.com/CaoMeiYouRen/cmyr-error-collection/compare/v1.2.6...v1.2.7) (2022-01-25)


### 🐛 Bug 修复

* 修复 safe-json-type 在 Node.js 端的问题 ([2564638](https://github.com/CaoMeiYouRen/cmyr-error-collection/commit/2564638))

## [1.2.6](https://github.com/CaoMeiYouRen/cmyr-error-collection/compare/v1.2.5...v1.2.6) (2022-01-24)


### 🐛 Bug 修复

* 更新依赖；修复 safe-json-type 依赖被打包进来的 bug ([462b83e](https://github.com/CaoMeiYouRen/cmyr-error-collection/commit/462b83e))

## [1.2.5](https://github.com/CaoMeiYouRen/cmyr-error-collection/compare/v1.2.4...v1.2.5) (2022-01-24)


### 🐛 Bug 修复

* 修复 vueErrorHandler 的 this 指向不对的问题 ([ead27f7](https://github.com/CaoMeiYouRen/cmyr-error-collection/commit/ead27f7))

## [1.2.4](https://github.com/CaoMeiYouRen/error-collection/compare/v1.2.3...v1.2.4) (2022-01-20)


### 🐛 Bug 修复

* 修复 部分情况下 globalThis.process.on 和 globalThis.addEventListener 不是 function 的 Bug ([20e95e9](https://github.com/CaoMeiYouRen/error-collection/commit/20e95e9))

## [1.2.3](https://github.com/CaoMeiYouRen/error-collection/compare/v1.2.2...v1.2.3) (2021-11-25)


### 🐛 Bug 修复

* errorInfo 新增 uuid ([981b9ff](https://github.com/CaoMeiYouRen/error-collection/commit/981b9ff))

## [1.2.2](https://github.com/CaoMeiYouRen/error-collection/compare/v1.2.1...v1.2.2) (2021-11-17)


### 🐛 Bug 修复

* 新增 nodeVersion、uptime ([b55e986](https://github.com/CaoMeiYouRen/error-collection/commit/b55e986))

## [1.2.1](https://github.com/CaoMeiYouRen/error-collection/compare/v1.2.0...v1.2.1) (2021-11-15)


### 🐛 Bug 修复

* 优化错误上报逻辑 ([aa48c5e](https://github.com/CaoMeiYouRen/error-collection/commit/aa48c5e))

# [1.2.0](https://github.com/CaoMeiYouRen/error-collection/compare/v1.1.3...v1.2.0) (2021-11-15)


### ✨ 新功能

* 新增 vueErrorHandler；优化代码结构 ([e4fc400](https://github.com/CaoMeiYouRen/error-collection/commit/e4fc400))

## [1.1.3](https://github.com/CaoMeiYouRen/error-collection/compare/v1.1.2...v1.1.3) (2021-11-14)


### 🐛 Bug 修复

* 优化 Error 的格式化 ([1313a09](https://github.com/CaoMeiYouRen/error-collection/commit/1313a09))

## [1.1.2](https://github.com/CaoMeiYouRen/error-collection/compare/v1.1.1...v1.1.2) (2021-11-14)


### 🐛 Bug 修复

* 新增 初始化判断 ([04967a9](https://github.com/CaoMeiYouRen/error-collection/commit/04967a9))

## [1.1.1](https://github.com/CaoMeiYouRen/error-collection/compare/v1.1.0...v1.1.1) (2021-11-14)


### 🐛 Bug 修复

* 修复 在浏览器环境下的 process is not defined BUG ([8574e8b](https://github.com/CaoMeiYouRen/error-collection/commit/8574e8b))

# [1.1.0](https://github.com/CaoMeiYouRen/error-collection/compare/v1.0.4...v1.1.0) (2021-11-13)


### ✨ 新功能

* 采用 axios 替换 leancloud-storage，大幅减少包体积 ([558f4c3](https://github.com/CaoMeiYouRen/error-collection/commit/558f4c3))

## [1.0.4](https://github.com/CaoMeiYouRen/error-collection/compare/v1.0.3...v1.0.4) (2021-11-13)


### 🐛 Bug 修复

* 修改 browser 脚本；pushError 返回值必定为 Promise<boolean> ([24d2aab](https://github.com/CaoMeiYouRen/error-collection/commit/24d2aab))
* 新增 上报浏览器 Promise 异常 ([417468a](https://github.com/CaoMeiYouRen/error-collection/commit/417468a))

## [1.0.3](https://github.com/CaoMeiYouRen/error-collection/compare/v1.0.2...v1.0.3) (2021-11-12)


### 🐛 Bug 修复

* 优化 前端string Error；补充上报 location.href ([ac477a1](https://github.com/CaoMeiYouRen/error-collection/commit/ac477a1))

## [1.0.2](https://github.com/CaoMeiYouRen/error-collection/compare/v1.0.1...v1.0.2) (2021-11-11)


### 🐛 Bug 修复

* 修改包名为 cmyr-error-collection ([4013f31](https://github.com/CaoMeiYouRen/error-collection/commit/4013f31))

## [1.0.1](https://github.com/CaoMeiYouRen/error-collection/compare/v1.0.0...v1.0.1) (2021-11-11)


### 🐛 Bug 修复

* 修改 包名称 ([c0ac5d9](https://github.com/CaoMeiYouRen/error-collection/commit/c0ac5d9))

# 1.0.0 (2021-11-11)


### ✨ 新功能

* 完成主要功能开发 ([fcaa611](https://github.com/CaoMeiYouRen/error-collection/commit/fcaa611))
