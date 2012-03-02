--- 
layout: post
title: AcroDB. The beginning
tagline: C#
tags: [AcroCMS, AcroDB, Acropolium, C#, DB, Subsonic]
---
{% include JB/setup %}
{% assign gist_id = 1960254 %}

## The big day

After a year of hard work I begin to share new opesource projects with Internet community. Hope you will love it and use it in your development. Also, if someone will want to help me providing the future of this small creatures, please write me a line to email box.

## New .Net-based CMS (the Content Management System) that is FREE

Ok, first of all about my ideas and projects. During last 3 years I was thinking of new stable and reliable CMS system/framework that will be easy to work with for end users like websites owners, same as for developers. Please, don't think it is one more CMS system, that is real shit... Nope, we have given all love to this fantastic system, and all people who were testing it in internal testing, have already made good reviews about it.

### Why have we (my best friend - designer and I) done that?

While we were working at <a class="offsite-link-inline" href="http://www.acropolium.com/" target="_blank">Acropolium Studio</a> since 2003, the team of Acropolium have done about 4-5 engines that were CMS-like systems. Some of them were plain, some of them - moduled and flexible, some - quick like a lightning. But all of those systems were developed on PHP. It is good technology and even now it has big popularity, but maybe because of my laziness, soon I have moved to C#. From the very beginning it was incredible language, same as .Net was a perfect technology.

After some time developing and supporting web applications based on .Net framework, I have made a research on existent ASP.Net CMS systems. There were not a lot of them by that time. Also, almost all of them were shareware. That's why we have begin to think about new, fresh concepts in CMS building. And when the MVC.Net library appeared in RC1, I began to implement internal architecture of new, fresh, opensource cms. There were about four initial architecture implementations that have been gone to recycle bin. The only idea that have survived through last 2 years was the Data Access Layer provider (hope all of you are working with MVC pattern, so it was Model). And part of this layer that is separate thing now, I will describe today. Hope, other articles will appear once/twice per week.

## AcroDB

The result you will see today is approximately 99% modified from the 2 years old version. 1% left the idea of the layer simplicity. About 60% of code were rewritten this week, after <a class="offsite-link-inline" href="http://blog.wekeroad.com/2010/03/15/subsonic-migrations-without-subsonic" target="_blank">SubSonic AutoMigrations</a> appeared (many thanks to Rob Conery and Co). Before, it was the work of <a class="offsite-link-inline" href="http://msdn.microsoft.com/en-us/library/ms162169.aspx" target="_blank">Microsoft SMO</a> - tons of code and same result as now (the only thing there were relations, but now we support no relation dbs and relations are not needed in simple data provider - one more "hi" to Rob's team for their NoRM).

### The goal

There are plenty tasks in developer life, where he need to make simple access to some data source quickly. For example, it is needed to make a temporary local list of visitors, or some cache in data source. What steps do developer needs to make to support this?:

<ol>
	<li>Select the data source provider, and if needed - install it.</li>
	<li>Create simple table structure to store data at later time.</li>
	<li>Create ORM (we will work with linq2sql) prototype classes, that will work with this db.</li>
	<li>Create Linq DataContext to work with source.</li>
	<li>Create simple data layer to access data through LINQ entities.</li>
</ol>

For harder projects this steps count could grow... Also, if in future developer will need to change data source (for example move from SQLite to MS Sql), he will need to remake steps 2-4, and sometimes even step #5. Also, if we need to work with entity interfaces in project, than we will need to add step #2a to create prototype interfaces and change step #3 to inherit those interfaces by linq classes. If you will use <a class="offsite-link-inline" href="http://www.nolics.net/Main.aspx?topic=default" target="_blank">Nolics ORM</a> you will need to write some more same text like prototype classes and interfaces...

So, what was the purpose of the AcroDB development? First of all to remove all non-needed steps and make them as internal work for DBProviderFactory. And as a result developer will got to write several lines to get access to rows in different DB system. Here is the list of tasks we have thought to achieve:

<ul>
	<li>Move abstraction of DB entity from classes to interfaces;</li>
	<li>Implement unique interface for add, edit, delete, query operations for any data provider (SQL db, No Relation DB, collection);</li>
	<li>Automatic tables creation/modifying (migration) in data provider, based on described entity interface (if it is SQL-oriented);</li>
	<li>Automated settings fetching from the loaded assemblies.</li>
</ul>

I have wrote a lot of bad English text already, so let me put some code now:

{% assign gist_file = "01.cs" %}
{% include gist.html %}

This is all things you need to do. Not very simple on first view, but you will not need to create something else to store data.

So what we've got here?

### AcroDbEntity Attribute

This attribute applies to interfaces, to mark them for data context factory to be inherited at runtime. The line <em>AcroDataContext.ScanAssemblyForEntities</em> calls a static method to scan assembly for interfaces marked with AcroDbEntity attribute. Than AcroDataContext makes a class that inherits this interface in memory using IL code generation. So, at the end, this class will be the endpoint for linq operations.

### DataContextFactory

It is an abstraction for any data context, which could be anything, like relations-based db, non-relation db, files, memory, etc. The only thing if you need to implement own data source context, you need to code 3 classes:

<ul>
	<li>data provider (add,edit,delete,query commands implementation);</li>
	<li>data context (link to data source and transactions until commit changes);</li>
	<li>data source registrator - the class that will describe your's custom provider, and context (later we want to remove it and replace by attribute for data context).</li>
</ul>

About implementing custom data source provider I will try to write an article asap.

### DefaultDataContext

This static property of AcroDataContext is determining the default datasource, with which the entities will work.

### AcroDataContext.Go

The helper method to create the instance of default data context to work with. Please, note, that data context implements "IDisposable" to free all used resources quickly.

### Working with entities
Inside using block you can see the creation of new object and it's storage to data source. While using the generic method of data context named "Provide", AcroDB internally maps the interface to runtime created class and creates it's instance.

As you can see at the end of using block, to ensure, that data was commited to data source, you need to call "SubmitChanges" method like in simple LINQ context. It is not needed for all data source types, but to make system work with different providers, don't forget to call it.

## The end of the day. Source code

Thank you for reading this article. I will appreciate feedbacks and comments. If there were some not clear aspects of code, or text here, please comment about that. The source code of the library could be find at <a class="offsite-link-inline" title="Go to Github" href="http://github.com/ioleksiy/AcroDB" target="_blank">github</a>. Don't forget to download <a class="offsite-link-inline" href="http://github.com/subsonic/SubSonic-3.0" target="_blank">subsonic</a> and <a class="offsite-link-inline" href="http://github.com/atheken/NoRM" target="_blank">NoRM</a> (if you want to run mongodb provider) libs.

### P.S.: Migration

Almost forget about auto migration. Simply call <em>AcroDataContext.PerformMigrations()</em> after loading all entities, to change datasource to latest entity description automatically. Once more thanks to Rob Conery.

Also, there are a lot of internal sugar, that was not described here. But I will work on this, if it will be interesting.