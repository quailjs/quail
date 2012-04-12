===============================
Images should not have a simple placeholder text as an "alt" attribute
===============================

Severity code: 1

.. php:class:: imgAltNotPlaceHolder

<p>Any image that is not used decorativey or which is purely for layout purposes cannot have an "alt" attribute that consists solely of placeholders. Placeholders include:</p><ul><li>nbsp</li><li>&amp;nbsp;</li><li>spacer</li><li>image</li><li>img</li><li>photo</li></ul><h4>Example</h4><h5>Wrong</h5><p><code>&lt;img src="dog.jpg" alt="image"&gt;</code></p><h5>Right</h5><p><code>&lt;img src="dog.jpg" alt="A photograph of a dog"&gt;</code></p>
