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

    &lt;fieldset&gt;    &lt;legend&gt;Form&lt;/legend&gt;    &lt;label for="name"&gt;Name:&lt;/label&gt; &lt;input type="text" size="30" id="name"/&gt;&lt;br /&gt;    &lt;label for="email"&gt;Email:&lt;/label&gt; &lt;input type="text" size="30" id="email"/&gt;&lt;br /&gt;&lt;/fieldset&gt;



Right
-----

.. code-block:: html

    &lt;fieldset&gt;    &lt;legend&gt;Personal Information:&lt;/legend&gt;    &lt;label for="name"&gt;Name:&lt;/label&gt; &lt;input type="text" size="30" id="name"/&gt;&lt;br /&gt;    &lt;label for="email"&gt;Email:&lt;/label&gt; &lt;input type="text" size="30" id="email"/&gt;&lt;br /&gt;&lt;/fieldset&gt;




