===============================
All element "id" attributes must be unique
===============================

*Severity code:* Severe error

.. php:class:: documentIDsMustBeUnique


Element "id" attributes must be unique.



Example
-------
Wrong
-----

.. code-block:: html

    &lt;p id="paragraph"&gt;First Paragraph&lt;/p&gt;&lt;p id="paragraph"&gt;Second Paragraph&lt;/p&gt;



Right
-----

.. code-block:: html

    &lt;p id="paragraph-1"&gt;First Paragraph&lt;/p&gt;&lt;p id="paragraph-2"&gt;Second Paragraph&lt;/p&gt;




