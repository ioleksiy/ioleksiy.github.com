--- 
layout: post
title: Another RestAPI accessor for .Net
tagline: C#
tags: [API, C#, Rest, rest4net, RestFull, Services, web-service]
---
{% include JB/setup %}

Some time has passed after I have launched the open-source library to access <a href="/2010/06/17/google-storage-api-with-c-sharpgs-try-it/">Google Storage Rest Api</a>. By that time there was a problem accessing the REST service of google. The solution I have found was a great library named <a class="offsite-link-inline" href="http://restsharp.org/" target="_blank">RestSharp</a>. On the first glance it came, that library is very handy and lightweight. For sure, developers of it are great people and professionals. But, when it came to customize the RestClient for GS api needs, it found out that it is very hard and not intuitive to extend the flexibility of this library.

That's why I have developed some small and light solution for simple RestApi requests. Have named it <a class="offsite-link-inline" href="http://github.com/ioleksiy/Rest4Net" target="_blank">Rest4Net</a>.

## The body

The most of the functionality you need to do, is to inherit your class from <a class="offsite-link-inline" href="http://github.com/ioleksiy/Rest4Net/blob/master/Rest4Net/Connector.cs" target="_blank">Rest4Net.Connector</a>.

And that's almost all. You need to implement constructor and methods, your client class will return.

If response from the server is Xml or Json, this library can parse response into object (like deserialisation). If you need some array field, mark it as "IList&lt;&gt;" please.

For example, I have made an implementation of <a class="offsite-link-inline" href="http://bit.ly/" target="_blank">Bit.ly</a> service client <a class="offsite-link-inline" href="http://github.com/ioleksiy/SharpBitLy" target="_blank">here</a>.

How to use the service demo application is <a class="offsite-link-inline" href="http://github.com/ioleksiy/SharpBitLy/blob/master/SharpBitLy.Demo/Program.cs" target="_blank">here</a>.

Hope, this library will help someone. ;)