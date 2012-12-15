===============================
Images should not have a "title" attribute
===============================

*Severity code:* Severe error

.. php:class:: imgShouldNotHaveTitle


Images should not contain a "title" attribute.



Example
-------
Wrong
-----

.. code-block:: html

    <img src="dog.png" alt="My brown dog" title="A dog"/>



Right
-----

.. code-block:: html

    <img src="dog.png" alt="My brown dog"/>




