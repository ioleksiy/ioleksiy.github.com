--- 
layout: post
title: PhoneGap Application Encryption
tagline: hobby
tags: [encryption, html, ios, javascript, phonegap, security]
---
{% include JB/setup %}
{% assign gist_id = 1960145 %}

This time I am writing about PhoneGap Application security.

It happened that I was involved into a simple iPhoneApp development. The reason, why we have selected PhoneGap is simple - nobody knows Objective C. So, during a month team was developing an iPhone application with PhoneGap API. And when we have got a first compilable and functional sample, it occurs, that "app" file could be unpacked as zip archive, and all our javascript is visible and readable.

There were 2 solutions we could jump into:

1. Move to Objective C
2. Secure the javascript code

Item #1 for our team was complicated and long in time to learn.

Item #2 could be a way, but there was a need to read secured code from PhoneGap-based application. So, here was also 2 ways - secure with javascript encryption like [JJEncode][1], or to encrypt javascript, which will be inside `app` file, and decrypt it in memory on application lunch and put into WebView context. And we have took the second way.

## The Way
Now let me explain the method, how in theory the encryption is made.

We have some build scripts, and nobody is working in XCode with javascript and html. All of us are using favorite source editors for it. XCode is used only to build a project for deployment and test. So, we have build scripts:

1. Script is parsing `index.html`, and include all references to javascript/css/images inside this one html file. In this way, we have bundled application inside one index.html file.
2. Script is encrypting `index.html` with `AES 256bit` encryption and put this file into XCode project as resource (please, note this).
3. XCode build is running and generating app-file.

## PhoneGap Patch

The PhoneGap library was patched to support decoding of the index.html with provided key and load this memory block into WebView. I have shared the modifiew PhoneGap sourcecode at [Github][2]. To use it, you should manually build the library from sourcecode and install it. Don't forget, that PhoneGap library now is trying to search for an encrypted "index.html" resource file.

## Providing Key

Sure, you need to provide key for patched PhoneGap framework to decrypt your source code.

Inside your `AppDelegate.m` file, add a method:

{% assign gist_file = "01.m" %}
{% include gist.html %}

Here you see, that your's 256bit key is 32 `f` symbols.

## You see the finish

Yes, that is all. Now your's html will be decrypted and loaded into WebView on iApp start, and there will not be files unsecured insude your app.

That is right, that someone can decompile objective c code to find out the key, but this is a bit harder than if you show all your sources from zip.

## P.S.
At the end, maybe you will need a method to encrypt your html file. I have it only for php:

{% assign gist_file = "02.php" %}
{% include gist.html %}

[1]: http://utf-8.jp/public/jjencode.html          "JJEncode"
[2]: https://github.com/ioleksiy/phonegap-iphone   "PhoneGap iPhone"