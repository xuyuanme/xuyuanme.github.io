---
layout: post
title: "React Native iOS: The resource could not be loaded because the app transport security policy requires the use of a secure connection"
category: 技术
tags: [React Native,iOS]
description: "<p>Latest iOS blocks cleartext HTTP (http://) resource load since it is insecure. For development purpose, it can be disabled:</p>"
---

Adding the following to project Info.plist to disable ATS(Application Transport Security):
{% highlight sh %}
<key>NSAppTransportSecurity</key>
<dict>
<key>NSAllowsArbitraryLoads</key><true/>
</dict>
{% endhighlight %}

[react-native #1563](https://github.com/facebook/react-native/issues/1563)
