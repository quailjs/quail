===============================
An image within a link cannot have an empty "alt" attribute if there is no other text within the link
===============================

Severity code: 1

.. php:class:: imgAltNotEmptyInAnchor

<p>Any image that is within a link (an <code>a</code> element) that has no other text cannot have an empty or missing "alt" attribute.</p><h4>Example</h4><h5>Wrong</h5><p><code>&lt;a href="index.html"&gt;&lt;img src="home.png" alt=""&gt;</code></a></p><h5>Right</h5><p><code>&lt;a href="index.html"&gt;&lt;img src="home.png" alt="Return Home"&gt;&lt;/a&gt;</code></p>
