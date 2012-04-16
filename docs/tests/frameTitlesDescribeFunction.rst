===============================
All "frame" elemetns should have a "title" attribute that describes the purpose of the frame
===============================

*Severity code:* Information only

.. php:class:: frameTitlesDescribeFunction


Each <code>frame elements should have a "title" attribute which describes the purpose or function of the frame.



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




