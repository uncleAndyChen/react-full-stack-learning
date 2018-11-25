# react 练习项目
使用 react 16.6.0（截止 2018-11-05 的最新版）。      
用 Create React App 初始化项目。  
然后以《深入浅出React和Redux》这本书中的例子代码为基础，一个挑选的例子，会有一个对应的分支。

# 参考
1. [《深入浅出React和Redux》代码](https://github.com/mocheng/react-and-redux)
1. [Create React App official website,Getting Started](https://facebook.github.io/create-react-app/docs/getting-started)

# master 分支
为 Create React App 初始化项目，之后的练习代码都会体现到这个分支，针对《深入浅出React和Redux》一书中，某一个被挑选的例子，完成之后，会创建一个分支。
```
npx create-react-app react-and-redux-demo
```

# 例子代码
第一章代码位于 chapter-01，第二章的代码位于  chapter-02，依次类推。  
子目录名即为分支名，如第四章代码目录下的子目录：`todo_controlled_component`，会有一个对应分支也叫 `todo_controlled_component`。

# 第一章
该示例为计数器，其中 PropTypes 的依赖有变化，需要做调整。  
react 的类型检查 PropTypes 自 React v15.5 起已弃用，请使用 prop-types。  
书中的例子代码，使用的 react 是 15.4.1，使用方式是：`import { PropTypes } from 'react'`;    
要改为：`import PropTypes from 'prop-types';`

