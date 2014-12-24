(function ($) {
  var scopeValues = ['row', 'col', 'rowgroup', 'colgroup'];

  $.fn.getTableMap = function () {
    var map = [];
    this.find('tr').each(function (y) {
      if (typeof map[y] === 'undefined') {
        map[y] = [];
      }
      var row = map[y];
      $(this).children().each(function () {
        var x;
        var i, il;
        var cell = $(this);

        // Grab the width and height, undefined, invalid or 0 become 1
        var height = +cell.attr('rowspan') || 1;
        var width = +cell.attr('colspan') || 1;
        // Make x the first undefined cell in the row
        for (i = 0, il = row.length; i <= il; i += 1) {
          if (x === undefined && row[i] === undefined) {
            x = i;
          }
        }
        // add 'this' to each coordinate in the map based on width and height
        for (i = 0, il = width * height; i < il; i += 1) {
          // Create a new row if it doesn't exist yet
          if (map[y + ~~(i/width)] === undefined) {
            map[y + ~~(i/width)] = [];
          }
          // Add the cell to the correct x / y coordinates
          map[y + ~~(i/width)][x + (i % width)] = this;
        }
      });

    });
    return map;
  };

  function isColumnHeader(tableMap, cell, x, y) {
    var height = cell.attr('rowspan') || 1;
    var scope = cell.attr('scope');
    if (scope === 'col') {
      return true;
    } else if (scopeValues.indexOf(scope) !== -1) {
      return false;
    }

    for (var i = 0; i < height * tableMap[y].length -1; i+=1) {
      var currCell = $(tableMap[y + i % height][~~(i / height)]);
      if (currCell.is('td')) {
        return false;
      }
    }
    return true;
  }

  function isRowHeader(tableMap, cell, x, y) {
    var width = cell.attr('colspan') || 1;
    var scope = cell.attr('scope');

    if (scope === 'row') {
      return true;
    } else if (scopeValues.indexOf(scope) !== -1 ||
    isColumnHeader(tableMap, cell, x, y)) {
      return false;
    }

    for (var i = 0; i < width * tableMap.length -1; i+=1) {
      var currCell = $(tableMap[~~(i / width)][x + i % width]);
      if (currCell.is('td')) {
        return false;
      }
    }
    return true;
  }

  function scanHeaders(tableMap, x, y, deltaX, deltaY) {
    var headerList = $();
    var cell = $(tableMap[y][x]);
    var opaqueHeaders = [];
    var inHeaderBlock;
    var headersFromCurrBlock;

    if (cell.is('th')) {
      headersFromCurrBlock = [{
        cell: cell,
        x: x,
        y: y
      }];

      inHeaderBlock = true;
    } else {
      inHeaderBlock = false;
      headersFromCurrBlock = [];
    }

    for (; x >= 0 && y >= 0; x += deltaX, y += deltaY) {
      var currCell = $(tableMap[y][x]);
      var dir = (deltaX === 0 ? 'col' : 'row');

      if (currCell.is('th')) {
        inHeaderBlock = true;
        headersFromCurrBlock.push({
          cell: currCell,
          x: x,
          y: y
        });
        var blocked = false;
        if (deltaY === -1 && isRowHeader(tableMap, currCell, x, y) ||
        deltaX === -1 && isColumnHeader(tableMap, currCell, x, y)) {
          blocked = true;

        } else {
          $.each(opaqueHeaders, function (i, opaqueHeader) {
            var currSize = +currCell.attr(dir + 'span') || 1;
            var opaqueSize = +$(opaqueHeader.cell).attr(dir + 'span') || 1;
            if (currSize === opaqueSize) {
              if (deltaY === -1 && opaqueHeader.x === x ||
                  deltaX === -1 && opaqueHeader.y === y)  {
                blocked = true;
              }
            }
          });
        }
        if (blocked === false) {
          headerList = headerList.add(currCell);
        }

      } else if (currCell.is('td') && inHeaderBlock === true) {
        inHeaderBlock = false;
        opaqueHeaders.push(headersFromCurrBlock);
        headersFromCurrBlock = $();
      }
    }
    return headerList;
  }

  /**
   * Get header cells based on the headers attribute of a cell
   */
  function getHeadersFromAttr(cell) {
    var table = cell.closest('table');
    var ids = cell.attr('headers').split(/\s/);
    var headerCells = $();
    // For each IDREF select an element with that ID from the table
    // Only th/td cells in the same table can be headers
    $.each(ids, function (i, id) {
      headerCells = headerCells.add($('th#' + id + ', td#' + id, table));
    });
    return headerCells;
  }

  function findCellInTableMap(tableMap, cell) {
    var i = 0;
    var y = 0;
    var x;
    // Locate the x and y coordinates of the current cell
    while (x === undefined) {
      if (tableMap[y] === undefined) {
        return;
      } else if (tableMap[y][i] === cell[0]) {
        x = i;

      } else if (i + 1 === tableMap[y].length) {
        y += 1;
        i = 0;
      } else {
        i += 1;
      }
    }
    return {x: x, y: y};
  }


  function getHeadersFromScope(cell, tableMap) {
    var i;
    var headerCells = $();
    var coords = findCellInTableMap(tableMap, cell);

    // Grab the width and height, undefined, invalid or 0 become 1
    var height = +cell.attr('rowspan') || 1;
    var width = +cell.attr('colspan') || 1;

    for (i = 0; i < width; i++) {
      headerCells = headerCells.add(
        scanHeaders(tableMap, coords.x + i, coords.y, 0, -1)
      );
    }

    for (i = 0; i < height; i++) {
      headerCells = headerCells.add(
        scanHeaders(tableMap, coords.x, coords.y + i, -1, 0)
      );
    }
    return headerCells;
  }


  function getHeadersFromGroups(cell, tableMap) {
    var cellCoords = findCellInTableMap(tableMap, cell);
    var headers = $();

    cell.closest('thead, tbody, tfoot')
    .find('th[scope=rowgroup]').each(function () {
      var headerCoords = findCellInTableMap(tableMap, $(this));
      if (headerCoords.x <= cellCoords.x && headerCoords.y <= cellCoords.y) {
        headers = headers.add(this);
      }
    });

    // TODO colgroups

  }

  $.fn.tableHeaders = function () {
    var headers = $();
    this.each(function () {
      var $this = $(this);

      if ($this.is(':not(td, th)')) {
        return;
      }

      if ($this.is('[headers]')) {
        headers = headers.add(getHeadersFromAttr($this));

      } else {
        var map = $this.closest('table').getTableMap();
        headers = headers
        .add(getHeadersFromScope($this, map))
        .add(getHeadersFromGroups($this, map));

      }
    });
    return headers.not(':empty').not(this);
  };


}(jQuery));
