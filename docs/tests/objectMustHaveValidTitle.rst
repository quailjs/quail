===============================
Objects must not have an empty title attribute
===============================

*Severity code:* Severe error

.. php:class:: objectMustHaveValidTitle


All <code>object elements should have a "title" attribute which is not empty.



Example
-------
Wrong
-----

.. code-block:: html

    &lt;object src="widget.html" title=""&gt;&lt;/object&gt;



Right
-----

.. code-block:: html

    &lt;object src="widget.html" title="A small web widget"&gt;&lt;/object&gt;




