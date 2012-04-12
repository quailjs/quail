===============================
When an image is in a link, its "alt" attribute should not repeat other text in the link
===============================

*Severity code:* Severe error

.. php:class:: aImgAltNotRepetative

<p>Images within a link should not have an alt attribute that simply repeats the text found in the link. This will cause screen readers to simply repeat the text twice.</p>  <h4>Example</h4> <h5>Wrong</h5> <p><code>&lt;a href="home.html"&gt;&lt;img src="home.png" alt="Return home"&gt;Return home&lt;/a&gt;</code></p> <h5>Right</h5> <p><code>&lt;a href="home.html"&gt;&lt;img src="home.png" alt=""&gt;Return home&lt;/a&gt;</code></p> 
