===============================
All "embed" elements have an associated "noembed" element
===============================

Severity code: 1

.. php:class:: embedHasAssociatedNoEmbed

<p>Because some users cannot use the <code>embed</code> element, provide alternative content in a <code>noembed</code> element.</p><h4>Example</h4><h5>Wrong</h5><p><code>&lt;embed src="html.mov"/&gt;</code></p><h5>Right</h5><p><code>&lt;embed src="html.mov"/&gt;&lt;noembed&gt;A move with &lt;a href="transcript.html"&gt;an available transcript&lt;/a&gt;.&lt;/embed&gt;</code></p>
