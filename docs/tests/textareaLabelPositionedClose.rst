===============================
All textareas should have a label that is close to it
===============================

*Severity code:* Possible error

.. php:class:: textareaLabelPositionedClose


All <code>textarea elements should have a corresponding <code>label element that is close in proximity..



Example
-------
Wrong
-----

.. code-block:: html

    &lt;label for="essay"&gt;Enter your essay:&lt;/label&gt; [... lots of stuff ...] &lt;textarea id="essay" name="essay"&gt;&lt;/textarea&gt;



Right
-----

.. code-block:: html

    &lt;label for="essay"&gt;Enter your essay:&lt;/label&gt; &lt;textarea id="essay" name="essay"&gt;&lt;/textarea&gt;




