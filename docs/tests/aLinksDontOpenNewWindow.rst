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

    <a href="page.html">View my page</a>



Right
-----

.. code-block:: html

    <a href="page.html">View my page (opens new window)</a>




