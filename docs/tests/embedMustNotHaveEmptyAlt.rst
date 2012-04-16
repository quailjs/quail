===============================
Embed" elements cannot have an empty "alt" attribute
===============================

*Severity code:* Severe error

.. php:class:: embedMustNotHaveEmptyAlt


All <code>embed elements must have an "alt" attribute that is not empty.



Example
-------
Wrong
-----

.. code-block:: html

    &lt;embed src="dog.mov" alt=""/&gt;



Right
-----

.. code-block:: html

    &lt;embed src="dog.mov" alt="A movie featuring a dog dancing a ballet."/&gt;




