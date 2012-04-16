===============================
Emoticons should not be used excessively
===============================

*Severity code:* Possible error

.. php:class:: emoticonsExcessiveUse


Emoticons should not be used excessively to communicate feelings or content. Try to rewrite the document to have more textual meaning, or wrapping the emoticons in an <code>abbr element as outlined below. Emoticons are not read by screen-readers, and are often used to communicate feelings or other things which are relevant to the content of the document.



Example
-------
Wrong
-----

.. code-block:: html

    Of course, I'll get on it right away ;)



Right
-----

.. code-block:: html

    Of course, I'll get on it right away <abbr title="wink">;)</abbr>




