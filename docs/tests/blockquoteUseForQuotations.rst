===============================
If long quotes are in the document, use the "blockquote" element to mark them
===============================

Severity code: 2

.. php:class:: blockquoteUseForQuotations

<p><code>Blockquote</code> tags are for actual long passages of quoted material, and should be used in these cases.</p><p>Automated tests cannot tell if text is an actual quote or not, so the content of any <code>blockquote</code> should be reviwed manually.</p><h4>Example</h4><h5>Wrong</h5><p><code>&lt;p&gt;A long quote of several sentences. This should probably be placed in a blockquote, as it is too long to read in a single sentence, and the presence of a blockquote tag would help indicate it is actually an excerpt from somewhere else.&lt;/p&gt;</code></p><h5>Right</h5><p><code>&lt;p&gt;&lt;blockquote&gt;A long quote of several sentences. This should probably be placed in a blockquote, as it is too long to read in a single sentence, and the presence of a blockquote tag would help indicate it is actually an excerpt from somewhere else.&lt;/blockquote&gt;</code></p>
