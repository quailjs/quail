===============================
Visual lists of items are marked using ordered or unordered lists
===============================

*Severity code:* Severe error

.. php:class:: documentVisualListsAreMarkedUp


Use the ordered (<code>ol) or unordered (<code>ul) elements for lists of items, instead of just using new lines which start with numbers or characters to create a visual list.



Example
-------
Wrong
-----

.. code-block:: html

    1. Item One<br/>2. Item Two<br/>3.Item Three



Right
-----

.. code-block:: html

    <ol><li>Item One</li><li>2. Item Two</li><li>3.Item Three</ol>




