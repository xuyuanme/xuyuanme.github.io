---
layout: post
title: "clickthrough: 使用Sencha Touch和PhoneGap快速创建跨移动平台Demo程序"
category: 技术
tags: [Sencha,PhoneGap]
description: "<p>有时手机应用项目需要在现有设计图的基础上快速创建Demo程序为客户或相关干系人进行演示，而这样的Demo却往往很难在一两天之内完成，开发出来的代码后期也很难重用。如果涉及到iOS, Android, WP等多个平台，更是难以在短时间内召集各种平台技术人员来为这一个Demo工作。</p>"
---
{% include JB/setup %}

为了解决这类问题，我新建了[<i class="icon-share"></i> clickthrough](https://github.com/xuyuanme/clickthrough)项目。clickthrough使用[<i class="icon-share"></i> Sencha Touch](http://www.sencha.com/products/touch/)控制设计图的点击区域以及页面跳转，使用[<i class="icon-share"></i> PhoneGap](http://phonegap.com/)为各个移动平台打包分发应用程序。

开发（或者设计）人员所要做的，只是1). 提供高保真设计图; 2). 使用Json格式定义各页面点击区域与跳转关系。设计人员甚至不需要开发的帮助，也不需要搭建各移动平台的开发环境，就可以创建native的demo应用程序。

Github项目详见: [https://github.com/xuyuanme/clickthrough](https://github.com/xuyuanme/clickthrough)