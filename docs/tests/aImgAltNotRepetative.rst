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

    &lt;a href="home.html"&gt;&lt;img src="home.png" alt="Return home"&gt;Return home&lt;/a&gt;



 Right
-----
 
.. code-block:: html

    &lt;a href="home.html"&gt;&lt;img src="home.png" alt=""&gt;Return home&lt;/a&gt;



 
