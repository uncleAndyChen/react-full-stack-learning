# redux
## 如何合理地设计 state
把整个应用的状态按照领域（Domain）分成若干子 state，子 state 之间不能保存重复的数据。
state 以键值对的结构存储数据，以记录的 key/ID 作为记录的索引，记录中的其他字段都依赖于索引。
state 中不能保存可以通过已有数据计算而来的数据，即 state 中的字段不互相依赖。

### 设计 state 总结
设计 Redux State 的关键在于，像设计数据库一样设计 state。把 state 看作应用在内存中的一个数据库，action、reducer 等看作操作这个数据库的 SQL 语句。

## redux 的三大原则
[参考](http://cn.redux.js.org/docs/introduction/ThreePrinciples.html)

### 单一数据源
整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。
这让同构应用开发变得非常容易。来自服务端的 state 可以在无需编写更多代码的情况下被序列化并注入到客户端中。由于是单一的 state tree ，调试也变得非常容易。在开发中，你可以把应用的 state 保存在本地，从而加快开发速度。此外，受益于单一的 state tree ，以前难以实现的如“撤销/重做”这类功能也变得轻而易举。

### State 是只读的
唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。
这样确保了视图和网络请求都不能直接修改 state，相反它们只能表达想要修改的意图。因为所有的修改都被集中化处理，且严格按照一个接一个的顺序执行，因此不用担心 race condition 的出现。 Action 就是普通对象而已，因此它们可以被日志打印、序列化、储存、后期调试或测试时回放出来。

### 使用纯函数来执行修改
为了描述 action 如何改变 state tree ，你需要编写 reducers。
Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state。刚开始你可以只有一个 reducer，随着应用变大，你可以把它拆成多个小的 reducers，分别独立地操作 state tree 的不同部分，因为 reducer 只是函数，你可以控制它们被调用的顺序，传入附加数据，甚至编写可复用的 reducer 来处理一些通用任务，如分页器。

# redux 文档
1. [Redux 官方文档中文翻译](http://cn.redux.js.org/)
1. [Redux 文档 -> 英文原版](http://redux.js.org/)
1. [刘一奇 -> React 与 Redux 系列教程，一共八篇文章](http://www.liuyiqi.cn/tags/React/page/2/)
    1. [官方例子解读--> React 与 Redux 教程（一）connect、applyMiddleware、thunk、webpackHotMiddleware](http://www.liuyiqi.cn/2016/01/19/r2-counter/)
    1. [React 与 Redux 教程（二）Redux的单一状态树完全替代了React的状态机？](http://www.liuyiqi.cn/2016/01/20/r2-state/)
    1. ...
