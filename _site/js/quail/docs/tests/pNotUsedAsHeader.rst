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

    <p><strong>Something that really should be a header</strong></p>



Right
-----

.. code-block:: html

    <h3>Something that really should be a header</h3>




