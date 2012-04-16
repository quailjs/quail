===============================
Paragraphs must not be used for headers
===============================

*Severity code:* Severe error

.. php:class:: pNotUsedAsHeader


Headers like <code>h1-h6 are extremely useful for non-sighted users to navigate the structure of the page, and formatting a paragraph to just be big or bold, while it might visually look like a header, does not make it one.



Example
-------
Wrong
-----

.. code-block:: html

    &lt;p&gt;&lt;strong&gt;Something that really should be a header&lt;/strong&gt;&lt;/p&gt;



Right
-----

.. code-block:: html

    &lt;h3&gt;Something that really should be a header&lt;/h3&gt;




