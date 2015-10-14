QUAIL Changelog
===============

2.2.19
------
- Removed YouTube subtitle check

2.2.18
------
- The order of the arguments to the test runners has changed. It was
```
// args[0]: The test runner script.
// args[1]: The URL to evaluate.
// args[2]: The current working directory.
// args[3]: The file to write analysis to.
```
and it is now
```
// args[0]: The test runner script.
// args[1]: The URL to evaluate.
// args[2]: The current working directory.
// args[3]: The configuration for the phantomjs instance.
// args[4]: The file to write analysis to.
```

2.2.17
------
- Added --output option to the commandline

2.2.16
------
- Fixes for pNotUsedAsHeader (@mlewand)

2.2.15
------
- Downgraded the testability of pNotUsedAsHeader to 0.5 from 1.0

2.2.14
------
- Fixes for videosEmbeddedOrLinkedNeedCaptions

2.2.13
------
- Flubbed up version, please ignore.

2.2.12
------
- Make the address to test available to page.evaluate

2.2.11
------
- Pulled the color tests into separate tests (PR #296)
- Introduction WCAG2 test runner option
- Implemented tableHeaders in linkHasAUniqueContext
- Added tableHeaders.js
- Fixed inputImageHasAlt test
- Refactored tagsAreNestCorrectly to be a pass/fail test
- Rewrote aInPHasADistinctStyle

2.2.10
------
- No release, skipped.

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
