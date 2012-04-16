===============================
Objects which reference multimedia files should also provide a link to a transcript
===============================

*Severity code:* Information only

.. php:class:: objectLinkToMultimediaHasTextTranscript


If an object contains a video, a link to the transcript should be provided near the object.



Example
-------
Wrong
-----

.. code-block:: html

    &lt;object src="video.mov"&gt;&lt;/object&gt;



Right
-----

.. code-block:: html

    &lt;object src="video.mov"&gt;&lt;/object&gt;&lt;a href="transcript.html"&gt;Read Transcript of the video&lt;/a&gt;




