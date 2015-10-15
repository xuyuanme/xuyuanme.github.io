---
layout: post
title: "Ubuntu Dropbox无法同步问题"
category: 技术
tags: [Dropbox]
description: "<p>'Can't access Dropbox folder'问题的解决办法</p>"
---

发现Ubuntu上的Dropbox不能正常同步了，检查显示Dropbox正在运行：

{% highlight sh %}
# ~/.dropbox-dist/dropboxd
Another instance of Dropbox (2622) is running!
{% endhighlight %}

但状态出现异常：

{% highlight sh %}
# ~/Dropbox/Unix/scripts/dropbox.py status
Can't monitor Dropbox folder (Click to fix)
Can't access Dropbox folder
Syncing (39 files remaining)
{% endhighlight %}

解决方法：http://askubuntu.com/questions/247461/how-do-i-fix-a-cant-access-dropbox-folder-error

{% highlight sh %}
# sudo sysctl fs.inotify.max_user_instances=256
fs.inotify.max_user_instances = 256
# sudo sysctl fs.inotify.max_user_watches=1048576
fs.inotify.max_user_watches = 1048576

# ~/Dropbox/Unix/scripts/dropbox.py stop
Dropbox daemon stopped.
# ~/Dropbox/Unix/scripts/dropbox.py start
Starting Dropbox...Done!
{% endhighlight %}

(dropbox.py的说明见http://www.dropboxwiki.com/tips-and-tricks/using-the-official-dropbox-command-line-interface-cli)
