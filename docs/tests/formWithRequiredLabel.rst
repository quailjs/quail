===============================
Input items which are required are marked as so in the label element
===============================

Severity code: 3

.. php:class:: formWithRequiredLabel

<p>If a form element is required, it should marked as so. This should not be a mere red asterisk, but instead either a 'required' image with alt text of "required" or the actual text "required." The indicator that an item is required should be included in the input element's <code>label</code> element.</p><h4>Examples</h4><h5>Wrong</h5><p><code>&lt;label for="first_name"&gt;First Name&lt;/label&gt;*&lt;input type="text" id="first_name" name="first_name"/&gt;</code></p><p><code>&lt;label for="first_name"&gt;First Name (required)&lt;/label&gt; &lt;input type="text" id="first_name" name="first_name"/&gt;</code></p>
