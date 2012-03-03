--- 
layout: post
title: AcroDB. Business Logic
tagline: C#
tags: [AcroDB, Acropolium, C#, DB, Linq]
---
{% include JB/setup %}
{% assign gist_id = 1960224 %}

Previously I have talked only about entity creation and maintain. But what if we need to add some business logic to this entity. For example, we have a table of Pages, and you need to fetch all cities of some country?

## Preparation

First of all we need never to forget, that all `AcroDB` entities are lazy-loaded and each of them contains a reference to the `AcroDataContext`, that created them. And if you want to save an integrity, you need to use the same `AcroDataContext` when fetching new entities. So, how will we do?

## Entity creation

The first step was written before is the entity creation:

{% assign gist_file = "01.cs" %}
{% include gist.html %}

## Business logic
Under the interface we have small problem, which is we can't implement methods. So, we need to create separate classes of business logic, or to write extension methods. I used to implement extension method for the interface:

{% assign gist_file = "02.cs" %}
{% include gist.html %}

You may notice the extension method `AcroContext()`. To use it you need to reference `AcroDB.Helpers` namespace. This method returns the link to data context that was attached to entity.

## The result

So, in result you could call:

{% assign gist_file = "03.cs" %}
{% include gist.html %}

And all children of the page will be fetched from DB.