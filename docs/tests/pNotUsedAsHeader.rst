===============================
Paragraphs must not be used for headers
===============================

*Severity code:* Severe error

.. php:class:: pNotUsedAsHeader

<p>Headers like <code>h1-h6</code> are extremely useful for non-sighted users to navigate the structure of the page, and formatting a paragraph to just be big or bold, while it might visually look like a header, does not make it one.</p><h4>Example</h4><h5>Wrong</h5><p><code>&lt;p&gt;&lt;strong&gt;Something that really should be a header&lt;/strong&gt;&lt;/p&gt;</code></p><h5>Right</h5><p><code>&lt;h3&gt;Something that really should be a header&lt;/h3&gt;</code></p>
