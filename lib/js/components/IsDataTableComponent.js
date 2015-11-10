/**
 * Read more about this function here: https://github.com/quailjs/quail/wiki/Layout-versus-data-tables
 */
'use strict';

var IsDataTableComponent = function IsDataTableComponent(table) {
  // If there are less than three rows, why do a table?
  if (table.find('tr').length < 3) {
    return false;
  }
  // If you are scoping a table, it's probably not being used for layout
  if (table.find('th[scope]').length) {
    return true;
  }
  var numberRows = table.find('tr:has(td)').length;
  // Check for odd cell spanning
  var spanCells = table.find('td[rowspan], td[colspan]');
  var isDataTable = true;
  if (spanCells.length) {
    var spanIndex = {};
    spanCells.each(function () {
      if (typeof spanIndex[$(this).index()] === 'undefined') {
        spanIndex[$(this).index()] = 0;
      }
      spanIndex[$(this).index()]++;
    });
    $.each(spanIndex, function (index, count) {
      if (count < numberRows) {
        isDataTable = false;
      }
    });
  }
  // If there are sub tables, but not in the same column row after row, this is a layout table
  var subTables = table.find('table');
  if (subTables.length) {
    var subTablesIndexes = {};
    subTables.each(function () {
      var parentIndex = $(this).parent('td').index();
      if (parentIndex !== false && typeof subTablesIndexes[parentIndex] === 'undefined') {
        subTablesIndexes[parentIndex] = 0;
      }
      subTablesIndexes[parentIndex]++;
    });
    $.each(subTablesIndexes, function (index, count) {
      if (count < numberRows) {
        isDataTable = false;
      }
    });
  }
  return isDataTable;
};

module.exports = IsDataTableComponent;