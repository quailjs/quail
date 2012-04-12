===============================
Noembed" elements must be the same content as their "embed" element
===============================

Severity code: 3

.. php:class:: noembedHasEquivalentContent

<p>All <code>noembed</code> elements must contain or link to an accessible version of their <code>embed</code> counterparts.</p><h4>Example</h4><h5>Wrong</h5><p><code>&lt;embed src="podcast.mp3"/&gt;&lt;noembed&gt;Some podcast&lt;/noembed&gt;</code></p><h5>Right</h5><p><code>&lt;embed src="podcast.mp3"/&gt;&lt;noembed&gt;A podcast about dogs. &lt;a href="transcript.html"&gt;Read the full transcript&lt;/a&gt;.&lt;/noembed&gt;</code></p>
