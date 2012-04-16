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

    &lt;embed src="html.mov"/&gt;



Right
-----

.. code-block:: html

    &lt;embed src="html.mov"/&gt;&lt;noembed&gt;A move with &lt;a href="transcript.html"&gt;an available transcript&lt;/a&gt;.&lt;/embed&gt;




