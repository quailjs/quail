===============================
All "embed" elements have an associated "noembed" element
===============================

*Severity code:* Severe error

.. php:class:: embedHasAssociatedNoEmbed


Because some users cannot use the <code>embed element, provide alternative content in a <code>noembed element.



Example
-------
Wrong
-----

.. code-block:: html

    <embed src="html.mov"/>



Right
-----

.. code-block:: html

    <embed src="html.mov"/><noembed>A move with <a href="transcript.html">an available transcript</a>.</embed>




