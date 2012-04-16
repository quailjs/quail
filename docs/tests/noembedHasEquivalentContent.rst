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

    <embed src="podcast.mp3"/><noembed>Some podcast</noembed>



Right
-----

.. code-block:: html

    <embed src="podcast.mp3"/><noembed>A podcast about dogs. <a href="transcript.html">Read the full transcript</a>.</noembed>




