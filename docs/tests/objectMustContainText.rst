===============================
Objects must contain their text equivalents
===============================

*Severity code:* Severe error

.. php:class:: objectMustContainText

<p>All <code>object</code> elements should contain a text equivalent if the object cannot be rendered.</p><h4>Example</h4><h5>Wrong</h5><p><code>&lt;object src="widget.html" title=""&gt;&lt;/object&gt;</code></p><h5>Right</h5><p><code>&lt;object src="widget.html" title="A small web widget"&gt;A widget of stock prices. &lt;a href="widget.html"&gt;Access this widget.&lt;/a&gt;&lt;/object&gt;</code></p>
