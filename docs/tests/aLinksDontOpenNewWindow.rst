===============================
Links should not open a new window without warning
===============================

*Severity code:* Severe error

.. php:class:: aLinksDontOpenNewWindow


Links which open a new window using the "target" attribute should warn users.



Example
-------
Wrong
-----

.. code-block:: html

    &lt;a href="page.html"&gt;View my page&lt;/a&gt;



Right
-----

.. code-block:: html

    &lt;a href="page.html"&gt;View my page (opens new window)&lt;/a&gt;




