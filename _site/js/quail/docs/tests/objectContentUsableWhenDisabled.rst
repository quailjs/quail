===============================
When objects are disabled, content should still be available
===============================

*Severity code:* Information only

.. php:class:: objectContentUsableWhenDisabled


The content within objects should still be available, even if the object is disabled. To do this, place a link to the direct object source within the <code>object tag.



Example
-------
Wrong
-----

.. code-block:: html

    <object src="something.html"></object>



Right
-----

.. code-block:: html

    <object src="something.html"><a href="something.html">Read something</a></object>




