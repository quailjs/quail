===============================
All "frame" elements should have a "title" attribute
===============================

*Severity code:* Severe error

.. php:class:: framesHaveATitle


Each <code>frame elements should have a "title" attribute.



Example
-------
Wrong
-----

.. code-block:: html

    &lt;frame src="navigation.html"&gt;&lt;/frame&gt;



Right
-----

.. code-block:: html

    &lt;frame src="navigation.html" title="The site navigation"&gt;&lt;/frame&gt;




