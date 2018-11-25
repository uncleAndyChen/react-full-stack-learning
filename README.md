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

# 参考
1. [《深入浅出React和Redux》代码](https://github.com/mocheng/react-and-redux)
1. [Create React App official website,Getting Started](https://facebook.github.io/create-react-app/docs/getting-started)

# master 分支
为 Create React App 初始化项目，之后的练习代码都会体现到这个分支，针对《深入浅出React和Redux》一书中，某一个被挑选的例子，完成之后，会创建一个分支。
```
npx create-react-app react-and-redux-demo
```

# 结合《深入浅出React和Redux》例子代码学习
第一章代码位于 chapter-01，第二章的代码位于  chapter-02，依次类推。  
子目录名即为分支名，如第四章代码目录下的子目录：`todo_controlled_component`，会有一个对应分支也叫 `todo_controlled_component`。

# 第一章
该示例为计数器，其中 PropTypes 的依赖有变化，需要做调整。  
react 的类型检查 PropTypes 自 React v15.5 起已弃用，请使用 prop-types。  
书中的例子代码，使用的 react 是 15.4.1，使用方式是：`import { PropTypes } from 'react'`;    
要改为：`import PropTypes from 'prop-types';`

