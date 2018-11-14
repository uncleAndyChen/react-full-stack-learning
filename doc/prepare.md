# 准备工作
* 安装 node 最新版，[点击进入下载页面](https://nodejs.org/zh-cn/)。建议下载【长期维护版本】，而不是【含实验性的最新发布版】。
* 安装 cnpm，参考官网：[淘宝 NPM 镜像](https://npm.taobao.org/)
    > 最直接的方式：`npm install -g cnpm --registry=https://registry.npm.taobao.org`
    
# 编程思想
* UI=render(data)，React 组件扮演的是 render 函数的角色，应该是一个没有副作用的纯函数。
* 函数式编辑（redux 应用得比较透彻）。
* 组件化，最大复用。
* 组件的粒度，需要根据实际需求来灵活处理。
    * 让一个组件只专注做一件事，如果发现一个组件做的事情太多了，就可以把这个组件拆分成多个组件，让每个组件依然只专注做一件事。
    * 是否需要多处执行？
    * 组件化之后，代码是否更具可读性？是否能简化代码逻辑，更易于维护？
    * 是否将来有可能需要多处使用？
    * 是否可以提取到公用模块库？

## JSX
* JSX 描述 DOM 时，所有属性都采用小驼峰写法。
* JSX 中用 {} 来写 JS 语句。
* 元素内嵌样式使用对象来描述，样式属性名同样使用小驼峰写法，如 backgroundColor 。
* 样式，html 中的 class， 在 JSX 中，要写成 className。
* 事件绑定通过 on + eventType 小驼峰写法。
* 事件，采用驼峰命名，js 的 onclick 要写成 onClick， js 的 onchange 要写成 onChange。
* 列表，需要有一个属性 key，值在列表中唯一。
* 受控组件（及时更新至 state），非受控组件（用 ref）。
* 高阶组件。

# 简单的知识梳理
* class，不是真正的类，只是语法糖。
* Component class 中的预定义属性：state, props，它们的变化，会触发组件的重新渲染。它们的更新是异步的，是不能直接修改的，state 需要通过 set 方法来修改。
    * prop 是组件的对外接口。
    * state 代表组件的内部状态。
    * 对外用 prop，内部用state。
* 子组件修改父组件传入的 props 的值，会有副作用，在编码过程中，不允许这个操作。参考《深入浅出React和Redux》，P24-25，【2.2.3 prop 和 state 的对比】章节。
* 组件的生命周期。类组件才有生命周期方法，函数组件没有生命周期方法。
    * 组件名一定要大写开头。非大写开头，不被当作组件。
    * 参考《深入浅出React和Redux》，P30-34，【2.3.2 更新过程】章节。
    * componentWillReceiveProps(nextProps)
        1. 弄清楚该函数被调用的时机，才能正确的使用它 => 父组件的 render 函数被调用，那么子组件的该函数被调用。
        1. 父组件传入的 props 发生变化，就会先执行这个方法，此方法可以作为 props 传入后，渲染之前 setState 的机会，并且在这个方法中调用的 setState 方法是不会二次渲染的。
        1. 这里说的不会造成第二次的渲染，并不是说这里的 setState 不会生效。在这个方法里调用 setState 会在组件更新完成之后在 render 方法执行之前更新状态，将两次的渲染合并在一起。
        1. 可以在 componentWillReceiveProps 执行 setState，但是如果你想在这个方法里获取 this.state 得到的将会是上一次的状态。
        1. nextProps 并不一定会变化，所以，需要比较 nextProps 和 this.props 来决定是否执行 props 发生变化后的逻辑。
    * componentWillMount
        * 在 render 之前调用。
        * 每一个组件 render 之前立即调用。
        * 可以在服务端被调用，也可以在浏览器端被调用。
        * 不建议在该方法内调用 api 来渲染页面。
    * componentDidMount
        * 在 render 之后调用
        * 所有的子组件都 render 完之后才会调用。
        * 只能在浏览器端被调用，在服务器端使用 react 的时候不会被调用。
        * 推荐在该方法内调用 api 来获取服务器端数据，从而进行页面渲染工作。
        
# propTypes 检查
* 开发者在代码中定义prop Types，在开发过程中避免犯错，但是在发布产品代码时，用一种自动的方式将 prop Types 去掉，这样最终部署到产品环境的代码就会更优。
* 现有的 babel-react-optimize 就具有这个功能，可以通过 npm 安装，但是应该确保只在发布产品代码时使用它。

# forceUpdate()
* 默认情况下，当组件的 state 或 props 改变时，组件将重新渲染。
* 调用 forceUpdate() 会导致组件跳过 shouldComponentUpdate()，直接调用 render()。
* 这将触发组件的正常生命周期方法，包括每个子组件的 shouldComponentUpdate() 方法。

以下情况，可以手动调用 forceUpdate() 自动触发组件的 render()。
1. 如果你的 render() 方法依赖于一些其他的数据，你可以告诉 React 组件需要通过调用 forceUpdate() 重新渲染。
1. 有些变量不在 state上，你又想达到这个变量更新的时候，重新渲染。
1. state 里的某个变量层次太深，更新的时候没有自动触发 render()。

# export, export default 和 import 区别以及用法
这是ES6的语法。ES6 模块主要有两个功能：export 和 import
    * export 用于对外输出本模块（一个文件可以理解为一个模块）变量、函数、模块的接口。
    * import 用于在一个模块中加载另一个含有 export 接口的变量、函数、模块。

## 区别及用法
1. export 与 export default 均可用于导出常量、函数、文件、模块等。
1. 你可以在其它文件或模块中通过import+(常量 | 函数 | 文件 | 模块)名的方式，将其导入，以便能够对其进行使用。
1. 在一个文件或模块中，export、import可以有多个，export default仅有一个。
1. 通过 export 方式导出，在导入时要加 {}，export default 则不需要。

# 扩展阅读
1. [react 中文社区文档](https://react.docschina.org/docs/hello-world.html)
1. [Create React App official website,Getting Started](https://facebook.github.io/create-react-app/docs/getting-started)
 