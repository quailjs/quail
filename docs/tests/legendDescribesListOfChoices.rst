===============================
All "legend" elements must describe the group of choices
===============================

Severity code: 3

.. php:class:: legendDescribesListOfChoices

<p>If a <code>legend</code> element is used in a fieldset, the <code>legend</code> content must describe the group of choices.</p><h4>Example</h4><h5>Wrong</h5><p><code>&lt;fieldset&gt;    &lt;legend&gt;Some fields:&lt;/legend&gt;    &lt;label for="name"&gt;Name:&lt;/label&gt; &lt;input type="text" size="30" id="name"/&gt;&lt;br /&gt;    &lt;label for="email"&gt;Email:&lt;/label&gt; &lt;input type="text" size="30" id="email"/&gt;&lt;br /&gt;&lt;/fieldset&gt;</code></p><h5>Right</h5><p><code>&lt;fieldset&gt;    &lt;legend&gt;Personal Information:&lt;/legend&gt;    &lt;label for="name"&gt;Name:&lt;/label&gt; &lt;input type="text" size="30" id="name"/&gt;&lt;br /&gt;    &lt;label for="email"&gt;Email:&lt;/label&gt; &lt;input type="text" size="30" id="email"/&gt;&lt;br /&gt;&lt;/fieldset&gt;</code></p>
