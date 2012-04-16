===============================
Every form input must have only one label
===============================

*Severity code:* Severe error

.. php:class:: labelMustBeUnique


Each form input should have only one <code>label element.



Example
-------
Wrong
-----

.. code-block:: html

    <label for="first_name"> First name:</label> <label for="first_name">(Required)</label> <input type="text" id="first_name" name="first_name"/>



Right
-----

.. code-block:: html

    <label for="first_name"> First name: (Required)</label> <input type="text" id="first_name" name="first_name"/>




