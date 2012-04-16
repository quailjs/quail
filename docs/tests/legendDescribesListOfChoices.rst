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

    &lt;fieldset&gt;    &lt;legend&gt;Some fields:&lt;/legend&gt;    &lt;label for="name"&gt;Name:&lt;/label&gt; &lt;input type="text" size="30" id="name"/&gt;&lt;br /&gt;    &lt;label for="email"&gt;Email:&lt;/label&gt; &lt;input type="text" size="30" id="email"/&gt;&lt;br /&gt;&lt;/fieldset&gt;



Right
-----

.. code-block:: html

    &lt;fieldset&gt;    &lt;legend&gt;Personal Information:&lt;/legend&gt;    &lt;label for="name"&gt;Name:&lt;/label&gt; &lt;input type="text" size="30" id="name"/&gt;&lt;br /&gt;    &lt;label for="email"&gt;Email:&lt;/label&gt; &lt;input type="text" size="30" id="email"/&gt;&lt;br /&gt;&lt;/fieldset&gt;




