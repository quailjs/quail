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

    <object src="video.mov"></object>



Right
-----

.. code-block:: html

    <object src="video.mov"></object><a href="transcript.html">Read Transcript of the video</a>




