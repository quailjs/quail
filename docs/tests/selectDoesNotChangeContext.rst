===============================
Select" elemetns must not contain an "onchange" attribute
===============================

Severity code: 1

.. php:class:: selectDoesNotChangeContext

<p>Actions like "onchange" can take control away from users who are trying to navigate the page. Using an "onchange" attribute for things like select-list menus should instead be replaced with a drop-down and a button which initiates the action.</p><h4>Example</h4><h5>Wrong</h5><p><code>&lt;form&gt;&lt;select onchange="location = this.options[this.selectedIndex].value;"&gt;&lt;option value="home.html"&gt;Home Page&lt;/option&gt;&lt;option value="dog.html"&gt;My Dog&lt;/option&gt;&lt;/select&gt;&lt;/form&gt;</code></p><h5>Right</h5><p><code>&lt;form action="go.html"&gt;&lt;select&gt;&lt;option value="home.html"&gt;Home Page&lt;/option&gt;&lt;option value="dog.html"&gt;My Dog&lt;/option&gt;&lt;/select&gt;&lt;input type="submit" value="Go"/&gt;&lt;/form&gt;</code></p>
