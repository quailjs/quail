===============================
Every object should contain an "embed" element
===============================

*Severity code:* Severe error

.. php:class:: objectMustHaveEmbed

<p>Every <code>object</code> element must also contain an <code>embed</code> element.</p><h4>Example</h4><h5>Wrong</h5><p><code>&lt;object data="movie.mov"&gt;&lt;/object&gt;</code></p><h5>Right</h5><p><code>&lt;object data="movie.mov"&gt;&lt;embed src="movie.mov"&gt;&lt;/embed&gt;&lt;/object&gt;</code></p>
