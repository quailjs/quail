===============================
Labels must contain text
===============================

*Severity code:* Severe error

.. php:class:: labelMustNotBeEmpty


.. code-block:: html

    Label elements should contain text which communicates the purpose of its assigned input element.



Example
-------
Wrong
-----

.. code-block:: html

    <label for="first_name"> </label>First name: <input type="text" id="first_name" name="first_name"/>



Right
-----

.. code-block:: html

    <label for="first_name">First name: </label><input type="text" id="first_name" name="first_name"/>




