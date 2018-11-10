# redux 官方示例 todomvc 两个警告修复
> 题外话：  
  本人有轻度代码洁癖，只要有警告，我会认为代码还有需要完善的地方，只要有时间我就会着手去解决它，去了解其背后的原因，了解为什么会发出警告，以及解决方案是什么，最终消除这些影响代码质量的“隐患”。  
  通过解决这类问题，会让自己对相关代码的理解更加深入，做到知其然，并且知其所以然，同时，能够让自己对相关知识点印象深刻。  

[官方 todomvc 示例源码](https://github.com/reduxjs/redux/tree/master/examples/todomvc)  

其实改动很小，主要是看解决思路

## examples/todomvc/src/components/TodoTextInput.js
完整警告信息如下：
```
Warning: Received the string `true` for the boolean attribute `autoFocus`. Although this works, 
it will not work as expected if you pass the string "false". Did you mean autoFocus={true}?
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

## examples/todomvc/src/components/MainSection.js 
完整警告信息如下：
```
index.js:1452 Warning: Failed prop type: You provided a `checked` prop to a form field without an `onChange` handler. 
This will render a read-only field. 
If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.
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

从下面的提示信息看
```
You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field.
```  
我的理解是：设置了 checked 属性，但是又没有提供 onChange 事件来更新它，那么，将会自动为其设置一个 read-only 属性。  
将上面的代码，去掉 className 属性，如下：
```
  <input
    type="checkbox"
    checked={completedCount === todosCount}
  />
```
再看界面，这时候，一个可以看到是否选中状态的复选框出现了，它确实是只读的，点击没有反应，当所有待办事项变成完成状态时，该 checkbox 会被设置为选中状态，否则为非选中状态。  
再看后面的提示：
```
If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly` 
``` 
我的理解是：如果该 checkbox 是可变的，那么，请为其设置一个默认值，否则，要么设置 onChange 事件，要么设置 readOnly 属性。  
设置默认值，例如设置默认选中，可以这样：
```
  <input
    type="checkbox"
    defaultChecked={true}
  />
```

如果为其设置默认值 defaultChecked，但不动态设置 checked 属性，是不会有上面的警告的，但我们需要动态为其设置 checked 属性，这样在界面上能看出来是否为全部选中状态（向下的箭头颜色有差别，更详细的，请运行起来查看实际效果）。

很明显，如果要为其设置 checked 属性，设置 defaultChecked 是没有意义的（即使设置了，也还是会报同样的警告）。  
所以，从提示信息看上，为了消除这个警告，有两种解决办法：
1. 设置 readOnly 属性。
    ```
      <input
        type="checkbox"
        defaultChecked={completedCount === todosCount}
        readOnly
      />
    ```
1. 设置一个 onChange 事件，哪怕是一个什么也不做的“空”事件。
    ```
      <input
        type="checkbox"
        defaultChecked={completedCount === todosCount}
        onChange={()=>{}}
      />
    ```
对于这个例子，设置 readOnly 是最好的方案，本来也是需要只读的嘛。设置“空”事件有点莫名其妙。

# 解读第二个警告
至于为什么 react 会有这样的检查，[stackoverflow.com 网站上有一个网友的回答](https://stackoverflow.com/questions/36715901/reactjs-error-warning)，我认为是比较贴切的，摘录如下：

## Controlled Components
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

## Uncontrolled Components
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

## 扩展阅读
是有关可控组件和非可控组件的。
* [Forms](https://reactjs.org/docs/forms.html)
* [Uncontrolled Components](https://reactjs.org/docs/uncontrolled-components.html#default-values)
