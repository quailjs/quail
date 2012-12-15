===============================
Legend" text must not contain placeholder text like "form" or "field
===============================

*Severity code:* Severe error

.. php:class:: legendTextNotPlaceholder


If a <code>legend element is used in a fieldset, the <code>legend should not contain useless placeholder text.



Example
-------
Wrong
-----

.. code-block:: html

    <fieldset>    <legend>Form</legend>    <label for="name">Name:</label> <input type="text" size="30" id="name"/><br />    <label for="email">Email:</label> <input type="text" size="30" id="email"/><br /></fieldset>



Right
-----

.. code-block:: html

    <fieldset>    <legend>Personal Information:</legend>    <label for="name">Name:</label> <input type="text" size="30" id="name"/><br />    <label for="email">Email:</label> <input type="text" size="30" id="email"/><br /></fieldset>




