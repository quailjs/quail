===============================
Logical groups of check boxes should be grouped with a "fieldset
===============================

*Severity code:* Severe error

.. php:class:: inputCheckboxRequiresFieldset


Related "checkbox" input fields should be grouped together using a <code>fieldset



Example
-------
Wrong
-----

.. code-block:: html

    &lt;input type="checkbox" name="option-a" id="a"/&gt;&lt;label for="a"&gt;Option A&lt;/label&gt;&lt;br/&gt;&lt;input type="checkbox" name="option-b" id="b"/&gt;&lt;label for="b"&gt;Option B&lt;/label&gt;



Right
-----

.. code-block:: html

    &lt;fieldset&gt;&lt;legend&gt;Several options&lt;/legend&gt;&lt;input type="checkbox" name="option-a" id="a"/&gt;&lt;label for="a"&gt;Option A&lt;/label&gt;&lt;br/&gt;&lt;input type="checkbox" name="option-b" id="b"/&gt;&lt;label for="b"&gt;Option B&lt;/label&gt;&lt;/fieldset&gt;




