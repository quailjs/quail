===============================
Images which contain math equations should provide equivalent MathML
===============================

Severity code: 3

.. php:class:: imgWithMathShouldHaveMathEquivalent

<p>Images which contain math equations should be accompanied or link to a document with the equivalent equation marked up with <a href="http://www.w3.org/Math/">MathML</a>.</p><h4>Example</h4><h5>Wrong</h5><p><code>&lt;img src="equation.png" alt="An equation which describes the average wind velocity of an unlaiden swallow. "&gt;</code></p><h5>Right</h5><p><code>&lt;img src="equation.png" alt="An equation which describes the average wind velocity of an unlaiden swallow. The equation is available after this image."&gt;&lt;mrow&gt;&lt;apply&gt; &lt;eq/&gt; &lt;apply&gt; &lt;plus/&gt; &lt;apply&gt;  &lt;power/&gt;  &lt;ci&gt;x&lt;/ci&gt;  &lt;cn&gt;2&lt;/cn&gt; &lt;/apply&gt; &lt;apply&gt;  &lt;times/&gt;  &lt;cn&gt;4&lt;/cn&gt;  &lt;ci&gt;x&lt;/ci&gt; &lt;/apply&gt; &lt;cn&gt;4&lt;/cn&gt; &lt;/apply&gt; &lt;cn&gt;0&lt;/cn&gt;&lt;/apply&gt;&lt;/mrow&gt;</code></p>
