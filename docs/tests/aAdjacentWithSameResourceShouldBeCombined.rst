===============================
Adjacent links that point to the same location should be merged
===============================

*Severity code:* Severe error

.. php:class:: aAdjacentWithSameResourceShouldBeCombined

<p>Because many users of screen-readers use links to navigate the page, providing two links right next to eachother that points to the same location can be confusing. Try combining the links.</p>  <h4>Example</h4> <h5>Wrong</h5> <p><code>You can also &lt;a href="article.html"&gt;read more of&lt;/a&gt; &lt;a href="article.html"&gt;my great article&lt;/a&gt;.</code></p> <h5>Right</h5> <p><code>You can also &lt;a href="article.html"&gt;read more of my great article&lt;/a&gt;.</code></p> 
