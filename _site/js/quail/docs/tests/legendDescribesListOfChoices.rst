===============================
All "legend" elements must describe the group of choices
===============================

*Severity code:* Information only

.. php:class:: legendDescribesListOfChoices


If a <code>legend element is used in a fieldset, the <code>legend content must describe the group of choices.



Example
-------
Wrong
-----

.. code-block:: html

    <fieldset>    <legend>Some fields:</legend>    <label for="name">Name:</label> <input type="text" size="30" id="name"/><br />    <label for="email">Email:</label> <input type="text" size="30" id="email"/><br /></fieldset>



Right
-----

.. code-block:: html

    <fieldset>    <legend>Personal Information:</legend>    <label for="name">Name:</label> <input type="text" size="30" id="name"/><br />    <label for="email">Email:</label> <input type="text" size="30" id="email"/><br /></fieldset>




