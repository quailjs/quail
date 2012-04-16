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

    <object data="movie.mov"></object>



Right
-----

.. code-block:: html

    <object data="movie.mov"><embed src="movie.mov"></embed></object>




