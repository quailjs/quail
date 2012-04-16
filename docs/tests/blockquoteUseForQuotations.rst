===============================
If long quotes are in the document, use the "blockquote" element to mark them
===============================

*Severity code:* Possible error

.. php:class:: blockquoteUseForQuotations


.. code-block:: html

    Blockquote tags are for actual long passages of quoted material, and should be used in these cases.




Automated tests cannot tell if text is an actual quote or not, so the content of any <code>blockquote should be reviwed manually.



Example
-------
Wrong
-----

.. code-block:: html

    <p>A long quote of several sentences. This should probably be placed in a blockquote, as it is too long to read in a single sentence, and the presence of a blockquote tag would help indicate it is actually an excerpt from somewhere else.</p>



Right
-----

.. code-block:: html

    <p><blockquote>A long quote of several sentences. This should probably be placed in a blockquote, as it is too long to read in a single sentence, and the presence of a blockquote tag would help indicate it is actually an excerpt from somewhere else.</blockquote>




