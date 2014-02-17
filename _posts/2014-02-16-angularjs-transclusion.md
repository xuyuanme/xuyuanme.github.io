---
layout: post
title: "AngularJS Directives: Using Transclusion Part1"
category: 技术
tags: [AngularJS]
description: "<p>下面的例子展示了如何使用AngularJS directive中的transclude属性。使用transclude属性，可以将自定义指令元素中的内容以正确的作用域解析，然后再放回指令模板中标记的位置。</p>"
extra_js:
 - /assets/angular/angular.min.js
 - /assets/posts/20140216/app.js
 - /assets/posts/20140216/directive.js
---

> directive中transclude的属性值可以设置为true或'element', 含义分别为：

> - `transclude: true` transclude使用directive的子元素的内容，如以下例子所示
> - `transclude: 'element'` transclude使用directive的整个元素内容，例如AngularJS的ng-repeat directive

**示例：**
<div ng-app="app" ng-controller="AlertController" class="well" ng-cloak>
  <alert ng-repeat="alert in alerts" type="alert.type" close="closeAlert($index)">{[{alert.msg}]}</alert>
  <button class='btn' ng-click="addAlert()">Add Alert</button>
</div>

**html文件：**
{% highlight html %}
<div ng-app="app" ng-controller="AlertController" class="well" ng-cloak>
  <alert ng-repeat="alert in alerts" type="alert.type" close="closeAlert($index)">{[{alert.msg}]}</alert>
  <button class='btn' ng-click="addAlert()">Add Alert</button>
</div>
{% endhighlight %}

**app.js文件：**
{% highlight javascript %}
angular.module('app', ['alert-directive'])

    .controller('AlertController', function ($scope) {
        $scope.alerts = [
            { type: 'error', msg: 'Oh snap! Something went wrong.' },
            { type: 'success', msg: 'Well done! It worked out in the end.' }
        ];

        $scope.addAlert = function () {
            $scope.alerts.push({msg: "Watch out - another alert!"});
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
    })

    // this is used to avoid confliction when compile blog with Jekyll
    .config(function ($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    });
{% endhighlight %}

**directive.js文件：**
{% highlight javascript %}
angular.module("alert-directive", [])

    .directive('alert', function () {
        return {
            restrict: 'EA', // support to be used as an element or an attribute
            replace: true, // tells the compiler to replace the original directive's element with the template given by the template field
            template: '<div class="alert alert-{{type || \'info\'}}">' +
                '<button type="button" class="close" ng-click="close()">&times;</button>' +
                '<div ng-transclude></div>' + // the ng-transclude directive gets the transcluded elements and appends them to the element in the template on which it appears
                '</div>',
            transclude: true, // tells the compiler to extract the contents of the original <alert> element and make them available to be transcluded into the template
            scope: { // create an isolated scope
                type: '=', // the = symbol indicates that AngularJS should keep the expression in the specified attribute and the value on the isolated scope in sync with each other
                close: '&' // the & symbol indicates that the expression provided in the attribute on the element will be made available on the scope as a function
            }
        };
    });
{% endhighlight %}
