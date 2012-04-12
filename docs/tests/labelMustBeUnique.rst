===============================
Every form input must have only one label
===============================

*Severity code:* Severe error

.. php:class:: labelMustBeUnique

<p>Each form input should have only one <code>label</code> element.</p><h4>Example</h4><h5>Wrong</h5><p><code>&lt;label for="first_name"&gt; First name:&lt;/label&gt; &lt;label for="first_name"&gt;(Required)&lt;/label&gt; &lt;input type="text" id="first_name" name="first_name"/&gt;</code></p><h5>Right</h5><p><code>&lt;label for="first_name"&gt; First name: (Required)&lt;/label&gt; &lt;input type="text" id="first_name" name="first_name"/&gt;</code></p>
