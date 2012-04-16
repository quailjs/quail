===============================
Lists should not be used for formatting
===============================

*Severity code:* Information only

.. php:class:: listNotUsedForFormatting


Lists like <code>ul and <code>ol are to provide a structured list, and should not be used to format text. This test views any list with just one item as suspicious, but should be manually reviewed.



Example
-------
Wrong
-----

.. code-block:: html

    &lt;ul&gt;&lt;li&gt;Something I just wanted indented&lt;/li&gt;&lt;/ul&gt;



Right
-----

.. code-block:: html

    &lt;p style="margin-left: 10px;"&gt;Something I just wanted indented&lt;/p&gt;




