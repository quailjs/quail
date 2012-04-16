===============================
Unless the image files are the same, no image should contain redundant alt text
===============================

*Severity code:* Severe error

.. php:class:: imgAltTextNotRedundant


Every distinct image on a page should have it's own <em>alt</em> text which is different than all the others on the page to avoid redundancy and confusion.



Example
-------
Wrong
-----

.. code-block:: html

    <img src=&quot;rex.jpg&quot; alt=&quot;this is an image of rex&quot;><img src=&quot;me.jpg&quot; alt=&quot;this is an image of rex&quot;>



Right
-----

.. code-block:: html

    <img src=&quot;rex.jpg&quot; alt=&quot;this is an image of rex&quot;><img src=&quot;me.jpg&quot; alt=&quot;a photo of myself&quot;>




