===============================
Any image within a link must have "alt" text the describes the link destination
===============================

*Severity code:* Information only

.. php:class:: imgAltIdentifiesLinkDestination


Any image that is within a link should have an "alt" attribute which identifies the destination or purpose of the link.



Example
-------
Wrong
-----

.. code-block:: html

    <a href="home.html"><img src="home.png" alt="A house"></a>



Right
-----

.. code-block:: html

    <a href="home.html"><img src="home.png" alt="Return to the home page"></a>




