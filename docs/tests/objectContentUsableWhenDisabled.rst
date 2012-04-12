===============================
When objects are disabled, content should still be available
===============================

Severity code: 3

.. php:class:: objectContentUsableWhenDisabled

<p>The content within objects should still be available, even if the object is disabled. To do this, place a link to the direct object source within the <code>object</code> tag.</p><h4>Example</h4><h5>Wrong</h5><p><code>&lt;object src="something.html"&gt;&lt;/object&gt;</code></p><h5>Right</h5><p><code>&lt;object src="something.html"&gt;&lt;a href="something.html"&gt;Read something&lt;/a&gt;&lt;/object&gt;</code></p>
