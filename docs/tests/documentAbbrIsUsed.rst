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

    &lt;p&gt;I work for the CIA.&lt;/p&gt;



Right
-----

.. code-block:: html

    &lt;p&gt;I work for the &lt;abbr title="Central Intelligence Agency"&gt;CIA&lt;/abbr&gt;.&lt;/p&gt;




