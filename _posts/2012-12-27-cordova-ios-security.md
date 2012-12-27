--- 
layout: post
title: Cordova (PhoneGap) iOS Security
tagline: hobby
tags: [encryption, html, ios, javascript, phonegap, cordova, security]
---
{% include JB/setup %}
{% assign gist_id = 4387663 %}

Almost a year ago I wrote an article about [securing PhoneGap source files on iOS platform][1].

There were a lot of questions, and private emails, that's why I have actualized the description a bit, and made new manual.

NOTE: using this method will not secure your javascript code 100%, but will help a lot to protect it from a lot of hackers. This methid ONLY works for iOS.
 
## The idea

The main idea at the moment contain 2 steps:

1. Prepare single-file application inside `index.html` and encrypt it with key.
2. Put decryption mechanism into XCode application while loading the html.

At step #1 better to embed all CSS, JS and even images into one file, so it will a hacker less holes to get in.

At step #2 your encryption key will be stored in binary mode, so only very experienced hackers will try to find it. 

## Preparing index.html

Once you have developed your application with cordova, we need to encrypt it. For this purpose I have made a small tool, as previously a lot of things was not working in right way.

To install the tool, you should install [NodeJS][2] and [NPM][3] like it described [here][4].

Then you should install my small tool [corc][5] through Mac OS terminal:

`npm install -g cordovacrypt`

Maybe, you will need to use `sudo`.

To run encryption you should execute:

`corc KEY FILEIN [FILEOUT]`

Where:

* KEY - your key without spaces and any bash illegal symbols.
* FILEIN - path to the index.html file which should be encrypted.
* FILEOUT - optional parameter where to save encrypted file. If not specified, original will be rewritten.

Example:

`corc mySecretKey index_original.html index.html`

Now you have prepared index.html file.

## Making changes to XCode application

Make sure, you have created a new Cordova application like it is written [here][6], and make next steps:

1. Once the application is ready, open project inside XCode, and go to the `Project Navigator`.
2. There you will see the `www` item, `*YourProjectname*.xcodeproj`, etc.
3. Unfold `.xcodeproj` item and than `Classes` > `Cleaver` and select `CDVViewController.m`.
4. In the center you will see the source code of `CDVViewController.m`.
5. Find the line `- (void)viewDidLoad`. This is a method on view loading.
6. Scroll down to the end of this method (the last `if` statement), where will be the line: `if (!loadErr) {`.

You should remove everything inside this `if` statement, except body of `else` statement. And paste next code into `if` statement:

{% assign gist_file = "gistfile2.m" %}
{% include gist.html %}

This code will hook the index.html load and give it a different content.

Now after the method `viewDidLoad` (or before, it is up to you), insert 2 more service methods, which will actually decode the encrypted index.html:

{% assign gist_file = "gistfile1.m" %}
{% include gist.html %}

In line 17 you may see a strange string `ffffffffffffffffffffffff` - this is your encryption password. Replce it with yours.

The last thing you should add into this file are two includes. Go to the top of the file, and after all `#import` directives add:

1. `#import <CommonCrypto/CommonCryptor.h>`
2. `#import <CommonCrypto/CommonDigest.h>`

At this point you can compile the code and see that it is working!

[1]: /2011/09/20/phonegap-application-encryption/                                "PhoneGap (newely Cordova) Application Encryption"
[2]: http://nodejs.org/                                                          "NodeJS"
[3]: https://npmjs.org/                                                          "NPM"
[4]: http://shapeshed.com/setting-up-nodejs-and-npm-on-mac-osx/                  "Setting Up Node.js and Npm on Mac OSX"
[5]: https://npmjs.org/package/cordovacrypt                                      "Cordova Crypt Tool"
[6]: http://docs.phonegap.com/en/2.2.0/guide_getting-started_ios_index.md.html   "PhoneGap: Getting Started with iOS"
