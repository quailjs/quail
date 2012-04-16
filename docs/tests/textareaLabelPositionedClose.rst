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

    <label for="essay">Enter your essay:</label> [... lots of stuff ...] <textarea id="essay" name="essay"></textarea>



Right
-----

.. code-block:: html

    <label for="essay">Enter your essay:</label> <textarea id="essay" name="essay"></textarea>




