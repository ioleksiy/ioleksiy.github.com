--- 
layout: post
title: Extending Migrator.NET with logic scopes
tagline: C#
tags: [C#, DB]
---
{% include JB/setup %}
{% assign gist_id = 2023088 %}

[Migrator.NET][1] (or at [GitHub][2]) is a well-known migration tool for `.Net Framework`. For already a years this lib is stable and much better than even today's `Entity Framework` migrations. It is also very hard to add something new to the already good thing, but some time ago I have a need to extend it's functionality.

## The Aim
You should know, that the usual way of working with db migrations is manual upgrade of db scheme. So, when your project is big enough and has no unpredicted parts, the `Migrator.Net` is what you really need.

In my case, there was a project, which should contain different db structures in different modules. Modules may be written by different people, and you can understand what a nightmare can be to allow all of them using 1-2-3 versioning system, which is default today. For example:

* we have 2 modules `A` and `B`, which are supported by 2 different people;
* `A` has got a migration `2012031200` (timestamp for the version `YYYYMMDDHH`) on Monday;
* the developer of `B` saw it and added a migration `2012031300` on Tuesday to module `B`;
* on Wednesday the developer of `A` has added new migration `2012031400`;
* when system is launched, it should run all latest migrations to make a db scheme actualized.

You must notice, that migrations of both modules are not changing each other tables, but only their own needed structures.

And here will be a problem, if Tuesday migration failed, Wednesday migration will not run at all. That's why we should dedicate separate logical spaces for each logical module.

## The Proposal
First of all the task was to remain backward compatibility, so for the end developer there will not be a difference with scope or without it.

Than I have added a new parameter to migration attribute:

{% assign gist_file = "01.cs" %}
{% include gist.html %}

And after this, if you want to migrate to latest, you have to specify the scope name of the migrations. A list of scopes can be fetched with `Scopes` property of `Migrator` class.

If you wish to apply all migrations from all scopes, use `MigrateAllScopesToLastVersion` method inside `Migrator` class.

Modified version of `Migrator.NET` is available at [GitHub][3].

## Easter Egg
If you specify a scope as empty string, code will not detect scope automatically, but will return the default scope (32 zeroes).

[1]: http://code.google.com/p/migratordotnet/  Visit Migrator.NET at Google Code
[2]: https://github.com/migratordotnet/Migrator.NET  Visit Migrator.NET mirror at GitHub
[3]: https://github.com/acropolium/Migrator.NET  My version of Migrator.NET at GitHub