===============================
Scripts should have a corresponding "noscript" element
===============================

Severity code: 0

.. php:class:: scriptInBodyMustHaveNoscript

<p>Scripts should be followed by a <code>noscripts</code> element to guide the user to content in an alternative way.</p><h4>Example</h4><h5>Wrong</h5><p><code>&lt;script type="text/javascript"&gt;document.write("Hello World!")&lt;/script&gt;</code></p><h5>Right</h5><p><code>&lt;script type="text/javascript"&gt;document.write("Hello World!")&lt;/script&gt;&lt;noscript&gt;Hello
