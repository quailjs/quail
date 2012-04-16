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

    &lt;object src="widget.html"&gt;&lt;/object&gt;



Right
-----

.. code-block:: html

    &lt;object src="widget.html" title="A small web widget"&gt;&lt;/object&gt;




