--- 
layout: post
title: Belz. Using AppHarbor as .Net worker mule
tagline: C#
tags: [C#, api, messaging, background worker, task]
---
{% include JB/setup %}
{% assign gist_id = 2653956 %}

We are living at a time, when everyday brings something brand new and fantastic. For a lot of time already I am keeping an eye on [AppHarbor][1] service. Shared .Net hosting became free and usable. More than that, AppHarbor allows you to run not only websites, but daemons (services/workers), which are created from simple console application.

Lately, I have discovered [Iron.IO][2], which provides stable distributed messaging protocol, and even dynamic workers module. Unfortunately, they do not support .Net for workers yet. This article provides an information on how to implement almost free daemon for your needs.

## Design

When you need a background process to process some jobs, the main parts of it should be:

* Queue of messages;
* API calls to messages queue to enqueue/dequeue messages;
* Daemon application.

Today, all these parts could be made/used with almost no cost involved.

## Queue of messages

With all today tools and services, there is no need to develop bicycle again and again. There already are numerous count of services, which provides queue messaging with even no cost for starting project.

Everything I have investigated, are:

* [IronMq][3];
* [CloudAMQP][4] (RabbitMQ code inside)

Both of them are almost the same, but I recon API of IronMq is a bit better.

## API calls to messaging queue

To manage the queue, we need an API connection to it. IronMQ provides such functionality with next methods:

* Enqueue message(s);
* Dequeue message(s).

More than that, after dequeue from IronMq, message is not deleted from server actually, but waits a timeout to be returned back (for example your code has an exception). It will be removed from server only after deletion of message.

NOTE: IronMQ is a paid service, where 10000 requests costs 1 US cent (the price for today). If you are requesting queue to check for messages every second, it will cost you about 3 US dollars per month. If you are processing a lot of messages during each request - that is not a price for good service.

## Daemon application

This is the most sweet part of whole article. You can create a separate windows service, which will work as daemon. Inside daemon, it will be good to create several parallel threads for workers. Best way would be, if your daemons are set up on different servers, to scale the work. And surely, you need to host it somewhere.

Let's code some worker, which will calculate fibonacci value and push the result to your iPhone, through [Prowl][5]. My proposal is using AppHarbor as daemon hosting and IronMq as message queue service. As daemon kernel, we will use [Belz][6] project.

## 10 minutes of development

First of all you have to register an account at AppHarbor.

Now login to the system and inside "Applications" section create an application "Belz Try".

Go to "Addons" section, and select IronMQ addon to be installed. Inside "Configuration variables" section, you will find settings for your IronMq queue project.

Now a bit of coding. Copy the repository url and make git clone from it.

Next step to create a new solution inside cloned directory from Visual Studio.

After creation of solution, be sure, you have NuGet installed (this will make your life easier). Create console application inside solution, and add next NuGet packages:

* Belz.QueueProvider.IronMq;
* Belz.QueueProvider;
* Belz;
* Prowlin (for prowl notifications);

Now, modify your Program.cs to look like this:

{% assign gist_file = "01.cs" %}
{% include gist.html %}

Don't forget to change API keys and tokens to use app.

After this step, commit and push your AppHarbor daemon to server.

And you are done.

## Testing

I have created a sample application to put some work into queue:

`ConsoleApplication1.exe 13`

This command will put number 13 to be calculated for fibonacci by our daemon, and sent to iPhone through Prowl service.

The code of application is simple:

{% assign gist_file = "02.cs" %}
{% include gist.html %}

It require next NuGet Packages:

* Belz.QueueProvider.IronMq;
* Belz.QueueProvider;

## Big notice

Don't forget to switch off your test daemon, because in sometime if you reach out free requests, IronIO will bill you for this.

[1]: https://appharbor.com/  Visit AppHarbor
[2]: http://www.iron.io/  Visit Iron.IO
[3]: http://www.iron.io/products/mq  About IronMq
[4]: http://www.cloudamqp.com/  About CloudAMQP
[5]: http://www.prowlapp.com/  About Prowl
[6]: https://github.com/acropolium/Belz  Belz project