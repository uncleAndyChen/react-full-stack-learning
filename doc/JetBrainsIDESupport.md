# 堪比 Java 代码调试的方案：用 WebStorm + JetBrains IDE Support 插件，在 WebStorm 内调试代码
## 准备工作
WebStorm 的 Javascript Debug 只能选择 chrome（至少在我的电脑上是这样），所以，JetBrains IDE Support 插件需要安装到 chrome 上。
1. [chrome 最新版下载](http://chromecj.com/category/chrome/)
1. 安装插件，在应用中心，搜索：JetBrains IDE Support，不过，如果谷歌应用中心，由于众所周知的原因不能访问的话，可以下载离线版进行安装。
    * [安装包下载](./JetBrains-IDE-Support-2.0.9-Crx4.crx)
    * 下载之后，将文件直接拖至 chrome 的扩展页面，按照提示安装即可。  
    ![](./images/WebStormDebugReact04.png)
    ![](./images/WebStormDebugReact05.png)
1. WebStorm 和 JetBrains IDE Support 端口设置成一样。  
    ![](./images/WebStormDebugReact03.png)
    ![](./images/WebStormDebugReact06.png)
1. 添加启动项，只能选择 chrome 浏览器，如下图：  
    ![](./images/WebStormDebugReact01.png)
    ![](./images/WebStormDebugReact02.png)

## 调试
1. 在 WebStorm 的【Terminal】窗口运行 `npm start`。  
    > 也可以按照如下配置，就象配置 Java 项目一样，添加启动项，然后直接点击小虫子左边的三角启动项目。  
    ![](./images/WebStormDebugReact08.png)
    ![](./images/WebStormDebugReact09.png)
1. 选择刚才添加的【JavaScript Debug】启动项【jsDebug】，点击 Debug 按钮（小虫子），会打开 chrome 窗口，这时候的操作便会触发调试，尽情享受编程的乐趣吧~~~  
    ![](./images/WebStormDebugReact10.png)
    ![](./images/WebStormDebugReact11.png)
