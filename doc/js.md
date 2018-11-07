# js 知识点
* hasOwnProperty()
    > 用来检测一个对象是否含有特定的自身属性；和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。
* reduce
    > Array的reduce()把一个函数作用在这个Array的[x1, x2, x3...]上，这个函数必须接收两个参数，reduce()把结果继续和序列的下一个元素做累积计算，其效果就是
    ```
    [x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)
    ```

## 参考
1. [map/reduce 用法参考](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001435119854495d29b9b3d7028477a96ed74db95032675000)

# 扩展阅读
1. 解构赋值，参考《ECMAScript 6 入门 第3版》的章节：[变量的解构赋值](http://es6.ruanyifeng.com/#docs/destructuring)
1. [《ECMAScript 6 入门 第3版》，在线阅读](http://es6.ruanyifeng.com/)
1. [JS 函数式编程指南](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)
