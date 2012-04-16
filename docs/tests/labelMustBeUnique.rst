===============================
Every form input must have only one label
===============================

*Severity code:* Severe error

.. php:class:: labelMustBeUnique


Each form input should have only one <code>label element.



Example
-------
Wrong
-----

.. code-block:: html

    &lt;label for="first_name"&gt; First name:&lt;/label&gt; &lt;label for="first_name"&gt;(Required)&lt;/label&gt; &lt;input type="text" id="first_name" name="first_name"/&gt;



Right
-----

.. code-block:: html

    &lt;label for="first_name"&gt; First name: (Required)&lt;/label&gt; &lt;input type="text" id="first_name" name="first_name"/&gt;




