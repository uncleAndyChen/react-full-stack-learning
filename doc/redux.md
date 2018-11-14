# redux 知识点
## 如何合理地设计 state
把整个应用的状态按照领域（Domain）分成若干子 state，子 state 之间不能保存重复的数据。
state 以键值对的结构存储数据，以记录的 key/ID 作为记录的索引，记录中的其他字段都依赖于索引。
state 中不能保存可以通过已有数据计算而来的数据，即 state 中的字段不互相依赖。

### 设计 state 总结
设计 Redux State 的关键在于，像设计数据库一样设计 state。把 state 看作应用在内存中的一个数据库，action、reducer 等看作操作这个数据库的 SQL 语句。

## <a name="stateKey">state 的 key</a>
* createStore 的参数 reducer 的 key 即为 store 树上的 key，类似表名，在 reducer 里仅能操作 reducer 的 key 对应的 store，不能操作别的 key 下的数据，所以，也不用给前缀。
* 而在 mapStateToProps 函数里，是需要写 key，即需要指定“表名”的。

## redux 的三大原则
[参考](http://cn.redux.js.org/docs/introduction/ThreePrinciples.html)

### 单一数据源
整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。
这让同构应用开发变得非常容易。来自服务端的 state 可以在无需编写更多代码的情况下被序列化并注入到客户端中。由于是单一的 state tree ，调试也变得非常容易。在开发中，你可以把应用的 state 保存在本地，从而加快开发速度。此外，受益于单一的 state tree ，以前难以实现的如“撤销/重做”这类功能也变得轻而易举。

### state 是只读的
唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。
这样确保了视图和网络请求都不能直接修改 state，相反它们只能表达想要修改的意图。因为所有的修改都被集中化处理，且严格按照一个接一个的顺序执行，因此不用担心 race condition 的出现。 Action 就是普通对象而已，因此它们可以被日志打印、序列化、储存、后期调试或测试时回放出来。

### 使用纯函数来执行修改
为了描述 action 如何改变 state tree ，你需要编写 reducers。
Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state。刚开始你可以只有一个 reducer，随着应用变大，你可以把它拆成多个小的 reducers，分别独立地操作 state tree 的不同部分，因为 reducer 只是函数，你可以控制它们被调用的顺序，传入附加数据，甚至编写可复用的 reducer 来处理一些通用任务，如分页器。

## Redux 三个基本概念
### action
1. action 是把数据从应用层传递到 store 的有效载体，它是 store 数据的唯一来源。
1. action 本质上是 JavaScript 普通对象。
1. 我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。
1. action 仅仅表示某对象发生了什么行为，我们应该尽量减少在 action 中传递的数据。

### reducer
1. action 只是描述了有事情发生了这一事实，并没有指明应用如何更新 state。
1. 而这正是 reducer 要做的事情。reducer 就是一个纯函数，接收当前 state 和 action，返回新的 state。函数形式：`(previousState, action) => newState`
1. 只要传入参数相同，返回的 newState 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。
1. 保持 reducer 纯净非常重要。永远不要在 reducer 里做这些操作：
    * 修改传入参数；
    * 执行有副作用的操作，如 API 请求和路由跳转；
    * 调用非纯函数，如 Date.now() 或 Math.random()。
1. 记得不要修改 previousState 的值，创建一个新的对象返回给 newState。 

### store
使用 reducers 来根据 action 更新 state, 存储在 store 中。store 把之前创建的 action 和 reducer 联系在一起。  
一个 Redux 应用中只有一个 store，store 保存了唯一数据源。  
store 的职责有：
* 持有应用的 state；
* 提供 getState() 方法获取 state；
* 提供 dispatch(action) 方法更新 state；
* 通过 subscribe(listener) 注册监听器;
* 通过 subscribe(listener) 返回的函数注销监听器。
    ```
    let unsubscribe = store.subscribe(() =>
      console.log(store.getState())
    );

    unsubscribe();
    ```
    
## redux 数据流
redux 架构使用严格的单向数据流动方式，其生命周期分为以下四步：
1. 应用调用 store.dispatch(action) 发送 Action
1. redux 根据传入的 action 调用对应的 reducer 方法
1. 根 reducer 把子 reducer 的结果合并成一颗 state 树
1. redux store 保存根 reducer 生成的 state 树

得到的 state 树即为当前应用的下一个 state，所有订阅 store.subscribe(listener) 的监听器都将被调用。监听器可以调用 store.getState() 获得当前 state。

## React-Redux 组件
* 如果一个组件既有 UI 又有业务逻辑，那怎么办？回答是，将它拆分成：外面是一个容器组件，里面包了一个 UI 组件。前者负责与外部的通信，将数据传给后者，由后者渲染出视图。
* React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。

### UI 组件（presentational component）
UI 组件负责 UI 的呈现
* 只负责 UI 的呈现，不带有任何业务逻辑
* 没有状态（即不使用 this.state 这个变量）
* 所有数据都由参数（this.props）提供
* 不使用任何 Redux 的 API

### 容器组件（container component）
负责管理数据和逻辑
* 负责管理数据和业务逻辑，不负责 UI 的呈现
* 带有内部状态
* 使用 Redux 的 API

## react-redux
react-redux 提供了一个 connect 函数，用于把 react 组件和 redux 的 store 连接起来，生成一个容器组件，负责数据管理和业务逻辑，其签名如下：
```
connect(mapStateToProps, mapDispatchToProps)(componentName)
```

### mapStateToProps
输入逻辑：外部的数据（即state对象）如何转换为 UI 组件的参数。
* mapStateToProps 是一个函数。它的作用就是像它的名字那样，建立一个从（外部的）state 对象到（UI 组件的）props 对象的映射关系。
* 作为函数，mapStateToProps 执行后应该返回一个对象，里面的每一个键值对就是一个映射。
* mapStateToProps 会订阅 store，每当 state 更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。
* mapStateToProps 的第一个参数总是 state 对象，还可以使用第二个参数（假如参数名为：ownProps），代表容器组件的 props 对象。
    * 使用 ownProps 作为参数后，如果容器组件的参数发生变化，也会引发 UI 组件重新渲染。
* connect 方法可以省略 mapStateToProps 参数，那样的话，UI 组件就不会订阅 store，就是说 store 的更新不会引起 UI 组件的更新。

### mapDispatchToProps
输出逻辑：用户发出的动作如何变为 Action 对象，继而从 UI 组件传出去。
* mapDispatchToProps 是 connect 函数的第二个参数，用来建立 UI 组件的参数到 store.dispatch 方法的映射。
    * 换一种说法，它负责把需要用到的 action 映射到展示组件的 props 上。
* 也就是说，它定义了哪些用户的操作应该当作 Action，传给 store。
* mapDispatchToProps 可以是一个函数，也可以是一个对象。
* 如果 mapDispatchToProps 是一个函数，会得到 dispatch 和 ownProps（容器组件的 props 对象）两个参数。
    * mapDispatchToProps 作为函数，应该返回一个对象，该对象的每个键值对都是一个映射，定义了 UI 组件的参数怎样发出 Action。
```javascript
const mapDispatchToProps = (
  dispatch,
  ownProps
) => {
  return {
    onClick: () => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter
      });
    }
  };
}
```
* 如果 mapDispatchToProps 是一个对象，它的每个键名也是对应 UI 组件的同名参数，键值应该是一个函数，会被当作 Action creator，返回的 Action 会由 Redux 自动发出。
* 举例来说，上面的 mapDispatchToProps 写成对象就是下面这样。
```javascript
const mapDispatchToProps = {
  onClick: (filter) => {
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
  };
}
```

## 参考
1. 有关 mapStateToProps 与 mapDispatchToProps，还可以参考《深入浅出React和Redux》P71-73，【3.2.5 React-Redux】章节。
1. [阮一峰的网络日志 -> Redux 入门教程（三）：React-Redux 的用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)
    > 有对 connect(mapStateToProps, mapDispatchToProps)(componentName) 的详细解读，上面有关 mapStateToProps 与 mapDispatchToProps 的解读文字，均来自这篇文章（略有修改）。
1. [Redux 官方文档中文翻译](https://cn.redux.js.org/)
1. [Redux 文档 -> 英文原版](https://redux.js.org/)
1. [前端手记 TodoMVC 之 Redux 篇](https://www.zddhub.com/memo/2016/10/14/todomvc-redux.html)

## 扩展阅读
1. [刘一奇 -> React 与 Redux 系列教程，一共八篇文章](http://www.liuyiqi.cn/tags/React/page/2/)
    1. [官方例子解读--> React 与 Redux 教程（一）connect、applyMiddleware、thunk、webpackHotMiddleware](http://www.liuyiqi.cn/2016/01/19/r2-counter/)
    1. [React 与 Redux 教程（二）Redux的单一状态树完全替代了React的状态机？](http://www.liuyiqi.cn/2016/01/20/r2-state/)
    1. ...
1. [理解Redux应用架构——（一）Redux结构概览](https://www.jianshu.com/p/e7937e1cfc05)
1. [理解Redux应用架构——（二）创建store的createStore](https://www.jianshu.com/p/53d010fb76d8)
1. [理解Redux应用架构——（三）让你爱上的Redux middleware](https://www.jianshu.com/p/aa960de69596)
