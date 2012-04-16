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

    &lt;p&gt;This is a paragraph in english.&lt;/p&gt;&lt;p&gt;Esta frase es en espa&amp;ntilde;ol.&lt;/p&gt; (Spanish)&lt;/p&gt;



Right
-----

.. code-block:: html

    &lt;p&gt;This is a paragraph in english.&lt;/p&gt;&lt;p lang="es"&gt;Esta frase es en espa&amp;ntilde;ol.&lt;/p&gt;




