===============================
Objects must contain their text equivalents
===============================

*Severity code:* Severe error

.. php:class:: objectMustContainText


All <code>object elements should contain a text equivalent if the object cannot be rendered.



Example
-------
Wrong
-----

.. code-block:: html

    <object src="widget.html" title=""></object>



Right
-----

.. code-block:: html

    <object src="widget.html" title="A small web widget">A widget of stock prices. <a href="widget.html">Access this widget.</a></object>




