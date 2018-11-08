# 《深入浅出React和Redux》例子演练
1. [《深入浅出React和Redux》原书例子代码，传送门](https://github.com/mocheng/react-and-redux)
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

## 知识点
1. 组件。
1. 组件的 state、props。
1. 父组件通过 props 向子组件传递数据。

## 分支 controlpanel_with_summary
[查看分支](https://gitee.com/elsafly/react-and-redux-demo/tree/controlpanel_with_summary)

## 知识点
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

## 知识点
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
## 分支 todo_controlled_component
[查看分支](https://gitee.com/elsafly/react-and-redux-demo/tree/todo_controlled_component)

## 知识点
### 代码文件组织结构，以及确定模块的边界。
参考《深入浅出React和Redux》P75-81。
1. 推荐目录组织方式：按照功能组织。
1. 把一个目录看做一个模块，那么我们要做的是明确这个模块对外的接口，而这个接口应该实现把内部封装起来。
1. 目录下人 index.js 文件，就是我们的模块接口。
1. 各个模块之间只能假设其他模块包含 index.js 文件，要引用模块只能导入 index.js，不能够直接去导人其他文件。
1. 导人一个目录的时候，默认导人的就是这个目录下的 index.js 文件， index.js 文件中导出的内容，就是这个模块想要公开出来的接口。
1. 推荐使用 export（命名式）的方式导出模块，而不是用 export default（默认）的方式，因为 export default 在导入时，会增加代码量。

### 状态树的设计
参考《深入浅出React和Redux》P81-83。
1. 一个模块控制一个状态节点。 
1. 避免冗余数据。
1. 树形结构扁平。
1. 只能通过 reducer 纯函数修改 state，不能直接修改 state。
    * 所以，push 和 unshift 会改变原来那个数组，是不能直接作用于 state 的。
    * 利用扩展操作符。

### combineReducers
* 利用 combineReducers 可以把多个只针对局部状态的“小的”reducer 合并为一个操纵整个状态树的“大的“ reducer。
* 更妙的是，没有两个”小的“ reducer 会发生冲突，因为无论怎么组合，状态树上一个子状态都只会被一个 reducer 处理，Redux 就是用这种方法隔绝了各个模块。
* 很明显，无论我们有多少“小的” reducer，也无论如何组合，都不用在乎它们被因为调用的顺序，因为调用顺序和结果没有关系。

* 随着应用变得复杂，需要对 reducer 函数进行拆分，拆分后的每一块独立负责管理 state 的一部分。
* combineReducers 辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore。
* 合并后的 reducer 可以调用各个子 reducer，并把它们的结果合并成一个 state 对象。state 对象的结构由传入的多个 reducer 的 key 决定。
* 最终，state 对象的结构会是这样的：
    ```
    {
      todos: ...
      filter: ...
    }
    ```
* 通过为传入对象的 reducer 命名不同来控制 state key 的命名。例如，你可以调用 combineReducers({ todos: todoReducer, filter: filterReducer }) 将 state 结构变为 { todos, counter }。
* 个人认为，更好的做法是直接用 reducer 名作为 state 的 key，使用 ES6 的简写方法：combineReducers({ todos, filter })。这与 combineReducers({ todos: todoReducer, filter: filterReducer }) 产生的 state 结果是一样的。

关于 state key 的使用，实际开发过程中还需要注意些什么呢？看笔者总结的踩坑经验：<a href="./redux.md#stateKey">state 的 key</a>

### bindActionCreators
把原来笨重的函数调用过程封装起来，使最终的业务代码更加优雅。

## 代码修改及完善
添加新的依赖
```
cnpm i --save react-addons-perf
...
peerDependencies WARNING react-addons-perf@* requires a peer of react-dom@^15.4.2 but react-dom@16.6.0 was installed
```

意思是，需要 react v15.4.2 支持，所以，将 Store.js 修改如下：
```
// 以下代码删除
import Perf from 'react-addons-perf'
win.Perf = Perf;
const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-immutable-state-invariant')());
}

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

export default createStore(reducer, {}, storeEnhancers);
// 上一行代码改为
export default createStore(reducer, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
```

createStore 第三个参数：`window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()`，是为了支持 Redux DevTools 插件。 

### 警告 Warning: A component is changing an uncontrolled input of type checkbox to be controlled...
完整的警告如下：
```
Warning: A component is changing an uncontrolled input of type checkbox to be controlled. 
Input elements should not switch from uncontrolled to controlled (or vice versa). 
Decide between using a controlled or uncontrolled input element for the lifetime of the component. 
More info: https://fb.me/react-controlled-components
    in input (at todoItem.js:13)
    in li (at todoItem.js:7)
    in TodoItem (at todoList.js:14)
    in ul (at todoList.js:11)
    in TodoList (created by Connect(TodoList))
    in Connect(TodoList) (at todos.js:11)
    in div (at todos.js:9)
    in Unknown (at TodoApp.js:8)
    in div (at TodoApp.js:7)
    in TodoApp (at src/index.js:10)
    in Provider (at src/index.js:9)
```

这是因为 todoItem.js:13 代码中的 checkbox 的 checked 属性没有用 state 来记录，所以会警告，但这并不影响该示例的正常运行。 
关于页面控件是否受控，以及相关问题，请看官方文档：[Controlled Components](https://reactjs.org/docs/forms.html#controlled-components)

#### 解决
为了消除以上警告，同时，为了更方便理解 state 变化会引起页面的重新渲染，作如下修改：
1. 将 checkbox 的 onClick 事件删除，这样，点击 checkbox 控件不会有任何反应（checkbox 设置了只读属性）。
1. 将设置待办事项状态的点击事件放到 label 上，添加了 a 标签。
    > 不过，a 标签的 href 属性只是 `#` 会引发另外的警告，这个下面再解决。
1. 同时将 checkbox 的 checked 属性添加上去，其值就是待办事项的数据：currentState.completed，这是一个 bool 变量。
1. 将变量 `checkedProp` 定义行 `const checkedProp = completed ? {checked: true} : {};` 删除。
最后，关键代码如下： 
```
    <input className="toggle" type="checkbox" checked={completed} readOnly/>
    <label className="text"><a href="#" onClick={onToggle}>{text}</a></label>
```

### a 标签的 href 属性只是 `#` 会引发的警告
项目中用到的 Link 组件 `./src/filter/views/link.js` 也有同样的警告，一起修改。
```
./src/todos/views/todoItem.js
  Line 13:  The href attribute requires a valid value to be accessible. 
  Provide a valid, navigable address as the href value. 
  If you cannot provide a valid href, but still need the element to resemble a link, 
  use a button and change it with appropriate styles. 
  Learn more: https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md  
  jsx-a11y/anchor-is-valid
```

#### 解决
参照文章[anchor-is-valid](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md)，作如下调整：

将 a 标签 `<a href="#" onClick={onToggle}>{text}</a>` 换成 button 控件，同时增加 button 相关的 style.css 文件放到 src 根目录下。
```
<button
    type="button"
    className="link-button"
    onClick={onToggle}>
    {text}
</button>
```

将 link.js 组件中的 a 标签也换成 button，这里就不贴代码了，直接[看代码文件](../src/filter/views/link.js)吧。

最后还有一个警告，在点击【添加】按钮的时候触发的，没再深入研究。
```
[Deprecation] Using unescaped '#' characters in a data URI body is deprecated and will be removed in M71, around December 2018. 
Please use '%23' instead. See https://www.chromestatus.com/features/5656049583390720 for more details.
```

