===============================
All "frame" elements should have a "title" attribute
===============================

*Severity code:* Severe error

.. php:class:: framesHaveATitle


Each <code>frame elements should have a "title" attribute.



Example
-------
Wrong
-----

.. code-block:: html

    <frame src="navigation.html"></frame>



Right
-----

.. code-block:: html

    <frame src="navigation.html" title="The site navigation"></frame>




