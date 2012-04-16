===============================
Select" elemetns must not contain an "onchange" attribute
===============================

*Severity code:* Severe error

.. php:class:: selectDoesNotChangeContext


Actions like "onchange" can take control away from users who are trying to navigate the page. Using an "onchange" attribute for things like select-list menus should instead be replaced with a drop-down and a button which initiates the action.



Example
-------
Wrong
-----

.. code-block:: html

    &lt;form&gt;&lt;select onchange="location = this.options[this.selectedIndex].value;"&gt;&lt;option value="home.html"&gt;Home Page&lt;/option&gt;&lt;option value="dog.html"&gt;My Dog&lt;/option&gt;&lt;/select&gt;&lt;/form&gt;



Right
-----

.. code-block:: html

    &lt;form action="go.html"&gt;&lt;select&gt;&lt;option value="home.html"&gt;Home Page&lt;/option&gt;&lt;option value="dog.html"&gt;My Dog&lt;/option&gt;&lt;/select&gt;&lt;input type="submit" value="Go"/&gt;&lt;/form&gt;




