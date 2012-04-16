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

    &lt;applet archive="whyareyouusingapplet.jar"&gt;&lt;/applet&gt;



Right
-----

.. code-block:: html

    &lt;applet archive="whyareyouusingapplet.jar"&gt;Why are you still using applets?&lt;/applet&gt;




