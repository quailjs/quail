===============================
Labels must contain text
===============================

*Severity code:* Severe error

.. php:class:: labelMustNotBeEmpty


.. code-block:: html

    Label elements should contain text which communicates the purpose of its assigned input element.



Example
-------
Wrong
-----

.. code-block:: html

    &lt;label for="first_name"&gt; &lt;/label&gt;First name: &lt;input type="text" id="first_name" name="first_name"/&gt;



Right
-----

.. code-block:: html

    &lt;label for="first_name"&gt;First name: &lt;/label&gt;&lt;input type="text" id="first_name" name="first_name"/&gt;




