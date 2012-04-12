===============================
The "alt" text for input "image" submit buttons must not be filler text
===============================

*Severity code:* Severe error

.. php:class:: inputImageAltNotRedundant

<p>Every form image button should not simply use filler text like "button" or "submit" as the "alt" text.</p><h4>Example</h4><h5>Wrong</h5><p><code>&lt;input type="image" src="mangifier.png" alt="submit"/&gt;</code></p><h5>Right</h5><p><code>&lt;input type="image" src="mangifier.png" alt="Search this site"/&gt;</code></p>
