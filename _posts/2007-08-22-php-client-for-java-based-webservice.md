--- 
layout: post
title: PHP Client for Java-based webservice
tagline: php & java
tags: [integration, java, php, web-service]
---
{% include JB/setup %}
{% assign gist_id = 1959787 %}

While developing one commercial product I have met this problem, and for the research in it’s solvation have spent about 2-3 days. Maybe, this article will help some people, that are new to SOAP programming. So, If you will find it useful – I will be happy.

Some time ago I have met a problem to connect the PHP script to Java-written webservice. It was a task, when the server-side part was developed as the collection of different webservices. For their good performance and memory on-fly caching support we have selected Java language and tomcat server as the main tools of development.

On the other hand, a lot of already developed websites were written with the help of PHP language, because it is simple and powerful for small sites. Also, it is running good on the Linux/Unix platforms, which are much cheaper.

So, we have to develop stubs (php classes that are giving access to remote webservice methods).

By that time I have already worked with connections to the remote webservices using .Net Framework. There you need only to fill in the remote WSDL file path and Visual Studio will automatically generate stubs for you. So, there we even have no problems of cross-language remote connection.

After developing all webservices that our company needed we have tested them with the help of small C#-written utility. As I have mentioned earlier – in VS (C#, .Net) there is no problem to create link to any webservice.

The next task was to make PHP client to Java service. After some search in Google, have found that new version of PHP (version 5.0+) supports the SOAP connection as a client and as a server. Also, have found, that for the PHP version that is younger than 5th there was a library called NuSOAP (please, notice that this lib is not working with new versions of PHP).

So, I have made an instance of SoapClient class in PHP and give it a WSDL URL as parameter. Than have tried to make some remote call... Here the problem appears. The failure was with remote call parameters, just because Java webservice framework (JAXb, JAXr) converts simple collection of parameters to the one object with variables that are real parameters. Also, all argument names are renamed to the template `argX`, where `X` is a number of argument starting from 0.

Also, there left some problem with passing `null` value to remote call.

For example, we have remote call to `Login` method and it receives two parameters – username & password. So, the stub in PHP will be:

{% assign gist_file = "01.php" %}
{% include gist.html %}

In PHP code the remote call will be like this:

{% assign gist_file = "02.php" %}
{% include gist.html %}

Do you see how nice it is?

Now, try to imagine, that this is only one remote call, and what will be if there are about 100 such calls? You will need 100 different stubs. Also, please, notice what will be the difference between these stubs. Let’s show one more example of more complicated call (`RegisterUser`). Let’s imagine that there are such parameters – username, password, email, full name.

So, the stub will be:

{% assign gist_file = "03.php" %}
{% include gist.html %}

And the code will be:

{% assign gist_file = "04.php" %}
{% include gist.html %}

Using the reflection technology, we can develop the class that will be as unique stub for all remote calls and it will dynamically create internal class variables for the arguments if needed. Here is the code of it:

{% assign gist_file = "05.php" %}
{% include gist.html %}

The example of call is here (for login stub):

{% assign gist_file = "06.php" %}
{% include gist.html %}

That’s all. And the object will be filled with all needed `argX`.

Now, let’s unify the SoapClient class. All we need is to catch the call of external method with all parameters and dynamically create the stub and generate the remote call. Here is the code sample (please, note that here there is add-on information stored about logged in user session ID for future remote calls without passing this ID to the parameter list by developer):

{% assign gist_file = "07.php" %}
{% include gist.html %}

Not big part of code, but makes a lot of work for us. Now, let’s see how is it used:

{% assign gist_file = "08.php" %}
{% include gist.html %}