===============================
Layout tables should not contain "th" elements
===============================

*Severity code:* Information only

.. php:class:: tableLayoutDataShouldNotHaveTh


Tables which are used purely for layout (as opposed to data tables), <strong>should not</strong> contain <code>th elements, which would make the table appear to be a data table.



Example
-------
Wrong
-----

.. code-block:: html

    &lt;table&gt;&lt;tr&gt;&lt;th&gt;Sidebar&lt;/th&gt;&lt;th&gt;Content&lt;/th&gt;&lt;tr&gt;&lt;td&gt;Navigation&lt;/td&gt;&lt;td&gt;Stuff&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;



Right
-----

.. code-block:: html

    &lt;table&gt;&lt;tr&gt;&lt;td&gt;Sidebar&lt;/td&gt;&lt;td&gt;Content&lt;/td&gt;&lt;tr&gt;&lt;td&gt;Navigation&lt;/td&gt;&lt;td&gt;Stuff&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;




