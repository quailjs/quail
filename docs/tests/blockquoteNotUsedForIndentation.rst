===============================
The "blockquote" tag should not be used just for indentation
===============================

*Severity code:* Possible error

.. php:class:: blockquoteNotUsedForIndentation

<p><code>Blockquote</code> tags are for actual long passages of quoted material, not just for formatting. Instead of using blockquote to indent content, use style sheets.</p><p>Automated tests cannot tell if this is an actual quote or not, so the content of any <code>blockquote</code> should be reviwed manually to see if it is an actual quote or not.</p><h4>Example</h4><h5>Wrong</h5><p><code>&lt;blockquote&gt;Something I just wanted indented.&lt;/blockquote&gt;</code></p><h5>Right</h5><p><code>&lt;p style="margin-left: 20px;"&gt;Something I just wanted indented.&lt;/p&gt;</code></p>
