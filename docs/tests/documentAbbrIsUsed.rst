===============================
Abbreviations must be marked with an "abbr" element
===============================

*Severity code:* Possible error

.. php:class:: documentAbbrIsUsed


Abbreviations should be marked with an <code>abbr element, at least once on the page for each abbreviation.



Example
-------
Wrong
-----

.. code-block:: html

    <p>I work for the CIA.</p>



Right
-----

.. code-block:: html

    <p>I work for the <abbr title="Central Intelligence Agency">CIA</abbr>.</p>




