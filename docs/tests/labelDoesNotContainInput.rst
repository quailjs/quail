===============================
Label" elements should not contain an input element
===============================

*Severity code:* Severe error

.. php:class:: labelDoesNotContainInput


.. code-block:: html

    Label elements should not contain an <code>input element as well.



Example
-------
Wrong
-----

.. code-block:: html

    &lt;label for="first_name"&gt;First name: &lt;input type="text" id="first_name" name="first_name"/&gt;&lt;/label&gt;



Right
-----

.. code-block:: html

    &lt;label for="first_name"&gt;First name: &lt;/label&gt;&lt;input type="text" id="first_name" name="first_name"/&gt;




