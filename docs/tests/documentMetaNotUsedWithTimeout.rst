===============================
Meta" elements must not be used to refresh the content of a page
===============================

*Severity code:* Severe error

.. php:class:: documentMetaNotUsedWithTimeout

<p>Because different users have different speeds and abilities when it comes to parsing the content of a page, a "meta-refresh" method to reload the content of the page can prevent users from having full access to the content. Try to use a "refresh this" link instead..</p><h4>Example</h4><h5>Wrong</h5><p><code>&lt;head&gt;&lt;meta http-equiv="refresh" content="60"&gt;&lt;/head&gt;</code></p><h5>Right</h5><p><code>&lt;head&gt;&lt;/head&gt;&lt;body&gt;&lt;a href="here.html"&gt;Refresh&lt;/a&gt;&lt;/body&gt;</code></p>
