---
layout: post
title: "用Javascript拥抱2016(一): Node.js, React, React Native, Redux, and more"
category: 技术
tags: [Javascript,React,React Native,Redux,Node.js]
description: "<p>相信使用同一个平台和技术开发Web, iOS, Android是很多程序员的追求，也是很多创业公司和产品经理的梦想。而如果核心的业务逻辑代码能够跨平台共用，那更是梦寐以求的事情了。试想，创业公司不用再忍受Android/iOS应聘者的拒绝，只要招几个互为备份的Javascript开发就可以搞定跨平台开发；同一个业务Bug不再担心iOS改好了而Android还没fix，只要改一行JS代码就可以修正各平台；iOS App可以实现即时部署，再也不用在线上bug火烧眉毛的时候还得等待苹果漫长的审核期；如此种种，程序员和产品经理终于可以和谐相处了 :D</p>"
---

好吧，上面的这些场景还没有完全实现，不过Facebook在2015年推出的React Native让它们看起来更有希望实现了。曾经，开发者们尝试通过各种方式来进行跨平台开发，例如[移动端HTML5](http://techcrunch.com/2012/09/11/mark-zuckerberg-our-biggest-mistake-with-mobile-was-betting-too-much-on-html5/)，以及用[C++实现核心业务逻辑](http://oleb.net/blog/2014/05/how-dropbox-uses-cplusplus-cross-platform-development/)等等。但前者在移动端的性能无法匹敌原生程序，用户体验有明显差别，后者会导致开发和维护的技术成本增加。而React的出现至少让跨平台开发多了一种选择，而且是看上去更美好的选择。

## 开源实例

本系列的文章以两个程序例子([NodeTwitter](https://github.com/xuyuanme/NodeTwitter)和[ReactTwitter](https://github.com/xuyuanme/ReactTwitter))来实现一个简单的Twitter客户端，简单到只在用户授权登录后在首页显示"Hello {username}"。 但这个简单的例子基本涵盖了前后端程序交互的各方面，其中，NodeTwitter是服务端程序，负责与Twitter的OAuth和REST API进行通讯；ReactTwitter是前端程序，使用React展示Web界面，React Native展示App界面，而跨平台的界面通过Redux共享代码与服务端NodeTwitter进行交互。详情可以参照下图：

![ReactTwitter Arch](http://xuyuan.me/img/react-twitter-arch.jpg)

本系列文章的主旨是尝试利用Javascript技术栈进行跨平台的开发实践，并不包括如何使用React进行UI开发等。关于React和React Native的开发教程，网上已经有了很多很好的文章 [1](https://github.com/enaqx/awesome-react) [2](https://github.com/jondot/awesome-react-native)，大家可以参考。

## 技术栈

- IDE: [Sublime Text 3](http://www.sublimetext.com/3)

  在尝试过Webstorm, Atom, VS Code之后，还是觉得Sublime Text最轻便灵活。在Javascript各种框架乱战的时代，似乎任何一个试图做到大而全的IDE都或多或少会有一些缺陷。相反Sublime Text的小巧以及丰富的插件使它能够应对各种要求。未来看好微软出品的VS Code，也许终有一天会出现类似Visual Studio或Xcode的Javascript事实标准IDE。
  
- 静态代码检查：[ESLint](http://eslint.org/) + [SublimeLinter](http://sublimelinter.com)
- 服务端：[Node.js](https://nodejs.org/) + [Express](http://expressjs.com/)
- Web端程序：[React](https://facebook.github.io/react/)
- App端程序：[React Native](https://facebook.github.io/react-native/)
- 共享业务逻辑和数据：[Redux](https://reduxframework.com/)
  - [react-redux](https://github.com/rackt/react-redux): 进行React与Redux的绑定，例如将业务数据和函数绑定到UI
  - [redux-thunk](https://github.com/gaearon/redux-thunk): Redux中间件，用以推迟代码的异步执行，例如在数据访问完成后再执行回调
- 编译，部署和ES6支持：[Webpack](https://webpack.github.io/) + [Babel](https://babeljs.io/)
- 实时调试：[react-transform-hmr](https://github.com/gaearon/react-transform-hmr)

## 运行界面

![ReactTwitter Screen](http://xuyuan.me/img/react-twitter-screen.jpg)

[NodeTwitter](https://github.com/xuyuanme/NodeTwitter)和[ReactTwitter](https://github.com/xuyuanme/ReactTwitter)的例子可以在Github上找到，ReactTwitter目前只包括Web和iOS平台，程序的详细内容会在后继的文章中进行说明。
