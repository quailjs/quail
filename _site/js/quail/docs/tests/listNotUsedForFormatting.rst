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

    <ul><li>Something I just wanted indented</li></ul>



Right
-----

.. code-block:: html

    <p style="margin-left: 10px;">Something I just wanted indented</p>




