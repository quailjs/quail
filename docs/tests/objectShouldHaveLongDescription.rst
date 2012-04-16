===============================
An object might require a long description
===============================

*Severity code:* Information only

.. php:class:: objectShouldHaveLongDescription


Objects might require a long description, especially if their content is complicated.



Example
-------
Wrong
-----

.. code-block:: html

    <object data="map_of_the_world.mov"></object>



Right
-----

.. code-block:: html

    <object data="map_of_the_world.mov" longdesc="description.html"></object>




