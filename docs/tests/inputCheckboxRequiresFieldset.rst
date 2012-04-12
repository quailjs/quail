===============================
Logical groups of check boxes should be grouped with a "fieldset
===============================

Severity code: 1

.. php:class:: inputCheckboxRequiresFieldset

<p>Related "checkbox" input fields should be grouped together using a <code>fieldset</code></p><h4>Example</h4><h5>Wrong</h5><p><code>&lt;input type="checkbox" name="option-a" id="a"/&gt;&lt;label for="a"&gt;Option A&lt;/label&gt;&lt;br/&gt;&lt;input type="checkbox" name="option-b" id="b"/&gt;&lt;label for="b"&gt;Option B&lt;/label&gt;</code></p><h5>Right</h5><p><code>&lt;fieldset&gt;&lt;legend&gt;Several options&lt;/legend&gt;&lt;input type="checkbox" name="option-a" id="a"/&gt;&lt;label for="a"&gt;Option A&lt;/label&gt;&lt;br/&gt;&lt;input type="checkbox" name="option-b" id="b"/&gt;&lt;label for="b"&gt;Option B&lt;/label&gt;&lt;/fieldset&gt;</code></p>
