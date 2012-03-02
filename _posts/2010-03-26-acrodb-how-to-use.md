--- 
layout: post
title: AcroDB. How to use
tagline: C#
tags: [AcroDB, Acropolium, C#, DB, Linq, Subsonic]
---
{% include JB/setup %}
{% assign gist_id = 1960303 %}

Hi, all! Almost a week have passed, after I have <a href="/2010/3/20/acrodb-the-beginning.html">posted</a> my new flexible provider article. Maybe, nobody commented it, because of article compicity... So, today I will try to show you, how to use <a class="offsite-link-inline" title="Download Library from Github" href="http://github.com/ioleksiy/AcroDB" target="_blank">AcroDb</a>.

## The model

Usually, when you start to design your future application, you need to describe 3 levels of MVC, and first of it goes the model layer. For the simple projects, the model layer consists of simple tables/entities. Let's say we have to build a model for only one entity type, to store cars.

### Car entity description

What fields should this entity have? Let them be:

<ul>
<li>ID - the unique <a class="offsite-link-inline" title="GUID" href="http://msdn.microsoft.com/en-us/library/system.guid.aspx" target="_blank">guid</a> of car record (primary key).</li>
<li>Name - car name string (if we need to specify the limit of this field, let it be maximum 80 chars).</li>
<li>YearOfAssembly - the year, when this car starts to drive (integer value).</li>
<li>Description - the text with notes about the car (infinite string).</li>
</ul>

### Car entity prototype in AcroDb

Now let me describe, how this entity will look like in code using AcroDb library.

{% assign gist_file = "01.cs" %}
{% include gist.html %}

And if you have setup AcroDataContext class settings correctly as it was described in <a href="http://oleksiy.pro/2010/03/20/acrodb-the-beginning/">first post</a>, after application start you will have a "Car" table in your database/no-relational system. Or if you will change properties of this interface, table schema will be updated, thanks to SubSonic.

So, AcroColumnStringLength attribute is used to specify the maximum length of the column in db. The AcroColumnStringLong attribute marks te column as infinite (MAX) size. For all column attributes, please, read <a class="offsite-link-inline" title="Column attributes" href="http://github.com/ioleksiy/AcroDB/blob/master/AcroDB/Attributes/ColumnAttributes.cs" target="_blank">here</a>.

## Working with entity

Now I will show the parts of code, how to work with our entity.

### Creating and saving an object

{% assign gist_file = "02.cs" %}
{% include gist.html %}

### Querying a db

Here is a sample of Linq query for multiply objects:

{% assign gist_file = "03.cs" %}
{% include gist.html %}

Almost the same example for single object and count function:

{% assign gist_file = "04.cs" %}
{% include gist.html %}

As you can see, here you can use usual Linq methods applying to the Query property, as Query property is IQueryabe type.

### Updating and deleting an entity

{% assign gist_file = "05.cs" %}
{% include gist.html %}

## The end for today

As you can see, I have tried to save the simplicity in working with objects as in Linq2Sql, but have added a multi-context support for it, so you are not limited only for MS SQL...

Also, you don't need to work with db directly. All tables/objects will be created for you automatically.

If you have any comments/proposals please, write them in comment form. Next time I plan to describe, how to use simple business logic layer with AcroDb and relations between entities.