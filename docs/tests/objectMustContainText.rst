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

    &lt;object src="widget.html" title=""&gt;&lt;/object&gt;



Right
-----

.. code-block:: html

    &lt;object src="widget.html" title="A small web widget"&gt;A widget of stock prices. &lt;a href="widget.html"&gt;Access this widget.&lt;/a&gt;&lt;/object&gt;




