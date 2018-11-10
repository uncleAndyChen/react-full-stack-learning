# redux 官方示例 todomvc 中的 todoList 过滤事件解析
[官方 todomvc 示例源码](https://github.com/reduxjs/redux/tree/master/examples/todomvc)

如果已经安装 Git for Windows 客户端工具（[传送门](https://git-scm.com/downloads)），在工作文件夹下，右键 -> Git Bash Here，依次执行下面的代码，查看运行效果，运行之后，可以修改源代码，如果编译通过，页面会自动刷新。
```
git clone https://github.com/reduxjs/redux.git
cd redux/examples/todomvc/
cnpm i
```

# 理解代码逻辑
点击【All】、【Active】、【Completed】，页面做了哪些操作？在哪里调用了重新获取 todoList 并更新到页面上的呢？  
点击以上三个链接的时候，FilterLink 组件做的事情，仅仅是把自身数据 state.visibilityFilter 的值改成点击链接的 props.filter。  
FilterLink 的 props 有一个成员，叫：filter，它是在哪儿赋值的呢？  
看下面的代码（`src/components/Footer.js`）  
```html
  <ul className="filters">
    {Object.keys(FILTER_TITLES).map(filter =>
      <li key={filter}>
        <FilterLink filter={filter}>
          {FILTER_TITLES[filter]}
        </FilterLink>
      </li>
    )}
  </ul>
```

从以上代码可知，是通过数组 FILTER_TITLES 的 key 来初始化过滤链接（全部、待办、完成）的。  
再看一下数组 FILTER_TITLES 的定义：
```
const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
}
```

上面的代码，SHOW_ALL、SHOW_ACTIVE、SHOW_COMPLETED 是常量，定义在 `src/constants/TodoFilters.js`  
代码如下：
```
export const SHOW_ALL = 'show_all'
export const SHOW_COMPLETED = 'show_completed'
export const SHOW_ACTIVE = 'show_active'
```

通过 WebStorm 的调试窗口（[在 WebStorm 调试 react 项目的方法，传送门](./JetBrainsIDESupport.md)），可以看到，数组 FILTER_TITLES，实际的值是：
```
{
  "show_all": "All",
  "show_active": "Active",
  "show_completed": "Completed"
}
```

看到这里，就知道了下面的代码中，传给 FilterLink 组件的 props 成员 filter 的值，其实就是数组 FILTER_TITLES 的 key，即：show_all、show_active、show_completed。
```html
  <ul className="filters">
    {Object.keys(FILTER_TITLES).map(filter =>
      <li key={filter}>
        <FilterLink filter={filter}>
          {FILTER_TITLES[filter]}
        </FilterLink>
      </li>
    )}
  </ul>
```

在界面上，页面末尾那三个链接【All】、【Active】、【Completed】，就是三个 FilterLink 组件，通过上面的分析，这三个组件的 props.filter 分别是 show_all、show_active、show_completed。  
FilterLink 组件，又用了一个UI组件 Link，在 Link 组件中，执行的点击事件是： `onClick={() => setFilter()}`。
setFilter 函数是在容器组件 FilterLink 的 mapDispatchToProps 中定义的：
```
const mapDispatchToProps = (dispatch, ownProps) => ({
  setFilter: () => {
    dispatch(setVisibilityFilter(ownProps.filter))
  }
})
```

它要做的事，只是向 store 发出一个 dispatch，那么，最终执行者在哪儿呢？  
回答这个问题，需要了解 redux 原理。
* redux 的 store 由函数 createStore 返回，该函数的第一个参数是 reducers，是包含了各个模块的 reducer。  
* 而 reducers，在这个例子中，是用 redux 提供的 combineReducers() 函数来整合得到的一个集合（更准确的说，是一个数组），这样，store 就可以根据各个模块的 reducer key 来统一管理各个模块的 state 以及 actions（模块的行为，体现在自己模块的 reducer 中定义的各个函数）。    
* 对于 combineReducers()，官方是这样描述的：combineReducers() 所做的只是生成一个函数，这个函数来调用你的一系列 reducer，每个 reducer 根据它们的 key 来筛选出 state 中的一部分数据并处理，然后这个生成的函数再将所有 reducer 的结果合并成一个大的对象。

了解了这个原理之后，回到刚才的问题，Link 组件的点击事件，最终的行为，是 reducer（文件 `src/reducers/visibilityFilter.js` 定义的函数） visibilityFilter，其定义如下
```
const visibilityFilter = (state = SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
};
```

该方法的默认行为是返回 SHOW_ALL（常量），即返回字符串 `show_all`，点击某一个链接时，返回的是 action 传过来的 filter。那这个 action 又是在哪儿定义的呢？    
从源代码中可以看出，派发的 dispatch 是：`dispatch(setVisibilityFilter(ownProps.filter))`。  
再看上下文，不难发现，该 action 是在 `src/actions/index.js` 下定义的，setVisibilityFilter 的定义如下： 
```
export const setVisibilityFilter = filter => ({ type: types.SET_VISIBILITY_FILTER, filter });
```

分析到这里，问题来了，visibilityFilter 接收到这个 action 并执行之后，直接返回的是 action.filter，接下来又发生了什么？  
先看一下 rcux 文档关于 reducer 的描述（[传送门](https://cn.redux.js.org/docs/basics/Reducers.html)）：  
1. reducers 指定了应用状态的变化如何响应 actions 并发送到 store 的，记住 actions 只是描述了有事情发生了这一事实，并没有描述应用如何更新 state。
1. reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。
1. 注意每个 reducer 只负责管理全局 state 中它负责的一部分。每个 reducer 的 state 参数都不同，分别对应它管理的那部分 state 数据。

再回到 visibilityFilter，执行之后，返回的 filter 其实是会更新到 visibilityFilter 这个 reducer 负责的 state。
通过浏览器的 Redux DevTools 插件，我们很容易看到，在 state 树上，有两个对象，key 分别为：todos 和 visibilityFilter。

接下来，因为 state 发生了变化，这会导致页面重新渲染，而页面渲染的时候，todoList 会根据 visibilityFilter 的值进行过滤，从而实现了三个链接应该有的功能。  
相关代码如下：
```
import { createSelector } from 'reselect'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

const getVisibilityFilter = state => state.visibilityFilter
const getTodos = state => state.todos

export const getVisibleTodos = createSelector(
  [getVisibilityFilter, getTodos],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case SHOW_ALL:
        return todos
      case SHOW_COMPLETED:
        return todos.filter(t => t.completed)
      case SHOW_ACTIVE:
        return todos.filter(t => !t.completed)
      default:
        throw new Error('Unknown filter: ' + visibilityFilter)
    }
  }
)

export const getCompletedTodoCount = createSelector(
  [getTodos],
  todos => (
    todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    )
  )
)
```

# createSelectorg
上面的代码，用到了 createSelectorg 来优化性能，有关 createSelectorg 方法，这里不做分析，请参考：  
* 《深入浅出React和Redux》P122，【5.3 用reselect 提高数据获取性能】章节。
* [翻译|Redux的中间件-Reselect](https://www.jianshu.com/p/6e38c66366cd)
* [模拟代码帮助理解reselect的createSelector函数](https://www.tangshuang.net/3839.html)

# 源码修改
## Received the string `true` for the boolean attribute `autoFocus`
完整警告信息如下：
```
Warning: Received the string `true` for the boolean attribute `autoFocus`. Although this works, it will not work as expected if you pass the string "false". Did you mean autoFocus={true}?
    in input (at TodoTextInput.js:40)
    in TodoTextInput (at Header.js:8)
    in header (at Header.js:6)
    in Header (created by Connect(Header))
    in Connect(Header) (at App.js:7)
    in div (at App.js:6)
    in App (at src/index.js:13)
    in Provider (at src/index.js:12)
```

## 解决
上面的提示信息，其实已经非常友好了，看重点：`Did you mean autoFocus={true}?`  
看一下报错的地方的源码（`TodoTextInput.js:40`）
```
  <input className={
    classnames({
      edit: this.props.editing,
      'new-todo': this.props.newTodo
    })}
    type="text"
    placeholder={this.props.placeholder}
    autoFocus="true"
    value={this.state.text}
    onBlur={this.handleBlur}
    onChange={this.handleChange}
    onKeyDown={this.handleSubmit} />
```

根据友好的提示信息，将上面的 `autoFocus="true"` 改为 `autoFocus={true}` 即可。

## Failed prop type: You provided a `checked` prop to a form field without an `onChange` handler
```
index.js:1452 Warning: Failed prop type: You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.
    in input (at MainSection.js:12)
    in span (at MainSection.js:11)
    in section (at MainSection.js:8)
    in MainSection (created by Connect(MainSection))
    in Connect(MainSection) (at App.js:8)
    in div (at App.js:6)
    in App (at src/index.js:13)
    in Provider (at src/index.js:12)
```
看一下报错的地方的源码（`MainSection.js:12`）
```
  <input
    className="toggle-all"
    type="checkbox"
    checked={completedCount === todosCount}
  />
```

从提示信息 `You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field.` 看。  
我的理解是：设置了 checked 属性，但是又没有提供 onChange 事件来更新它，那么，将会自动为其设置一个 read-only 属性。  
将上面的代码，去掉 className 属性，如下：
```
  <input
    type="checkbox"
    checked={completedCount === todosCount}
  />
```
再看界面，这时候，一个可以看到是否选中状态的复选框出现了，它确实是只读的，点击没有反应，当所有待办事项变成完成状态时，该 checkbox 会被设置为选中状态。  
再看后面的提示 `If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly``  
如果该 checkbox 是可变的，那么，请为其设置一个默认值，否则，要么设置 onChange 事件，要么设置 readOnly 属性。  
设置默认值，例如设置默认选中，可以这样：
```
  <input
    type="checkbox"
    defaultChecked={true}
  />
```

如果为其设置默认值 defaultChecked，但不动态设置 checked 属性，是不会有上面的警告的，但我们需要动态为其设置 checked 属性，这样在界面上能看出来是否为全部选中状态（向下的箭头颜色有差别，更详细的，请运行起来查看实际效果）。

很明显，如果要为其设置 checked 属性，设置 defaultChecked 是没有意义的（即使设置了，也还是会报同样的警告），所以，为了消除这个警告，有两种解决办法：
1. 设置 readOnly 属性。
    ```
      <input
        type="checkbox"
        defaultChecked={true}
        readOnly
      />
    ```
1. 设置一个 onChange 事件，哪怕是一个什么也不做的“空”事件。
    ```
      <input
        type="checkbox"
        defaultChecked={true}
        onChange={()=>{}}
      />
    ```
对于这个例子，设置 readOnly 是最好的方案，本来也是需要只读的，设置“空”事件有点莫名其妙。

## 解读第二个警告
至于为什么 react 会有这样的检查，[stackoverflow.com 网站上有一个网友的回答](https://stackoverflow.com/questions/36715901/reactjs-error-warning)，我认为是比较贴切的，摘录如下：

### Controlled Components
Attributes needed:
1. `value - <input> (not checkbox or radio), <select>, <textbox> or checked for (checkbox or radio).`
1. `onChange`
* React handles the condition of the element by updating the value or checked attribute (depending on the element) from the props or the state. 
* We need to notify react when we make a change, like inserting data, or checking the box, 
* so react can update the element's condition when it rerenders the component. 
* To do so, we must include an onChange handler, in which we will update the state or notify the component's parent, so it will update the props.
```
<input
  type="checkbox"
  checked={ this.props.checked }
  onChange={ this.checkboxHandler } 
/>
```

### Uncontrolled Components
Attributes needed:
```
defaultValue - <input> (not checkbox or radio), <select>, <textbox> or defaultChecked for (checkbox or radio).
```
React sets the initial value using [defaultValue or defaultChecked](https://reactjs.org/docs/uncontrolled-components.html#default-values), and the update of the element's state is controlled by the user, usually via the DOM using refs.
```
<input
  type="checkbox"
  defaultChecked={ this.props.checked } 
/>
```
