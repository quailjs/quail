===============================
Any words or phrases which are not the document's primary language should be marked
===============================

*Severity code:* Information only

.. php:class:: documentWordsNotInLanguageAreMarked


If a document has words or phrases which are not in the document's primary language, those words or phrases should be properly marked. This helps indicate which language or voice a screen-reader should use to read the text.



Example
-------
Wrong
-----

.. code-block:: html

    <p>This is a paragraph in english.</p><p>Esta frase es en espa&amp;ntilde;ol.</p> (Spanish)</p>



Right
-----

.. code-block:: html

    <p>This is a paragraph in english.</p><p lang="es">Esta frase es en espa&amp;ntilde;ol.</p>




