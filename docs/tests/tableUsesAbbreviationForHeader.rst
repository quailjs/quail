===============================
Table headers over 20 characters should provide an "abbr" attribute
===============================

*Severity code:* Information only

.. php:class:: tableUsesAbbreviationForHeader

<p>For long table headers, use an "abbr" attribute that is less than short (less than 20 characters long).</p><h4>Examples</h4><h5>Wrong</h5><p><code>&lt;th&gt;The total number of people who liked chocolate&lt;/th&gt;</code></p><h5>Right</h5><p><code>&lt;th abbr="Like Chocolate"&gt;The total number of people who liked chocolate&lt;/th&gt;</code></p>
