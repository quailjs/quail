===============================
Acronyms must be marked with an "acronym" element
===============================

*Severity code:* Possible error

.. php:class:: documentAcronymsHaveElement


Abbreviations should be marked with an <code>acronym element, at least once on the page for each abbreviation.



Example
-------
Wrong
-----

.. code-block:: html

    &lt;p&gt;I work for the CIA.&lt;/p&gt;



Right
-----

.. code-block:: html

    &lt;p&gt;I work for the &lt;acronym title="Central Intelligence Agency"&gt;CIA&lt;/acronym&gt;.&lt;/p&gt;




