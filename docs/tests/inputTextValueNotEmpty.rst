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

    &lt;label for="search"&gt;Search: &lt;/label&gt;&lt;input type="text" name="search" id="search" value=""/&gt;



Right
-----

.. code-block:: html

    &lt;label for="search"&gt;Search: &lt;/label&gt;&lt;input type="text" name="search" id="search" value="Search"/&gt;




