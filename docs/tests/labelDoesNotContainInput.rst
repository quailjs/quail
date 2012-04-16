===============================
Label" elements should not contain an input element
===============================

*Severity code:* Severe error

.. php:class:: labelDoesNotContainInput


.. code-block:: html

    Label elements should not contain an <code>input element as well.



Example
-------
Wrong
-----

.. code-block:: html

    <label for="first_name">First name: <input type="text" id="first_name" name="first_name"/></label>



Right
-----

.. code-block:: html

    <label for="first_name">First name: </label><input type="text" id="first_name" name="first_name"/>




