===============================
The "marquee" tag should not be used
===============================

*Severity code:* Severe error

.. php:class:: marqueeIsNotUsed


The <code>marquee element is difficult for users to read and is not a standard HTML element. Try to find another way to convey the importance of this text.



Example
-------
Wrong
-----

.. code-block:: html

    <marquee>This is really hard to read</marquee>



Right
-----

.. code-block:: html

    <strong>This is much easier to read</strong>




