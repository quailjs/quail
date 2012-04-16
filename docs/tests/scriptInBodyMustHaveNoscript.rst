===============================
Scripts should have a corresponding "noscript" element
===============================

Severity code: 0

.. php:class:: scriptInBodyMustHaveNoscript


Scripts should be followed by a <code>noscripts element to guide the user to content in an alternative way.



Example
-------
Wrong
-----

.. code-block:: html

    &lt;script type="text/javascript"&gt;document.write("Hello World!")&lt;/script&gt;



Right
-----

.. code-block:: html

    &lt;script type="text/javascript"&gt;document.write("Hello World!")&lt;/script&gt;&lt;noscript&gt;Hello
