--- 
layout: post
title: Using MvcMiniProfiler with NancyFX
tagline: C#
tags: [nancy-fx, mvc, profiler]
---
{% include JB/setup %}
{% assign gist_id = 1977951 %}

Lately, some new interesting web-development frameworks appeared based on mvc concept. Some of them are totally new experience, but others are using the best experience from different technologies and languages.

## Ruby On Rails Clones
[Sinatra][1] - is one of the smoothest and intelligent frameworks I've ever seen. When Ruby became famous, a lot of things were ported from this language, to others. I've even investigated a PHP port named [Slim Framework][2], and it is really fantastic as for PHP.

[NancyFX][3] has appeared at the end of 2010 and day-by-day they have damage the brain of the C# coding society (the web development part). With this, many interesting tools as [MiniProfiler][4], should be also available for use with NancyFX.

## NancyFX and MiniProfiler

On some stage of coding with `NancyFX`, I've got a need to measure the performance of it. There were no doubts, that `MvcMiniProfiler` will do the job. As I have not found a working solution for this, I'm posting it here.

All you need to do, is create a custom bootstrap for `NancyFX`. How to make it, please read [here][5].

Than you have to override some methods of custom bootstrap, so the profiler will be injected into code.

{% assign gist_file = "01.cs" %}
{% include gist.html %}

MvcMiniProfiler is describing how to inject the header into template and how to run tests very good on their site, so I am not touching this theme.

The example of profiler usage:

{% assign gist_file = "02.cs" %}
{% include gist.html %}

[1]: http://www.sinatrarb.com/  Visit Website of SinatraRb
[2]: http://www.slimframework.com/  Good Php clone of Sinatra FW
[3]: http://nancyfx.org/  Nancy Actually
[4]: http://code.google.com/p/mvc-mini-profiler/  MvcMiniProfiler on Google Code
[5]: https://github.com/NancyFx/Nancy/wiki/Bootstrapper  NancyFX bootstrapper