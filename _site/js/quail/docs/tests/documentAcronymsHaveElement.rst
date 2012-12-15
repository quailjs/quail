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

    <p>I work for the CIA.</p>



Right
-----

.. code-block:: html

    <p>I work for the <acronym title="Central Intelligence Agency">CIA</acronym>.</p>




