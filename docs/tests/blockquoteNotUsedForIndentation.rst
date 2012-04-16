===============================
The "blockquote" tag should not be used just for indentation
===============================

*Severity code:* Possible error

.. php:class:: blockquoteNotUsedForIndentation


.. code-block:: html

    Blockquote tags are for actual long passages of quoted material, not just for formatting. Instead of using blockquote to indent content, use style sheets.




Automated tests cannot tell if this is an actual quote or not, so the content of any <code>blockquote should be reviwed manually to see if it is an actual quote or not.



Example
-------
Wrong
-----

.. code-block:: html

    <blockquote>Something I just wanted indented.</blockquote>



Right
-----

.. code-block:: html

    <p style="margin-left: 20px;">Something I just wanted indented.</p>




