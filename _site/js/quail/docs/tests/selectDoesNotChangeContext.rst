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

    <form><select onchange="location = this.options[this.selectedIndex].value;"><option value="home.html">Home Page</option><option value="dog.html">My Dog</option></select></form>



Right
-----

.. code-block:: html

    <form action="go.html"><select><option value="home.html">Home Page</option><option value="dog.html">My Dog</option></select><input type="submit" value="Go"/></form>




