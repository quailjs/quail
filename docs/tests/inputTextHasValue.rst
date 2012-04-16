===============================
All "input" elements of type "text" must have a default text
===============================

*Severity code:* Severe error

.. php:class:: inputTextHasValue


All <code>input elements with a type of "text" should have a default text.



Example
-------
Wrong
-----

.. code-block:: html

    <label for="search">Search: </label><input type="text" name="search" id="search"/>



Right
-----

.. code-block:: html

    <label for="search">Search: </label><input type="text" name="search" id="search" value="Search"/>




