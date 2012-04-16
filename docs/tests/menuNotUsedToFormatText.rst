===============================
Menu" elements should not be used for formattin
===============================

*Severity code:* Information only

.. php:class:: menuNotUsedToFormatText


Menu is a deprecated tag, but is still honored in a transitional DTD. Menu tags are to provide structure for a document and should not be used for formatting. If a menu tag is to be used, it should only contain an ordered or unordered list of links.



Example
-------
Wrong
-----

.. code-block:: html

    &lt;menu&gt;Something I wanted Indented&lt;/menu&gt;



Right
-----

.. code-block:: html

    &lt;p style="margin-left: 20px;"&gt;Something I wanted indented.&lt;/p&gt;




