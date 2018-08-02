## 准备工作

1、Object.defineProperty这个API是MVVM框架实现双向绑定的核心API，详细请查看<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty">MDN - Object.defineProperty</a>

2、javascript设计模式之观察者模式，详细请查看<a href="https://blog.csdn.net/she5684346/article/details/81043913">简单通俗理解js设计模式之观察者模式</a>

我们来看下Vue.js是怎么设计的：

<img src="https://cn.vuejs.org/images/data.png">

## 设计模块
1、模板编译(Compile)：此模块主要负责表达式、指令编译。

2、监听者(Observer)：此模块主要给data数据添加getter和setter，并且把data里的数据添加到观察者列表，当数据其中一个有变化时通知观察者列表更新。

3、观察者列表(Dep)：此模块主要负责管理观察者列表，当getter触发时添加观察者到列表，当setter触发时通知所有观察者更新数据。

4、观察者(Watcher)：此模块主要负责数据观察，一旦数据有变化通知更新视图。

## 总结
代码的实现借鉴了官方和一些前人分析的思路。在学习过程中，学到了很多平常不常用的一些API，理解了一些底层、设计模式的知识。<a href="https://github.com/Tanghailun/VueSimpleEdition">源码下载地址</a>
