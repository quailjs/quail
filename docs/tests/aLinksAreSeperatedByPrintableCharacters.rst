===============================
Lists of links should be seperated by printable characters
===============================

*Severity code:* Severe error

.. php:class:: aLinksAreSeperatedByPrintableCharacters

<p>If a list of links is provided within the same element, those links should be seperated by a non-linked, printable character. Structures like lists are not included in this.</p><h4>Example</h4><h5>Wrong</h5><p><code>&lt;a href="a.html"&gt;Page A&lt;/a&gt; &lt;a href="b.html"&gt;Page B&lt;/a&gt; &lt;a href="c.html"&gt;Page C&lt;/a&gt;</code></p><h5>Right</h5><p><code>&lt;a href="a.html"&gt;Page A&lt;/a&gt; | &lt;a href="b.html"&gt;Page B&lt;/a&gt; | &lt;a href="c.html"&gt;Page C&lt;/a&gt;</code></p>
