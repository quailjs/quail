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

    <script type="text/javascript">document.write("Hello World!")</script>



Right
-----

.. code-block:: html

    <script type="text/javascript">document.write("Hello World!")</script><noscript>Hello
