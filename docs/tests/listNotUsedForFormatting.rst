===============================
Lists should not be used for formatting
===============================

*Severity code:* Information only

.. php:class:: listNotUsedForFormatting

<p>Lists like <code>ul</code> and <code>ol</code> are to provide a structured list, and should not be used to format text. This test views any list with just one item as suspicious, but should be manually reviewed.</p><h4>Example</h4><h5>Wrong</h5><p><code>&lt;ul&gt;&lt;li&gt;Something I just wanted indented&lt;/li&gt;&lt;/ul&gt;</code></p><h5>Right</h5><p><code>&lt;p style="margin-left: 10px;"&gt;Something I just wanted indented&lt;/p&gt;</code></p>
