--- 
layout: post
title: Google Storage API with C#. SharpGs. Try it
tagline: C#
tags: [API, C#, CDN, Google Storage, SharpGs]
---
{% include JB/setup %}

Today I have great news for you - [SharpGs][1], is a first open-source C# library to access `Google Storage API`.

Why have I done that - maybe for fun and interest of Google products. But the real idea was that now I have something new to share and give to society, and became alive in my blog :).

## How to use

Here will be the small instruction on how to use the library. On the GitHub you will find a [demo project][2] with the main function calls. So, here is the instruction:

1. First of all you need to get invite or right to access this beta-testing launch of SharpGs.
2. [Here][3] you need to create new access key pair (open key and a secret to crypt verification data).
3. In your code create a new instance of `SharpGsClient` class and pass key and secret, you have got from step 2. And you are done :)

To get the list of buckets from the server, use the `Buckets` property of `SharpGsClient` instance object. This property provides the enumeration of `IBucket` interface objects, which has properties of bucket information or methods to operate with bucket objects.

Each call of the method could throw an exception if something goes wrong. The list of supported exceptions will be increased in a time.

I think this library is too simple to make tons of examples, so, if there will be questions, I will answer them in comments or other post.

Sorry, for leak of comments inside the code, hope they will appear there soon.

Have a nice try!

[1]: https://github.com/acropolium/SharpGs                                     "Locate sources on github"
[2]: https://github.com/acropolium/SharpGs/blob/master/SharpGsDemo/Program.cs  "Example on github"
[3]: https://sandbox.google.com/storage/m/manage                               "Create new access key"