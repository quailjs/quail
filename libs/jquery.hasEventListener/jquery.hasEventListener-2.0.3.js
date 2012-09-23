/*

   Copyright (c) 2010 Sebastien P.

   http://twitter.com/_sebastienp
   https://github.com/sebastien-p/jquery.hasEventListener
   http://jsfiddle.net/sebastienp/eHGqB/

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

   ---

   Version 2.0.3 - Mar. 10, 2011.

   "hasEventListener" is a (about 2kB minified and 1kB gzipped) jQuery plugin which
   checks if an Object or a DOM element actually has a particular event listener bound to it.

   As a bonus, "hasEventListener" also exposes two new jQuery methods called "getEventsData"
   whose can be used as a 1.2.3+ compatible way to get events data internally stored on an
   element by jQuery (please, see related examples and API/documentation below).

   Examples/Usage :

   - $.hasEventListener($("#tabs li")[0], "!delegate click.tab_widget");
     --> returns true or false.

   - $("#tabs li:hasEventListener(!delegate click.tab_widget)");
     --> returns a jQuery object.

   - $("#tabs li").hasEventListener("!delegate click.tab_widget");
     --> returns a jQuery object.

   - $.hasEventListener($({}).bind("custom_event", function () {})[0], "custom_event");
     --> returns true.

   - $({}).bind("custom", function () {}).hasEventListener("custom");
     --> returns a jQuery object.

   - $.getEventsData(window, "scroll");
     --> returns an object or undefined.

   - $("*").getEventsData();
     --> returns an object or undefined.

*/

(function (PLUGIN_NAME, BONUS_NAME, EVENTS, LIVE, DATA, STRING, $, TRUE, UNDEFINED) {

    "use strict";

    function is_valid(argument, type) {

        var to_return = argument && (typeof argument === (type || "function"));

        // Returns "true" only if "argument" is a function or a plain string.
        return !!((type) ? to_return && $.trim(argument) : to_return);

    }

    // Only search for events on "window", the "document", plain objects and HTML elements.
    function get_valid_types_first_letter(object) {

        // Some recent browsers will correctly handle that ...
        var first_try = (/Object|(Ele|Docu)ment|Window/.exec(Object.prototype.toString.call(object)) || [""])[0][0],
            node_type;

        // ... and some others won't so this workaround is needed
        return ((first_try === "O") ? (!object.jquery && (((node_type = object.nodeType) &&
            (object.documentElement || (is_valid(object.tagName, STRING) && $(object).is(object.tagName)))) ?
                ((node_type === 1) && "E") || ((node_type === 9) && "D") : ((object.setInterval) ? "W" : "O"))) : first_try);

    }

    var jQuery_fn = $.fn,

    // Old jQuery versions compatibility.
    // Just build it once.
        compatibility = (jQuery_fn.delegate) ? { // 1.4.2+
            delegate: TRUE,
            namespace: "namespace"
        } : {
            namespace: "type",
            selector: DATA, // 1.3.0 to 1.4.1
            type: "guid" // 1.3.0 to 1.3.2
        };

    compatibility.get_events_data = ($.now && !$.sub) ? function (element) { // 1.4.3 and 1.4.4

        // Workaround for '$({}).bind("event", handler).data("events"); // undefined' bug (on "window" too) !
        var element_type = get_valid_types_first_letter(element),
            data = $[DATA](element, ((element_type = (element_type === "W") || (element_type === "O"))) ? "__" + EVENTS + "__" : EVENTS);

        return ((data && element_type) ? (data || {})[EVENTS] : data);

    } : function (element) {

        return $[DATA](element, EVENTS);

    };

    compatibility[LIVE] = !!jQuery_fn[LIVE]; // 1.3.0+

    if (jQuery_fn.has) { // 1.4.0+

        compatibility.selector = "selector";
        compatibility.type = LIVE; // 1.4.0 and 1.4.1

    }

   /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    *                                                                                                   *
    * jQuery.getEventsData(element, [key])                                                              *
    * --> Object or undefined                                                                           *
    *                                                                                                   *
    * element: (DOM Element/Window or plain Object) where to get the events data.                       *
    * key: (String) type of the event data to get.                                                      *
    *                                                                                                   *
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    $[BONUS_NAME] = function (element, key) {

        var data;

        // "element" is defined and valid.
        element && get_valid_types_first_letter(element) &&
            // There actually is some events data on this "element".
            (data = compatibility.get_events_data(element)) &&
             // "key" is defined and valid so get the associated data.
            (key !== UNDEFINED) && is_valid(key, STRING) && (data = data[key]);

        return data;

    };

   /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    *                                                                                                   *
    * .getEventsData([key])                                                                             *
    * --> Object or undefined                                                                           *
    *                                                                                                   *
    * key: (String) type of the event data to get.                                                      *
    *                                                                                                   *
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    jQuery_fn[BONUS_NAME] = function (key) {

        var data = {},
            property;

        this.each(function () {

            // Recursively fills data with every events data found on each element in the set.
            $.extend(TRUE, data, $[BONUS_NAME](this, key));

        });

        // "data" musn't be an empty object.
        for (property in data) {

            return data;

        }

    };

   /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    *                                                                                                   *
    * jQuery.hasEventListener(tested, [mode][type][namespace], [handler])                               *
    * --> boolean                                                                                       *
    *                                                                                                   *
    * tested: (DOM Element/Window or plain Object) where to check for event presence.                   *
    * mode: (String, "/!(live|delegate)/") for live/delegated event presence test.                      *
    * type: (String, "/[a-z_]+/") type of the event to test presence for. e.g. "click"                  *
    * namespace: (String, "/\.[^\s]+/") namespace of the event to test presence for. e.g. ".namespace". *
    * handler: (Function) event handler to test presence for.                                           *
    *                                                                                                   *
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    $[PLUGIN_NAME] = function (tested_element, event_description, event_handler) {

        var event_listeners,
            event_mode,
            event_namespace,
            event_type,
            push = "push",
            replace = "replace",
            run_tests,
            run_tests_on_one_event,
            strip_blank_characters,
            tested_type,
            tests = [],
            tests_length,
            to_return = !TRUE;

        if (tested_element && (tested_type = get_valid_types_first_letter(tested_element))) {

            // "arguments" must contain some defined values to continue here.
            if (
                $.grep(arguments, function (item) {

                    return (item !== UNDEFINED);

                }).length > 1
            ) {

                if (is_valid(event_description, STRING)) {

                    // "event_description" must be a well-formed string regarding the API : "!mode type.namespace".
                    if ((event_description = /^(!(delegate|live) ?)?([a-z_]+)?(\.([^\s]+))?$/.exec(event_description))) {

                        if ((event_handler !== UNDEFINED) && !is_valid(event_handler)) {

                            // Since "event_handler" is defined but not a function, returns "false" to stop the code execution.
                            return to_return;

                        }

                        // "exec" captured groups assignment.
                        event_namespace = event_description[5];
                        event_type = event_description[3];

                        // "!live" or "!delegate" found in "event_description" string.
                        if ((event_mode = event_description[2])) {

                            // Currently loaded jQuery version must have support for "event_mode" events and "tested_element" musn't be an object.
                            // Also avoid live events checking on "window" which makes no sense, right ?
                            if (compatibility[event_mode] && (tested_type !== "O") && !((event_mode === LIVE) && (tested_type === "W"))) {

                                // As live/delegated event checking is done on the "document" or some parent element,
                                // "tested_element" must match the event selector if "tested_element" is a DOM element.
                                (tested_type === "E") && (tested_element.jquery || (tested_element = $(tested_element))) && tests[push](function (data) {

                                    return tested_element.is(data[compatibility.selector]);

                                });

                                // Event type found in "event_description" string.
                                event_type && tests[push](function (data) {

                                    // "data.preType" is for jQuery 1.4.2+.
                                    // Or get rid of the selector, namespace and guid number in "data[compatibility.type]".
                                    return ((data.preType || data[compatibility.type][replace](data[compatibility.selector], "")
                                        .split(".")[0][replace](/^\d+/, "")) === event_type);

                                });

                                // Event namespace found in "event_description" string.
                                event_namespace && tests[push](function (data) {

                                    // "data.origType" is for jQuery 1.4.2+.
                                    // Only get the namespace if found.
                                    return ((/\.(.+)$/.exec(data.origType || data[compatibility.type]) || [])[1] === event_namespace);

                                });

                            } else {

                                // Since jQuery hasn't any support for "event_mode" events, or "tested_element" is an object,
                                // returns "false" to stop the code execution.
                                return to_return;

                            }

                        } else {

                            // Regular event namespace checking.
                            event_namespace && tests[push](function (data) {

                                return (data[compatibility.namespace] === event_namespace);

                            });

                        }

                    } else {

                        // Since "event_description" isn't a well-formed string regarding the API, returns "false" to stop the code execution.
                        return to_return;

                    }

                // "event_description" is a function.
                } else if (is_valid(event_description)) {

                    event_handler = event_description;

                } else {

                    // Since "event_description" is neither a string nor a function, returns "false" to stop the code execution.
                    return to_return;

                }

                strip_blank_characters = function (event_handler) {

                    // Needed to compare two functions.
                    return ("" + event_handler)[replace](/\s+/g, "");

                };

                event_handler && (event_handler = strip_blank_characters(event_handler)) && tests[push](function (data) {

                    // "data.handler" is for jQuery 1.4.2+.
                    return (is_valid((data = data.handler || data)) && (strip_blank_characters(data) === event_handler));

                });

            }

            run_tests_on_one_event = function (event_datas) {

                // Not only use "each" as a party of jQuery API but also for old versions compatibility.
                $.each(event_datas, function () {

                    // "!have_tests_failed" so "have_tests_passed".
                    if (
                        !(function (that, iterator) {

                            // Yeah, I like reverse while loops !
                            while ((iterator -= 1) >= 0) {

                                if (!tests[iterator](that)) {

                                    // At least one test failed, so skip this event data.
                                    return TRUE;

                                }

                            }

                        }(this, tests_length))
                    ) {

                        // Since every tests passed, there is a such event bound, so returns "false" to stop the loop execution.
                        return !(to_return = TRUE);

                    }

                });

            };

            // Get regular events datas.
            if (!event_mode) {

                // Event type found in "event_description" string and "event_type" event found in "event_listeners".
                (event_listeners = $[BONUS_NAME](tested_element, event_type)) && event_type && (run_tests = run_tests_on_one_event);

            // Get live/delegated events datas.
            } else {

                (event_listeners = (

                    // Live events are always and only bound to the document.
                    ((tested_type !== "D") && (tested_type !== "W")) ?
                        // Delegated events are kind of live ones whose can be bound to the "document", "window" and HTML elements.
                        $(document).add((event_mode !== LIVE) ? (((tested_element = $(tested_element)).is("html")) ?
                            // If the HTML element is not the "html" tag, get his parents.
                            // Always add "widow" to the set if "tested_element" is a HTML element.
                            tested_element : tested_element.parents(":not(html)").andSelf()).add(window) : UNDEFINED) : $(tested_element)

                // Filters the set two times : only get elements with an [event_type] event bound and then those with a "live" event bound.
                // If "live" events data found, only run tests on "live" events.
                )[PLUGIN_NAME](LIVE)[BONUS_NAME](LIVE)) && (run_tests = run_tests_on_one_event);

            }

            // "tests" must contain some functions to run them.
            event_listeners && ((tests_length = tests.length) ? (run_tests || function (events_datas) {

                // Runs tests on every event datas.
                $.each(events_datas, function () {

                    run_tests_on_one_event(this);

                    // When "to_return" is "true", returns "false" to stop the loop execution.
                    return !to_return;

                });

            // If not, returns "true" because it means "$.hasEventListener(tested)" or "$.hasEventListener(tested, type)".
            })(event_listeners) : (to_return = TRUE));

        }

        return to_return;

    };

   /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    *                                                                                                   *
    * :hasEventListener[([mode][type][namespace])] Selector                                             *
    * --> jQuery object                                                                                 *
    *                                                                                                   *
    * mode: (String, "/!(live|delegate)/") for live/delegated event presence test.                      *
    * type: (String, "/[a-z_]+/") type of the event to test presence for. e.g. "click"                  *
    * namespace: (String, "/\.[^\s]+/") namespace of the event to test presence for. e.g. ".namespace". *
    *                                                                                                   *
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    $.expr[":"][PLUGIN_NAME] = function (dom_element, index, match) {

        return $[PLUGIN_NAME](dom_element, match[3]);

    };

   /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    *                                                                                                   *
    * .hasEventListener([mode][type][namespace], [handler])                                             *
    * --> jQuery object                                                                                 *
    *                                                                                                   *
    * mode: (String, "/!(live|delegate)/") for live/delegated event presence test.                      *
    * type: (String, "/[a-z_]+/") type of the event to test presence for. e.g. "click"                  *
    * namespace: (String, "/\.[^\s]+/") namespace of the event to test presence for. e.g. ".namespace". *
    * handler: (Function) event handler to test presence for.                                           *
    *                                                                                                   *
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    jQuery_fn[PLUGIN_NAME] = function (event_description, event_handler) {

        return this.filter(function () {

            return $[PLUGIN_NAME](this, event_description, event_handler);

        });

    };

}("hasEventListener", "getEventsData", "events", "live", "data", "string", jQuery, !0));