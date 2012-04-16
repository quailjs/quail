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

    1. Item One&lt;br/&gt;2. Item Two&lt;br/&gt;3.Item Three



Right
-----

.. code-block:: html

    &lt;ol&gt;&lt;li&gt;Item One&lt;/li&gt;&lt;li&gt;2. Item Two&lt;/li&gt;&lt;li&gt;3.Item Three&lt;/ol&gt;




