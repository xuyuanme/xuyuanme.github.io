---
layout: post
title: "Demystifying iOS certificates and provisioning files"
category: 技术
tags: [iOS]
description: "网上看到一篇blog, 对iOS程序发布过程中Certificate, App Identifier, Device UDID, Provisioning Profile等概念做了详细的解释，可以帮助不了解的人对iOS程序签名机制有一个比较清晰的理解。"
---
{% include JB/setup %}

The original post is from: [<i class="icon-share"></i> ESCOZ](http://escoz.com/blog/demystifying-ios-certificates-and-provisioning-files/)

Any iOS developer will tell you that one of the most confusing parts of developing for iOS is getting the app to actually run on real devices, because of all the work involved getting certificates working. Even for those who understand how certificates in general work, it's still kind of weird to get everything to work correctly. This is going to be a long post, but hopefully it'll be used for some of you.

To better understand why we need to go thru all this, you need to always remember the main reason behind it:

>Apple, and only Apple, can really allow a hardware device to run a piece of software, period.

Yes, this is a very strict rule, many people don't like it, but Apple really enforces with an iron fist. This rule is enforced in software using cryptographic signatures, and every time an app starts up, the app is checked to make sure it was signed by Apple and that you have permission to run it. There are ways to override this by jailbreaking a device and then hacking the software, but that's really not a good option for most people.

##Apple Digital Certificates

Ok, so if only Apple can run software, how can developers run software for testing? The short answer is that Apple basically trusts you to allow apps on Apple's behalf. The long answer is long, and here's where everything starts.

When you're registered in the iOS Developer program, Apple allows you to request one very special certificate that can be used to sign things (and apps) on Apple's behalf. You do that by creating a Certificate Signing Request (CSR) using the Keychain Access app. When you go thru the "Request a Certificate from a Certificate Authority" assistant two things happen:

- First, Keychain app will create a public and a private key for you automatically. They can be seen in the "Keys" category in Keychain. These keys are REALLY important: they are basically used to tell Apple who YOU are. Do not EVER loose these files, unless you want to want to go thru this process again. Make backups, etc.

- Finally, Keychain uses those keys to create a certSigningRequest file that you send to Apple. That file basically contain your name, email, and public key, and is signed using your private one, so that Apple knows for sure you created it.
Now, you'll upload that CSR to Apple, and Apple will confirm everything is ok and then issue you a development certificate. You can download the "developer_identity.cer"  file to your system, and then drag-and-drop it to Keychain Access. This new certificate will now show in the "My Certificates" category. Double-click it and you'll see the details: this is a simple certificate, issued by Apple, that simply says that they really trust who you are. This will be used later on when signing apps.

##Provisioning Files

So the first step is complete: you have a certificate from Apple, saying who you are and that can be used to sign apps. Is that it, though? No. Your iPod/iPhone or iPad still doesn't know that it can trust you and not Apple, and that's where the provisioning files come in.

When you create a provision file, you're basically associating the iOS devices you have listed in the Provisioning Portal with the certificate signed by Apple in the previous step. The result of that is a .provision file, that is used during the compilation process of an iOS app, and also needs to be deployed to the device. To install this provision file, simply download it and double-click it: x-code will automatically add it to the list of provisioning profiles in the Organizer.

You can have multiple provision files, one for each project you work on, or use just one provision file for all your apps. If you have just started a new app, or still are in early stages of development, the simple thing to do is to just use one provision for development. Eventually, though, you might need to create specific provision files for each app, because the AppId added in the provisioning portal is compared to what is configured in the app, and you'll have to set the AppId on your app to submit to the store.

##Building an App and Running It

So lets recap: you already have your private and public keys that define who you are, the certificate from Apple saying it knows who you are, and a provision file saying that code built by you is allowed to run on your devices. Now its time to build the app.

I won't explain in details here how to set up Xcode or MonoTouch to build the app, there's a million tutorials for that out there. The only thing I'll mention is that you'll have to tell your build tool to use both your signed certificate and the provision file.

When you run the build, using either MonoTouch or Objective-C, all you're doing is creating a directory that contains all the things your app needs inside. If you right-click on the final app and show the contents of the directory, besides all the normal project files and resources you'll also see two other things:

- The actual provision file. This is just a straight copy of the file you already have.

- A directory called "_CodeSignature". This is the interesting one. Inside it there's one file called "CodeResources"; it's a simple plist file, but it contains cryptographic hashes of all the other files in the solution.
When the application is finally installed, iOS does a lot of things: first, it makes sure the provision file is signed by Apple. Then, it compares each one of the hashes in the CodeResources against the real files, using the provision key, to make sure the files haven't been modified since the build. If there are any problems, the app won't be installed.

The last check happens when you run the app. iOS checks that the app hasn't been modified, and that you still have a provision file that matches the app you're trying to run. If you do not have one anymore, the app will crash.

##Other Deployments

Ad-hoc deployment works pretty much the same way as written above. You still register all of your users devices, and everything works the same way.

Enterprise deployment though, is a bit different. When you're a big company with thousands of iPhone users, Apple tends to like you and they trust you a lot more: they basically give you a certificate that allows you to re-sign your application as if you were really Apple. For all purposes, all iOS devices will automatically recognize you and will run the app with no problem, so you don't need to register devices in the provision file. Other than that, everything else is the same.

Finally, there's App Store deployment. Like the enterprise deployment, there's no need to register devices in the provision file. The difference though, is that the signature in the provision file you get from Apple doesn't allow you to run anywhere! You won't be able to run the application build for the AppStore anywhere; the only thing you can do with it is submit it for the AppStore approval.

When Apple receives your App, it's been already signed by you and contain the provision file, so they know you're really the correct person submitting the app, and that the App is the one that should be approved. After its reviewed, they finally re-sign the app with their own signature that can run on any phone.

--------
Writing this post has actually helped me understand better the entire process, and I hope it help others as well. I hope everything here is correct, but if you see any problems please leave a message and I'll fix it!
