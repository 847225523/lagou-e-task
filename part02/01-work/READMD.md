## 简答题

**1、谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值。**

答:工程化是一种思想，而不是某种技术。其主要目的为了提高效率和降低成本，即提高开发过程中的开发效率，减少不必要的重复工作时间等
比如：利用脚手架快速搭建项目结构
还有规范代码的结构
自动化构建等

　

　

**2、你认为脚手架除了为我们创建项目结构，还有什么更深的意义？**

答:减少重复性的工作，不需要复制其他项目再删除无关代码，或者从零创建一个项目和文件。
可以根据交互动态生成项目结构和配置文件。
多人协作更为方便，不需要把文件传来传去

　

　

## 编程题

**1、概述脚手架实现的过程，并使用 NodeJS 完成一个自定义的小型脚手架工具**

通用型脚手架工具yeoman的使用：
首先全局安装 npm install -g yo
因为yeoman是根据gererator来生成的，所以当我们想要生成node的模块时，我们就需要安装gererator-node
其次若我们想要进行eslint配置，进行babel编译，可以执行这个命令yo node:cli
然后执行yarn link这个命令

　

**2、尝试使用 Gulp 完成项目的自动化构建**  

(html,css,等素材已经放到code/pages-boilerplate目录)

　

　

## 说明：

本次作业中的编程题要求大家完成相应代码后

- 提交一个项目说明文档，要求思路流程清晰。
- 或者简单录制一个小视频介绍一下实现思路，并演示一下相关功能。
- 说明文档和代码统一提交至作业仓库。