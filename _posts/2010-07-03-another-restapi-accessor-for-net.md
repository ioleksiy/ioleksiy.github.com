--- 
layout: post
title: Another RestAPI accessor for .Net
tagline: C#
tags: [API, C#, Rest, rest4net, RestFull, Services, web-service]
---
{% include JB/setup %}

Some time has passed after I have launched the open-source library to access [Google Storage Rest Api][1]. By that time there was a problem accessing the REST service of google. The solution I have found was a great library named [RestSharp][2]. On the first glance it came, that library is very handy and lightweight. For sure, developers of it are great people and professionals. But, when it came to customize the RestClient for GS api needs, it found out that it is very hard and not intuitive to extend the flexibility of this library.

That's why I have developed some small and light solution for simple RestApi requests. Have named it [Rest4Net][3].

## The body

The most of the functionality you need to do, is to inherit your class from [Rest4Net.Connector][4].

And that's almost all. You need to implement constructor and methods, your client class will return.

If response from the server is `Xml` or `Json`, this library can parse response into object (like deserialisation). If you need some array field, mark it as `IList<>` please.

For example, I have made an implementation of [Bit.ly][5] service client [here][6].

How to use the service demo application is [here][7].

Hope, this library will help someone. ;)

[1]: /2010/06/17/google-storage-api-with-c-sharpgs-try-it/                         "Google Storage API with C#. SharpGs. Try it"
[2]: http://restsharp.org/                                                         "RestSharp"
[3]: http://github.com/ioleksiy/Rest4Net                                           "Rest4Net on Github"
[4]: http://github.com/ioleksiy/Rest4Net/blob/master/Rest4Net/Connector.cs         "Rest4Net.Connector Example Code"
[5]: http://bit.ly/                                                                "Bit.ly Service"
[6]: http://github.com/ioleksiy/SharpBitLy                                         "Bit.ly connector on Github"
[7]: http://github.com/ioleksiy/SharpBitLy/blob/master/SharpBitLy.Demo/Program.cs  "Demo application on Github"