===============================
All tables used for layout have no "caption" element
===============================

*Severity code:* Severe error

.. php:class:: tableLayoutHasNoCaption


If a table contains no data, and is used simply for layout, then it should not contain a <code>caption element.



Example
-------
Wrong
-----

.. code-block:: html

    <table><caption>The layout of this page, broken into two areas.</caption>...



Right
-----

.. code-block:: html

    <table>...




