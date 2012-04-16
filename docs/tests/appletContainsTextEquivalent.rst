===============================
All applets should contain the same content within the body of the applet
===============================

*Severity code:* Severe error

.. php:class:: appletContainsTextEquivalent


Applets should contain their text equivalents or description within the <code>applet tag itself.



Example
-------
Wrong
-----

.. code-block:: html

    <applet archive="whyareyouusingapplet.jar"></applet>



Right
-----

.. code-block:: html

    <applet archive="whyareyouusingapplet.jar">Why are you still using applets?</applet>




