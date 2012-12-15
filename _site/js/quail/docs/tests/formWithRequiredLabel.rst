===============================
Input items which are required are marked as so in the label element
===============================

*Severity code:* Information only

.. php:class:: formWithRequiredLabel


If a form element is required, it should marked as so. This should not be a mere red asterisk, but instead either a 'required' image with alt text of "required" or the actual text "required." The indicator that an item is required should be included in the input element's <code>label element.



<h4>Examples</h4>Wrong
-----

.. code-block:: html

    <label for="first_name">First Name</label>*<input type="text" id="first_name" name="first_name"/>




.. code-block:: html

    <label for="first_name">First Name (required)</label> <input type="text" id="first_name" name="first_name"/>




