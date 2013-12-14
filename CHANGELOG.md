QUAIL Changelog
===============

2.1
---
- Changed license to MIT
- Quail is now split into various components and custom callbacks that are build using `grunt build`
- Configuration is now in YAML format
- Tests are explicitly aligned with WCAG techniques or success criteria.
- Tests can have translatable titles and default descriptions.
- Tests now support different configurations based on guideline alignment.

2.0.4
-----
- Moved source files to different files in `/src`, `/dist` is now built versions of quail.
- Renamed all test files to match their accessibility tests.
- Updated most test files to HTML5 doctype.
- Got rid of dependencies for pxtoem and hasEvent libraries.
- Made strings build into JS instead of needing ajax calls.

2.0.3
-----
- Added tags to tests so that they could be categorized by implementations.
- Cleaned up some Grunt linting.

2.0.2
-----
 - Added filtering as an extra option.
 - Allowed for adding custom tests through a customTests option.
 - Bug fixes on CSS color contrast

2.0.1
-----
 - Removed unused tests from OAC
 - A few bug fixes on test reporting

2.0.0
-----

Rebuild of QUAIL as a jQuery plugin instead of being a PHP library.