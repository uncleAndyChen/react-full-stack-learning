# 如何合理地设计 state
把整个应用的状态按照领域（Domain）分成若干子 state，子 state 之间不能保存重复的数据。
state 以键值对的结构存储数据，以记录的 key/ID 作为记录的索引，记录中的其他字段都依赖于索引。
state 中不能保存可以通过已有数据计算而来的数据，即 state 中的字段不互相依赖。

## 设计 state 总结
设计 Redux State 的关键在于，像设计数据库一样设计 state。把 state 看作应用在内存中的一个数据库，action、reducer 等看作操作这个数据库的 SQL 语句。

# redux 的三大原则
[参考](http://cn.redux.js.org/docs/introduction/ThreePrinciples.html)

## 单一数据源
整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。
这让同构应用开发变得非常容易。来自服务端的 state 可以在无需编写更多代码的情况下被序列化并注入到客户端中。由于是单一的 state tree ，调试也变得非常容易。在开发中，你可以把应用的 state 保存在本地，从而加快开发速度。此外，受益于单一的 state tree ，以前难以实现的如“撤销/重做”这类功能也变得轻而易举。

## State 是只读的
唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。
这样确保了视图和网络请求都不能直接修改 state，相反它们只能表达想要修改的意图。因为所有的修改都被集中化处理，且严格按照一个接一个的顺序执行，因此不用担心 race condition 的出现。 Action 就是普通对象而已，因此它们可以被日志打印、序列化、储存、后期调试或测试时回放出来。

## 使用纯函数来执行修改
为了描述 action 如何改变 state tree ，你需要编写 reducers。
Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state。刚开始你可以只有一个 reducer，随着应用变大，你可以把它拆成多个小的 reducers，分别独立地操作 state tree 的不同部分，因为 reducer 只是函数，你可以控制它们被调用的顺序，传入附加数据，甚至编写可复用的 reducer 来处理一些通用任务，如分页器。

# React-Redux 组件
* 如果一个组件既有 UI 又有业务逻辑，那怎么办？回答是，将它拆分成下面的结构：外面是一个容器组件，里面包了一个UI 组件。前者负责与外部的通信，将数据传给后者，由后者渲染出视图。
* React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。

## UI 组件（presentational component）（傻瓜组件）
UI 组件负责 UI 的呈现
* 只负责 UI 的呈现，不带有任何业务逻辑
* 没有状态（即不使用this.state这个变量）
* 所有数据都由参数（this.props）提供
* 不使用任何 Redux 的 API

## 容器组件（container component）
负责管理数据和逻辑
* 负责管理数据和业务逻辑，不负责 UI 的呈现
* 带有内部状态
* 使用 Redux 的 API

## mapStateToProps
管 UI 组件的输入。
* mapStateToProps 是一个函数。它的作用就是像它的名字那样，建立一个从（外部的）state 对象到（UI 组件的）props 对象的映射关系。
* 作为函数，mapStateToProps 执行后应该返回一个对象，里面的每一个键值对就是一个映射。
* mapStateToProps 会订阅 store，每当 state 更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。
* mapStateToProps 的第一个参数总是 state 对象，还可以使用第二个参数（假如参数名为：ownProps），代表容器组件的 props 对象。
    * 使用 ownProps 作为参数后，如果容器组件的参数发生变化，也会引发 UI 组件重新渲染。
* connect 方法可以省略 mapStateToProps 参数，那样的话，UI 组件就不会订阅 store，就是说 store 的更新不会引起 UI 组件的更新。

## mapDispatchToProps
管 UI 组件的输出。
* mapDispatchToProps 是 connect 函数的第二个参数，用来建立 UI 组件的参数到 store.dispatch 方法的映射。
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

# 参考文档
1. 有关 mapStateToProps 与 mapDispatchToProps，还可以参考《深入浅出React和Redux》P71-73，【3.2.5 React-Redux】章节。
1. [阮一峰的网络日志 -> Redux 入门教程（三）：React-Redux 的用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)
    > 有对 connect(mapStateToProps, mapDispatchToProps) 的详细解读，上面的内有关 mapStateToProps 与 mapDispatchToProps 的解读均来自这篇文章。
1. [Redux 官方文档中文翻译](http://cn.redux.js.org/)
1. [Redux 文档 -> 英文原版](http://redux.js.org/)
1. [刘一奇 -> React 与 Redux 系列教程，一共八篇文章](http://www.liuyiqi.cn/tags/React/page/2/)
    1. [官方例子解读--> React 与 Redux 教程（一）connect、applyMiddleware、thunk、webpackHotMiddleware](http://www.liuyiqi.cn/2016/01/19/r2-counter/)
    1. [React 与 Redux 教程（二）Redux的单一状态树完全替代了React的状态机？](http://www.liuyiqi.cn/2016/01/20/r2-state/)
    1. ...
