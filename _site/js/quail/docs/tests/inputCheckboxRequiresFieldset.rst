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

    <input type="checkbox" name="option-a" id="a"/><label for="a">Option A</label><br/><input type="checkbox" name="option-b" id="b"/><label for="b">Option B</label>



Right
-----

.. code-block:: html

    <fieldset><legend>Several options</legend><input type="checkbox" name="option-a" id="a"/><label for="a">Option A</label><br/><input type="checkbox" name="option-b" id="b"/><label for="b">Option B</label></fieldset>




