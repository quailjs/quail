===============================
Meta" elements must not be used to refresh the content of a page
===============================

*Severity code:* Severe error

.. php:class:: documentMetaNotUsedWithTimeout


Because different users have different speeds and abilities when it comes to parsing the content of a page, a "meta-refresh" method to reload the content of the page can prevent users from having full access to the content. Try to use a "refresh this" link instead..



Example
-------
Wrong
-----

.. code-block:: html

    <head><meta http-equiv="refresh" content="60"></head>



Right
-----

.. code-block:: html

    <head></head><body><a href="here.html">Refresh</a></body>




