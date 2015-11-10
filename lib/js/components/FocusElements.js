/**
 * Elements that can (naturally) receive keyboard focus.
 */
'use strict';

var FocusElements = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'iframe', 'object', 'embed', '*[tabindex]', '*[contenteditable]'].join(', ');

module.exports = FocusElements;