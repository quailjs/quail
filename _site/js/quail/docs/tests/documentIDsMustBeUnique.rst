===============================
All element "id" attributes must be unique
===============================

*Severity code:* Severe error

.. php:class:: documentIDsMustBeUnique


Element "id" attributes must be unique.



Example
-------
Wrong
-----

.. code-block:: html

    <p id="paragraph">First Paragraph</p><p id="paragraph">Second Paragraph</p>



Right
-----

.. code-block:: html

    <p id="paragraph-1">First Paragraph</p><p id="paragraph-2">Second Paragraph</p>




