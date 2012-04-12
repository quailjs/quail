===============================
All h4 elements are not used for formatting
===============================

Severity code: 3

.. php:class:: headerH4Format

<p>An <code>h4</code> element may not be used purely for formatting.</p><p>Users of screen readers often use headers to discover the structure of the document, and using headers for formatting can cause this method of navigating the document to be confusing. Try using CSS styles to apply formatting to the item instead.</p><h4>Example</h4><h5>Wrong</h5><p><code>&lt;h4&gt;I wanted a line to be bold and large but this is just a regular paragraph.&lt;/h4&gt;</code></p><h5>Right</h5><p><code>&lt;p class="large-item"&gt;&lt;strong&gt;I wanted a line to be bold and large but this is just a regular paragraph.&lt;/strong&gt;&lt;/p&gt;</code></p>
