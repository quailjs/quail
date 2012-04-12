===============================
Text" input elements require a non-whitespace default text
===============================

Severity code: 1

.. php:class:: inputTextValueNotEmpty

<p>All <code>input</code> elements with a type of "text" should have a default text which is not empty.</p><h4>Example</h4><h5>Wrong</h5><p><code>&lt;label for="search"&gt;Search: &lt;/label&gt;&lt;input type="text" name="search" id="search" value=""/&gt;</code></p><h5>Right</h5><p><code>&lt;label for="search"&gt;Search: &lt;/label&gt;&lt;input type="text" name="search" id="search" value="Search"/&gt;</code></p>
