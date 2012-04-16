===============================
All "input" elements with a type of "image" must have an "alt" attribute
===============================

*Severity code:* Severe error

.. php:class:: inputImageHasAlt


All <code>input elements with a type of "image" should have an "alt" attribute.



Example
-------
Wrong
-----

.. code-block:: html

    <input type="image" name="search" src="search.png"/>



Right
-----

.. code-block:: html

    <input type="image" name="search" src="search.png" alt="Search"/>




