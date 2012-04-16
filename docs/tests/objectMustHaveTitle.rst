===============================
Objects should have a title attribute
===============================

*Severity code:* Severe error

.. php:class:: objectMustHaveTitle


All <code>object elements should contain a "title" attribute.



Example
-------
Wrong
-----

.. code-block:: html

    <object src="widget.html"></object>



Right
-----

.. code-block:: html

    <object src="widget.html" title="A small web widget"></object>




