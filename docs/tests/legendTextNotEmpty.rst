===============================
Legend" text must not contain just whitespace
===============================

Severity code: 1

.. php:class:: legendTextNotEmpty

<p>If a <code>legend</code> element is used in a fieldset, the <code>legend</code> should not contain empty text.</p><h4>Example</h4><h5>Wrong</h5><p><code>&lt;fieldset&gt;    &lt;legend&gt; &lt;/legend&gt;    &lt;label for="name"&gt;Name:&lt;/label&gt; &lt;input type="text" size="30" id="name"/&gt;&lt;br /&gt;    &lt;label for="email"&gt;Email:&lt;/label&gt; &lt;input type="text" size="30" id="email"/&gt;&lt;br /&gt;&lt;/fieldset&gt;</code></p><h5>Right</h5><p><code>&lt;fieldset&gt;    &lt;legend&gt;Personal Information:&lt;/legend&gt;    &lt;label for="name"&gt;Name:&lt;/label&gt; &lt;input type="text" size="30" id="name"/&gt;&lt;br /&gt;    &lt;label for="email"&gt;Email:&lt;/label&gt; &lt;input type="text" size="30" id="email"/&gt;&lt;br /&gt;&lt;/fieldset&gt;</code></p>
