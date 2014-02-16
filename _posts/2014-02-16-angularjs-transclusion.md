---
layout: post
title: "AngularJS Directives: Using Transclusion"
category: 技术
tags: [AngularJS]
description: "<p>下面的例子展示了如何使用AngularJS directive中的transclude属性</p>"
extra_js:
 - /assets/angular/angular.js
 - https://rawgithub.com/xuyuanme/9032546/raw/adf27cde53b35b569294e27639863f9101fa6419/app.js
 - https://rawgithub.com/xuyuanme/9032862/raw/51f6b54455e91e930f44dd42fb060a09536df1f5/directive.js
---

示例：
  <div ng-app="app" ng-controller="AlertController" class="well">
    <alert ng-repeat="alert in alerts" type="alert.type" close="closeAlert($index)">{[{alert.msg}]}</alert>
    <button class='btn' ng-click="addAlert()">Add Alert</button>
  </div>

html文件：
{% gist 9034381 %}

app.js文件：
{% gist 9032546 %}

directive.js文件：
{% gist 9032862 %}