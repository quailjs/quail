===============================
Text" input elements require a non-whitespace default text
===============================

*Severity code:* Severe error

.. php:class:: inputTextValueNotEmpty


All <code>input elements with a type of "text" should have a default text which is not empty.



Example
-------
Wrong
-----

.. code-block:: html

    <label for="search">Search: </label><input type="text" name="search" id="search" value=""/>



Right
-----

.. code-block:: html

    <label for="search">Search: </label><input type="text" name="search" id="search" value="Search"/>




