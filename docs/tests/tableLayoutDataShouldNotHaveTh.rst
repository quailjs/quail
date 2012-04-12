===============================
Layout tables should not contain "th" elements
===============================

*Severity code:* Information only

.. php:class:: tableLayoutDataShouldNotHaveTh

<p>Tables which are used purely for layout (as opposed to data tables), <strong>should not</strong> contain <code>th</code> elements, which would make the table appear to be a data table.</p><h4>Example</h4><h5>Wrong</h5><p><code>&lt;table&gt;&lt;tr&gt;&lt;th&gt;Sidebar&lt;/th&gt;&lt;th&gt;Content&lt;/th&gt;&lt;tr&gt;&lt;td&gt;Navigation&lt;/td&gt;&lt;td&gt;Stuff&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;</code></p><h5>Right</h5><p><code>&lt;table&gt;&lt;tr&gt;&lt;td&gt;Sidebar&lt;/td&gt;&lt;td&gt;Content&lt;/td&gt;&lt;tr&gt;&lt;td&gt;Navigation&lt;/td&gt;&lt;td&gt;Stuff&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;</code></p>
