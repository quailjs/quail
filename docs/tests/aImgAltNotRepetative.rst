===============================
When an image is in a link, its "alt" attribute should not repeat other text in the link
===============================

*Severity code:* Severe error

.. php:class:: aImgAltNotRepetative


Images within a link should not have an alt attribute that simply repeats the text found in the link. This will cause screen readers to simply repeat the text twice.



Example
-------
 Wrong
-----

.. code-block:: html

    <a href="home.html"><img src="home.png" alt="Return home">Return home</a>



 Right
-----
 
.. code-block:: html

    <a href="home.html"><img src="home.png" alt="">Return home</a>



 
