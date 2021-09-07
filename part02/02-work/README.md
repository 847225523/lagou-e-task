# 一、简答题

#### 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

　1、配置初始化
webpack会首先读取配置文件，执行默认配置

2、编译前准备
webpack 会实例化compiler，注册plugins、resolverFactory、hooks。

3、reslove前准备
webpack 实例化compilation、NormalModuleFactory和ContextModuleFactory

4、reslove流程
解析文件的路径信息以及inline loader和配置的loader合并、排序

5、构建module
runLoaders处理源码，得到一个编译后的字符串或buffer。将文件解析为ast，分析module间的依赖关系，递归解析依赖文件

6、生成chunk
实例化chunk并生成chunk graph，设置module id，chunk id，hash等

7、资源构建
使用不同的template渲染chunk资源

8、文件生成
创建目标文件夹及文件并将资源写入，打印构建信息

　

　

#### 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
loader主要是处理非js文件，因为webpack只会处理js文件，所以
loader：用于对模块源码的转换，因为webpack本身只支持js处理，loader描述了webpack如何处理非javascript模块，并且在build中引入这些依赖。loader可以将文件从不同css预处理转换为css,将ts转换为JavaScript，或者将内联图像转换为data URL。比如说：sass-loader、css-Loader，style-Loader、file-loader等。
plugin：plugin通过webpack钩子机制实现，相比于loader,plugin拥有更宽的能力。其目的在于解决loader无法实现的其他事，从打包优化和压缩，到重新定义环境变量，功能强大到可以用来处理各种各样的任务。 plugin开发：plugin被要求必须是一个函数或者是包含apply方法的对象。入参是一个compiler对象，其包含构建所需信息，开发时可以通过compiler中hooks属性访问到emit钩子，并通过其tap方法注册一个钩子函数，定制钩子名称和挂载函数。该函数入参为compilation打包上下文，通过遍历compilation下assets的所有键得到所有文件名称。然后根据 键 的source（）方法拿到对应的content内容，然后对content进行一些处理，并返回给souce函数，以达到我们的插件目的。
开发loader：
module.exports = (source)=>{
    return result(source)
}
开发plugin：用class类实现
class MyPlugin {
    apply (compiler) {
      console.log('MyPlugin 启动')
  
      compiler.hooks.emit.tap('MyPlugin', compilation => {
        // compilation => 可以理解为此次打包的上下文
        for (const name in compilation.assets) {
          console.log(name)
        }
      })
    }
  }
　
　

　

　

# 二、编程题

#### 1、使用 Webpack 实现 Vue 项目打包任务

具体任务及说明：

1. 在 code/vue-app-base 中安装、创建、编辑相关文件，进而完成作业。
2. 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
3. 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
4. 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
5. 尽可能的使用上所有你了解到的功能和特性



**提示：(开始前必看)**

在视频录制后，webpack 版本以迅雷不及掩耳的速度升级到 5，相应 webpack-cli、webpack-dev-server 都有改变。

项目中使用服务器的配置应该是改为下面这样：

```json
// package.json 中部分代码
"scripts": {
	"serve": "webpack serve --config webpack.config.js"
}
```

vue 文件中 使用 style-loader 即可

**其它问题, 可先到 https://www.npmjs.com/ 上搜索查看相应包的最新版本的配置示例, 可以解决大部分问题.**



#### 作业要求

本次作业中的编程题要求大家完成相应代码后

- 提交一个项目说明文档，要求思路流程清晰。
- 或者简单录制一个小视频介绍一下实现思路，并演示一下相关功能。
- 最终将录制的视频或说明文档和代码统一提交至作业仓库。