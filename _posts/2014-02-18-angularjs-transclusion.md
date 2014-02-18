---
layout: post
title: "AngularJS Directives: Using Transclusion Part2"
category: 技术
tags: [AngularJS]
description: "<p>除了<a href='/2014/02/16/angularjs-transclusion.html'>上文</a>中使用的ng-transclude，AngularJS还有其他两种方式可以引用transclude directive的内容：compile方法和directive controller:</p>"
---

{% highlight javascript %}
myModule.directive('myDirective', function() {
    return {
        transclude: true, // first set transclude to true (or element)
        compile: function(element, attrs, transcludeFn) { ... }; // 1). use transclude in compile function
        controller: function($scope, $transclude) { ... }, // 2). use transclude in directive controller
    };
});
{% endhighlight %}

其中在compile阶段引用transclude的方式如下:
{% highlight javascript %}
compile: function(element, attrs, transcludeFn) {
    return function postLink(scope, element, attrs, controller) {
        var newScope = scope.$parent.$new();
        element.find('p').first().append(transcludeFn(newScope));
    };
}
{% endhighlight %}

使用directive controller访问$transclude的方式如下:
{% highlight javascript %}
controller: function($scope, $element, $transclude) {
    $element.find('p').first().append($transclude());
}
{% endhighlight %}
