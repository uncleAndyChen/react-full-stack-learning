# react 全家桶技术栈学习
* 本项目分享个人学习 react 全家桶技术栈的一些经验心得。
* 学习过程会结合相关示例代码，在实践中学习更有成效。
* 欢迎补充，可通过 fork + pull request 的方式，参与到该项目。

## 项目依赖及版本
* 用 Create React App 初始化项目
    ```
    npx create-react-app react-and-redux-demo
    ```
* 相关依赖均使用当前最新版（截止 2018-11-06 的最新版）。
    * react v16.6.0
    * redux v4.0.1
    * react-redux v5.1.0

# 项目地址
* [gitee](https://gitee.com/uncleAndyChen/react-full-stack-learning)
* [github](https://github.com/uncleAndyChen/react-full-stack-learning)

# 个人整理的相关知识点文档
1. [开发前的准备工作、相关知识储备](./doc/prepare.md)
1. [js 知识点、参考链接](./doc/js.md)
1. [redux 文档](./doc/redux.md)

# 参考
1. [《深入浅出React和Redux》代码](https://github.com/mocheng/react-and-redux)
1. [react 中文社区文档](https://react.docschina.org/docs/hello-world.html)
1. [Create React App official website,Getting Started](https://facebook.github.io/create-react-app/docs/getting-started)

# master 分支
为 Create React App 初始化项目，之后的练习代码都会体现到这个分支。  
针对《深入浅出React和Redux》一书中，某一个被挑选的例子，完成之后，会创建一个相应的分支。  

# 获取（切换至）某分支
以分支 branchName 为例，切换到该分支并拉取最新代码
```
git checkout branchName
git pull
```

# 结合《深入浅出React和Redux》例子代码学习
第一章代码位于 chapter-01，第二章的代码位于  chapter-02，依次类推。  
子目录名即为分支名，如第四章代码目录下的子目录：`todo_controlled_component`，会有一个对应分支也叫 `todo_controlled_component`。

# PropTypes 依赖变化
react 的类型检查 PropTypes 自 React v15.5 起已弃用，请使用 prop-types。
《深入浅出React和Redux》一书示例代码使用的 react 是 15.4.1 版本，需要调整 PropTypes 的引用：
```
// 书中的代码是
import { PropTypes } from 'react';
// 要改为：
import PropTypes from 'prop-types';
```

扩展阅读：[使用 PropTypes 进行类型检查](https://react.docschina.org/docs/typechecking-with-proptypes.html)

# 第二章
## 分支 controlpanel
### 知识点
1. 组件。
1. 组件的 state、props。
1. 父组件通过 props 向子组件传递数据。

## 分支 controlpanel_with_summary
### 知识点
1. 组件的 props，父组件向子组件传递数据，包括传递函数。
1. 子组件通过调用父组件的函数，来达到向父组件传递数据的目的。

# 第三章
## 分支 react-redux
到项目根目录，添加 redux 和 react-redux 依赖。  
以下操作会添加最新版的 redux（截止 2018-11-06，版本为：4.0.1） 和 react-redux（截止 2018-11-06，版本为：5.1.0）
```
cnpm i redux --save
cnpm i react-redux --save
```
如果不事先添加 redux 依赖而直接添加 react-redux 依赖，会有警告：
```
peerDependencies WARNING react-redux@* requires a peer of redux@^2.0.0 || ^3.0.0 || ^4.0.0-0 but none was installed
```

### 知识点
1. UI 组件（presentational component）（傻瓜组件） 
1. 容器组件（container component）
1. 应用 redux 的三大原则
1. React-Redux 库
    * connect(mapStateToProps, mapDispatchToProps)
    * mapStateToProps
    * mapDispatchToProps

相关知识点，已经总结到文档：[redux 文档](./doc/redux.md)
