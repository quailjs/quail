===============================
Every object should contain an "embed" element
===============================

*Severity code:* Severe error

.. php:class:: objectMustHaveEmbed


Every <code>object element must also contain an <code>embed element.



Example
-------
Wrong
-----

.. code-block:: html

    &lt;object data="movie.mov"&gt;&lt;/object&gt;



Right
-----

.. code-block:: html

    &lt;object data="movie.mov"&gt;&lt;embed src="movie.mov"&gt;&lt;/embed&gt;&lt;/object&gt;




