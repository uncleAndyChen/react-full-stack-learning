# 《深入浅出React和Redux》例子代码
1. [《深入浅出React和Redux》例子代码](https://github.com/mocheng/react-and-redux)
1. 第一章代码位于 chapter-01，第二章的代码位于  chapter-02，依次类推。
1. 子目录名即为分支名，如第四章代码目录下的子目录：`todo_controlled_component`，会有一个对应分支也叫 `todo_controlled_component`。

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
[查看分支](https://gitee.com/elsafly/react-and-redux-demo/tree/controlpanel)

### 知识点
1. 组件。
1. 组件的 state、props。
1. 父组件通过 props 向子组件传递数据。

## 分支 controlpanel_with_summary
[查看分支](https://gitee.com/elsafly/react-and-redux-demo/tree/controlpanel_with_summary)

### 知识点
1. 组件的 props，父组件向子组件传递数据，包括传递函数。
1. 子组件通过调用父组件的函数，来达到向父组件传递数据的目的。

# 第三章
## 分支 react-redux
[查看分支](https://gitee.com/elsafly/react-and-redux-demo/tree/react-redux)

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
1. redux 库：const store = createStore(reducer, initValues)
1. React-Redux 库
    * connect(mapStateToProps, mapDispatchToProps)(componentName)
    * mapStateToProps
    * mapDispatchToProps

相关知识点，已经总结到文档：[redux 知识点、参考链接](./doc/redux.md)

# 第四章

### 知识点
#### 代码文件组织结构，以及确定模块的边界。
参考《深入浅出React和Redux》P75-81。
1. 推荐目录组织方式：按照功能组织。
1. 把一个目录看做一个模块，那么我们要做的是明确这个模块对外的接口，而这个接口应该实现把内部封装起来。
1. 目录下人 index.js 文件，就是我们的模块接口。
1. 各个模块之间只能假设其他模块包含 index.js 文件，要引用模块只能导入 index.js，不能够直接去导人其他文件。
1. 导人一个目录的时候，默认导人的就是这个目录下的 index.js 文件， index.js 文件中导出的内容，就是这个模块想要公开出来的接口。
1. 推荐使用 export（命名式）的方式导出模块，而不是用 export default（默认）的方式，因为 export default 在导入时，会增加代码量。

#### 状态树的设计
参考《深入浅出React和Redux》P81-83。
1. 一个模块控制一个状态节点。 
1. 避免冗余数据。
1. 树形结构扁平。
1. 只能通过 reducer 纯函数修改 state，不能直接修改 state。
    * 所以，push 和 unshift 会改变原来那个数组，是不能直接作用于 state 的。
    * 利用扩展操作符。
