===============================
A "longdesc" attribute is required for any image where additional information not in the "alt" attribute is required
===============================

Severity code: 1

.. php:class:: imgHasLongDesc

<p>Any image that has an "alt" attribute that does not fully convey the meaning of the image must have a "longdesc" attribute.</p><h4>Example</h4><h5>Wrong</h5><p><code>&lt;img src="complexImage.png" alt="A complex image that cannot be described succinctly."&gt;</code></p><h5>Right</h5><p><code>&lt;img src="complexImage.png" alt="A complex image that cannot be described succinctly." longdesc="longer_description.html"&gt;</code></p>
