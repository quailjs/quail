===============================
Data tables should contain "th" elements
===============================

*Severity code:* Severe error

.. php:class:: tableDataShouldHaveTh


Tables which contain data (as opposed to layout tables) should contain <code>th elements to mark headers for screen readers and enhance the structure of the document.



Example
-------
Wrong
-----

.. code-block:: html

    &lt;table&gt;&lt;tr&gt;&lt;td&gt;Header One&lt;/td&gt;&lt;td&gt;Header Two&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;1.30&lt;/td&gt;&lt;td&gt;4.50&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;



Right
-----

.. code-block:: html

    &lt;table&gt;&lt;tr&gt;&lt;th&gt;Header One&lt;/th&gt;&lt;th&gt;Header Two&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;1.30&lt;/td&gt;&lt;td&gt;4.50&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;




