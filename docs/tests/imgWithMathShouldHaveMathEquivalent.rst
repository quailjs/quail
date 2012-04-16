===============================
Images which contain math equations should provide equivalent MathML
===============================

*Severity code:* Information only

.. php:class:: imgWithMathShouldHaveMathEquivalent


Images which contain math equations should be accompanied or link to a document with the equivalent equation marked up with <a href="http://www.w3.org/Math/">MathML</a>.



Example
-------
Wrong
-----

.. code-block:: html

    <img src="equation.png" alt="An equation which describes the average wind velocity of an unlaiden swallow. ">



Right
-----

.. code-block:: html

    <img src="equation.png" alt="An equation which describes the average wind velocity of an unlaiden swallow. The equation is available after this image."><mrow><apply> <eq/> <apply> <plus/> <apply>  <power/>  <ci>x</ci>  <cn>2</cn> </apply> <apply>  <times/>  <cn>4</cn>  <ci>x</ci> </apply> <cn>4</cn> </apply> <cn>0</cn></apply></mrow>




