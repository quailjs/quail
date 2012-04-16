===============================
Noembed" elements must be the same content as their "embed" element
===============================

*Severity code:* Information only

.. php:class:: noembedHasEquivalentContent


All <code>noembed elements must contain or link to an accessible version of their <code>embed counterparts.



Example
-------
Wrong
-----

.. code-block:: html

    &lt;embed src="podcast.mp3"/&gt;&lt;noembed&gt;Some podcast&lt;/noembed&gt;



Right
-----

.. code-block:: html

    &lt;embed src="podcast.mp3"/&gt;&lt;noembed&gt;A podcast about dogs. &lt;a href="transcript.html"&gt;Read the full transcript&lt;/a&gt;.&lt;/noembed&gt;




