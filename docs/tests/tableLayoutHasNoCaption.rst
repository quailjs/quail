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

    &lt;table&gt;&lt;caption&gt;The layout of this page, broken into two areas.&lt;/caption&gt;...



Right
-----

.. code-block:: html

    &lt;table&gt;...




