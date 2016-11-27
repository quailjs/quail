===============================
Pages using ARIA roles should not have orphaned content
===============================

*Severity code:* Severe error

.. php:class:: ariaOrphanedContent


If a page makes use of ARIA roles, then there should not be any content on the page which is not within an element that exposes a role, as it could cause that content to be rendered inaccessible to users with screen readers.
