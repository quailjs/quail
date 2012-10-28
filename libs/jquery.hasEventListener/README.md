`hasEventListener` plugin for [jQuery](http://jquery.com/) 1.2.3+
=================================================================

Description
-----------

`hasEventListener` is a (about 2.1kB minified and 1kB gzipped) jQuery plugin which checks if an Object or a DOM element actually has
a particular/live/delegated event listener bound to it. [More infos ?](https://twitter.com/#!/search/_sebastienp%20hasEventListener)

As a bonus, `hasEventListener` also exposes two new jQuery methods called `getEventsData` whose can be used as a 1.2.3+ compatible
way to get events data internally stored on an element by jQuery (please, see related examples and API/documentation below).


**Why ?**

jQuery allows us to bind event handlers on Objects and DOM elements but doesn't provide any way to easily check if
they already have one, so I first started searching over the Internet for an existing solution and saw that some people
(for example [here](http://forum.jquery.com/topic/how-do-i-check-if-an-event-is-already-bound),
[here](http://stackoverflow.com/questions/1515069/jquery-check-if-event-exists-on-element) or even
[there](http://stackoverflow.com/questions/1236067/test-if-event-handler-is-bound-to-an-element-in-jquery)) asked for it too.

Some people do something like `$("#some_element").unbind("click").bind("click", function () {});` which works but is unclean
and calls the `unbind` method even when not needed. I couldn't rely on that. I also found out a few existing plugins but
wasn't satisfied with any of them because they lacked some important features or backward compatibility.

That's why I decided to write my own and how `hasEventListener` was born ...


**Feedback wanted !**

If you like `hasEventListener`, use it on a daily basis, found some bug(s), have some feature request(s), please tell me !

Contact me via [Twitter](http://twitter.com/_sebastienp) or use Github's dedicated contact/report forms.


**You are a developer and can improve `hasEventListener` by yourself ?**

Go ahead, it could save me a lof of time ! Feel free to fork it, send me your work or a pull request on Github or whatever ...


Demo
----

A quick demo that you even can play with is available [here on jsFiddle](http://jsfiddle.net/sebastienp/eHGqB/).


Setup (HTML5 not required)
--------------------------

    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8"/>
            <title>Page title</title>
        </head>
        <body>
            <!-- Some HTML tags -->
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js"></script>
            <script scr="jquery.hasEventListener-2.1.0.min.js"></script>
            <!-- Some other jQuery plugins and/or scripts, order matters ! -->
        </body>
    </html>


API/Documentation
-----------------

    tested: (DOM Element or plain Object) where to check event presence for.
    mode: (String, "/!(delegat|liv)e/") if the event was bound using one of these jQuery methods.
    type: (String, "/[a-z_]+/") type of the event to test presence for. e.g. "click"
    namespace: (String, "/\.[^\s]+/") namespace of the event to test presence for. e.g. ".namespace".
    handler: (Function) event handler to test presence for.
    element: (DOM Element/Window or plain Object) where to get the events data.
    key: (String) type of the event data to get.

* `jQuery.hasEventListener(tested, [mode][type][namespace], [handler])` --> Boolean.
* `:hasEventListener[([mode][type][namespace])] Selector` --> jQuery object.
* `.hasEventListener([mode][type][namespace], [handler])` --> jQuery object.
* `jQuery.getEventsData(element, [key])` --> Object or `undefined`.
* `.getEventsData([key])` --> Object or `undefined`.


**Important notes :**

* jQuery has support for live events since 1.3.0 and for delegated ones since 1.4.2.
* `handler` used with `mode` currently only works with jQuery 1.4.2+ (see [this Fiddle](http://jsfiddle.net/sebastienp/kkmga/)).
* `tested` can't be a jQuery object (see examples below).


Examples/Usage
--------------

* `$.hasEventListener($("#tabs li")[0], "!delegate click.tab_widget");` returns `true` or `false`.
* `$("#tabs li:hasEventListener(!delegate click.tab_widget)");` returns a jQuery object.
* `$("#tabs li").hasEventListener("!delegate click.tab_widget");` returns a jQuery object.
* `$.hasEventListener($("span")[0], "!live");` returns `true` or `false`.
* `$("span:hasEventListener(.my_namespace)");` returns a jQuery object.
* `$("span").hasEventListener("!live .my_namespace");` returns a jQuery object.
* `$.hasEventListener($({}).bind("custom_event", function () {})[0], "custom_event");` returns `true`.
* `$({}).bind("custom", function () {}).hasEventListener("custom");` returns a jQuery object.
* `$.getEventsData(window, "scroll");` returns an object or `undefined`.
* `$("*").getEventsData();` returns an object or `undefined`.


ChangeLog
---------

* 2.0.3 : Checking on plain objects and delegated events bugs corrected.
* 2.0.2 : Custom events checking bug corrected.
* 2.0.1 : Major Internet Explorer compatibility changes.
* 2.0.0 : Complete rewrite, new API, please forget about anterior versions.


2.1.0 Roadmap
-------------

API changes : `!mode ` will be `mode!`, `toggle` and `hover` shortcuts will be added.


They use and/or talked about `hasEventListener`
-----------------------------------------------

* [jQuery hasEventListener and developer collaboration](http://sullerton.com/2011/01/jquery-haseventlistener-and-developer-collaboration/).
* [jQuery fancy select dropdown menu](http://snipplr.com/view/48107/jquery-fancy-select-dropdown-menu).
* [RPC Browser XBMC](http://code.google.com/p/rpc-browser-xbmc/source/browse/trunk/script.rpc.browser/).


Special thanks
--------------

* Julian Jelfs ([Blog](http://julianjelfs.wordpress.com/) - [Twitter](http://twitter.com/julianjelfs)).


Licence
-------

Copyright (c) 2011 Sebastien P.

[http://twitter.com/_sebastienp](http://twitter.com/_sebastienp)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.