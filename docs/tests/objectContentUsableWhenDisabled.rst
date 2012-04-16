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

    &lt;object src="something.html"&gt;&lt;/object&gt;



Right
-----

.. code-block:: html

    &lt;object src="something.html"&gt;&lt;a href="something.html"&gt;Read something&lt;/a&gt;&lt;/object&gt;




