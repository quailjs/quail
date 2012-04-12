===============================
All "input" elements of type "text" must have a default text
===============================

Severity code: 1

.. php:class:: inputTextHasValue

<p>All <code>input</code> elements with a type of "text" should have a default text.</p><h4>Example</h4><h5>Wrong</h5><p><code>&lt;label for="search"&gt;Search: &lt;/label&gt;&lt;input type="text" name="search" id="search"/&gt;</code></p><h5>Right</h5><p><code>&lt;label for="search"&gt;Search: &lt;/label&gt;&lt;input type="text" name="search" id="search" value="Search"/&gt;</code></p>
