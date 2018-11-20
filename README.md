# react 全家桶技术栈学习 + 示例代码
* 本项目主要针对 react 全家桶技术栈，以学习、演示基础代码为目的，欢迎补充知识点与相关示例代码。
* 可通过 fork + pull request 的方式，参与到该项目。
* 目前是以《深入浅出React和Redux》这本书中的[例子代码](https://github.com/mocheng/react-and-redux)为基础，实际操作和演练，最后总结知识点。
* 以后会添加更多知识点的学习心得。

* 项目技术框架
    * 用 Create React App 初始化项目
        ```
        npx create-react-app react-and-redux-demo
        ```
    * 相关依赖均使用当前最新版（截止 2018-11-06 的最新版）。
        * react v16.6.0
        * redux v4.0.1
        * react-redux v5.1.0

# 如何参与项目，如何提交 PR？
以下是两大平台的帮助文档。
* gitee.com  -> [Fork + Pull 模式 ](https://gitee.com/help/articles/4128)
* github.com -> [Creating a pull request from a fork](https://help.github.com/articles/creating-a-pull-request-from-a-fork/)

# 项目地址
* [gitee](https://gitee.com/elsafly/react-and-redux-demo)
* [github](https://github.com/uncleAndyChen/react-and-redux-demo)

# 个人整理的相关知识点文档
1. [开发前的准备工作、相关知识储备](./doc/prepare.md)
1. [js 知识点、参考链接](./doc/js.md)
1. [redux 知识点](./doc/redux.md)
1. [React 项目调试技巧](./doc/debug.md)
1. [堪比 Java 代码调试的方案：用 WebStorm + JetBrains IDE Support 插件，在 WebStorm 内调试代码](./doc/JetBrainsIDESupport.md)
1. [redux 官方示例 todomvc 中的 todoList 过滤事件解析](./doc/examplesTodomvcGetVisibleTodos.md)
1. [redux 官方示例 todomvc 两个警告修复](./doc/examplesTodomvcWarningsFixed.md)

# 分支说明
用 Create React App 初始化项目，所有练习代码都会体现到 master 分支。  
针对《深入浅出React和Redux》一书中，某一个被挑选的例子，完成之后，会创建一个相应的分支。  
针对某一个知识点，也会作类似的操作：即，完成练习之后，记录相关知识点，提交 master，然后从 master 创建一个分支。  

# 获取（切换至）某分支
以分支 branchName 为例，切换到该分支并拉取最新代码
```
git checkout branchName
git pull
```

# 相关分支文档
1. [《深入浅出React和Redux》例子代码](./doc/reactAndReduxBook.md)
