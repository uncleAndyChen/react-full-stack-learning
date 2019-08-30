# react 技术栈（全家桶）学习
* 本项目分享个人学习 react 全家桶技术栈的一些经验心得。
* 学习过程会结合相关示例代码，在实践中学习更有成效。
* 欢迎补充，可通过 fork + pull request 的方式，参与到该项目。

# master 分支
与后端项目配合，取代 APICloud API 方式。

登录之后，才可以发帖和评论。
- 后端项目的 sql 脚本初始化了四个用户
    - tom
    - jack
    - steve
    - AndyChen
- 密码都是：123456

## 后端项目地址
* 托管在 github 上的项目链接：https://github.com/uncleAndyChen/spring-boot-bbs-api
* 托管在 gitee 上的项目链接 ：https://gitee.com/uncleAndyChen/spring-boot-bbs-api

# bbs-apicloud 分支
- 仅对《React进阶之路》第九章示例[bbs-redux-reselect](https://github.com/xuchaobei/react-book/tree/master/chapter-09/bbs-redux-reselect)添加一些备注，增加 ESLint检查，代码逻辑基本保留。
- [《React进阶之路》第九章示例 bbs-redux-reselect 解读](https://www.lovesofttech.com/react/reactAdvancedStageBBSUnscramble)

# 计划
- [x] 提供与该示例配套的 spring boot 后端 API 代替 APICloud API。（[spring-boot-bbs-api](https://github.com/uncleAndyChen/spring-boot-bbs-api)）。
- [x] 增加点赞/收藏功能（点赞/收藏之前需要先登录，每个用户对同一个帖子，点赞/收藏之后可取消点赞/收藏，类似微信朋友圈儿的点赞功能）。
    - 【我的收藏】菜单，决定不做了。之后如果有时间，会把精力投入到 [ant-design-pro](https://github.com/ant-design/ant-design-pro)。
- [x] 增加菜单【我的帖子】，只是简单的过滤，没有重新从服务器获取。目前页面显示的是所有帖子。

## 项目依赖及版本
* 用 Create React App 初始化项目
    ```
    npx create-react-app react-and-redux-demo
    ```
* 相关依赖均使用当前最新版（截止 2018-12-05）。
    * react v16.6.3
    * redux v4.0.1
    * react-redux v5.1.1
    * react-router-dom v4.3.1
    * reselect v4.0.0
    * redux-thunk v2.3.0

# 项目地址
* 托管在 github 上的项目链接：https://github.com/uncleAndyChen/react-full-stack-learning
* 托管在 gitee 上的项目链接 ：https://gitee.com/uncleAndyChen/react-full-stack-learning

# 相关文档
> 友情提示：如果要**在新窗口中打开**以下链接，请按住 Ctrl 键再点相关链接。
>
1. [Ant Design Pro v4 从后端下载 excel，后端返回的是文件流](https://www.lovesofttech.com/react/antDesignProDownloadExcel)
1. [Ant Design Pro v4 开发备忘，TypeScript 版本](https://www.lovesofttech.com/react/antDesignProTs)
1. [相关知识储备](./doc/prepare.md)
1. [js 知识点](./doc/js.md)
1. [redux 知识点](./doc/redux.md)
1. [React 项目调试技巧](./doc/debug.md)
1. [像用 IDEA 调试 Java 代码一样，用 WebStorm 调试 react 代码](./doc/JetBrainsIDESupport.md)
1. [redux 官方示例 todomvc 中的 todoList 过滤事件解析](./doc/examplesTodomvcGetVisibleTodos.md)
1. [redux 官方示例 todomvc 两个警告修复](./doc/examplesTodomvcWarningsFixed.md)
1. [React+Redux工程目录结构，最佳实践](https://www.lovesofttech.com/react/reactReduxDirectoryStructure)
1. [react 项目，在生产环境去掉 propTypes 检查代码，打包时自动去除](https://www.lovesofttech.com/react/reactPropTypes)
1. [WebStorm + React 项目，配置 ESLint](https://www.lovesofttech.com/react/eslintConfig)
1. [ESLint 配置文件 .eslintrc 示例及说明](https://www.lovesofttech.com/react/eslintConfigExample)
1. [react开发，日常经验汇总](https://www.lovesofttech.com/react/reactExperience)

# 结合例子代码学习
- [《深入浅出React和Redux》一书的部分章节例子代码演练及相关知识点](./doc/reactAndReduxBook.md)

# 分支说明
用 Create React App 初始化项目，所有练习代码都会体现到 master 分支。  
针对某一个知识点，完成练习之后，记录相关知识点，提交 master，然后从 master 创建一个分支。  

# 获取（切换至）某分支
以分支 branchName 为例，切换到该分支并拉取最新代码
```
git checkout branchName
git pull
```

# 如何参与项目，如何提交 PR？
以下是两大平台的帮助文档。
* github.com -> [Creating a pull request from a fork](https://help.github.com/articles/creating-a-pull-request-from-a-fork/)
* gitee.com  -> [Fork + Pull 模式 ](https://gitee.com/help/articles/4128)

# 加群一起学习
<a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=bdff785e1413e413a8f88187c9807306893951282103fad3b3080f05e829bd7b">
<img border="0" src="./doc/images/qqGroup.png" alt="react stack(react全家桶)" title="react stack(react全家桶)">
</a> 

（QQ 群号：683414457，进群密码：`react stack`）

![](./doc/images/reactStackLearning.png)
