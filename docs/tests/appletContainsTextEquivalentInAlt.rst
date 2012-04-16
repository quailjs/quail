===============================
All applets should contain a text equivalent in the "alt" attribute
===============================

*Severity code:* Possible error

.. php:class:: appletContainsTextEquivalentInAlt


Applets should contain their text equivalents or description in an "alt" attribute.



Example
-------
Wrong
-----

.. code-block:: html

    <applet archive="whyareyouusingapplet.jar"></applet>



Right
-----

.. code-block:: html

    <applet archive="whyareyouusingapplet.jar" alt="Why are you still using applets?"></applet>




