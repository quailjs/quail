===============================
The "alt" text for input "image" submit buttons must not be filler text
===============================

*Severity code:* Severe error

.. php:class:: inputImageAltNotRedundant


Every form image button should not simply use filler text like "button" or "submit" as the "alt" text.



Example
-------
Wrong
-----

.. code-block:: html

    <input type="image" src="mangifier.png" alt="submit"/>



Right
-----

.. code-block:: html

    <input type="image" src="mangifier.png" alt="Search this site"/>




