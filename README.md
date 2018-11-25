# react 练习项目
使用 react 16.6.0（截止 2018-11-05 的最新版）。      
用 Create React App 初始化项目：  
```
npx create-react-app react-and-redux-demo
```
然后以《深入浅出React和Redux》这本书中的例子代码为基础，实际操作和演练。

# 相关文档
1. [开发前的准备工作、相关知识储备](./doc/prepare.md)
1. [js 知识点、参考链接](./doc/js.md)

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

# 例子代码
第一章代码位于 chapter-01，第二章的代码位于  chapter-02，依次类推。  
子目录名即为分支名，如第四章代码目录下的子目录：`todo_controlled_component`，会有一个对应分支也叫 `todo_controlled_component`。

# 第二章
## 分支 controlpanel
### 知识点
1. 组件。
1. 组件的 state、props。
1. 父组件通过 props 向子组件传递数据。

### note
该示例为计数器，其中 PropTypes 的依赖有变化，需要做调整。  
react 的类型检查 PropTypes 自 React v15.5 起已弃用，请使用 prop-types。  
书中的例子代码，使用的 react 是 15.4.1，使用方式是：`import { PropTypes } from 'react'`;    
要改为：`import PropTypes from 'prop-types';`

扩展阅读：[使用 PropTypes 进行类型检查](https://react.docschina.org/docs/typechecking-with-proptypes.html)

## 分支 controlpanel_with_summary
### 知识点
1. 组件的 props，父组件向子组件传递数据，包括传递函数。
1. 子组件通过调用父组件的函数，来达到向父组件传递数据的目的。
