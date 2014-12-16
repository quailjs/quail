(function ($) {

  $.fn.getTableMap = function () {
    var map = [];
    this.find('tr').each(function (y) {
      if (typeof map[y] === 'undefined') {
        map[y] = [];
      }
      var row = map[y];
      $(this).children().each(function () {
        var x;
        var i;
        var cell = $(this);

        // Grab the width and height, undefined, invalid or 0 become 1
        var height = +cell.attr('rowspan') || 1;
        var width = +cell.attr('colspan') || 1;

        // Make x the first undefined cell in thw row
        for (i=0; i < row.length; i+=1) {
          if (!x && row[i] === undefined) {
            x = i;
          }
        }
        // add 'this' to each coordinate in the map based on width and height
        for (i = 0; i < width * height; i+=1) {
          // Create a new row if it doesn't exist yet
          if (map[y + ~~(i/width)]) {
            map[y + ~~(i/width)] = [];
          }
          // Add the cell to the correct x / y coordinates
          map[y + ~~(i/width)][x + (i % width)] = this;
        }
      });

    });
    return map;
  };

  function scanHeaders(tableMap, x, y, deltaX, deltaY) {
    var headerList = $();
    var cell = $(tableMap[y][x]);
    var opaqueHeaders = [];
    var inHeaderBlock;
    var headersFromCurrBlock;

    if (cell.is('th')) {
      headersFromCurrBlock = [{
        cell: cell,
        x: x, y: y
      }];

      inHeaderBlock = true;
    } else {
      inHeaderBlock = false;
      headersFromCurrBlock = [];
    }

    for (; x >= 0 && y >= 0; x += deltaX, y += deltaY) {
      var currCell = $(tableMap[y][x]);
      var scope = currCell.attr('scope') || 'auto';

      if (currCell.is('th')) {
        inHeaderBlock = true;
        headersFromCurrBlock.push({
          cell: currCell,
          x: x, y: y
        });
        var blocked = false;
        if (deltaX === 0) {
          if (scope === 'col') {
            blocked = true; 
          } else {
            $.each(opaqueHeaders, function (i, opaqueHeader) {
              var currWidth = +currCell.attr('colspan') || 1;
              var opaqueWidth = +$(opaqueHeader.cell).attr('colspan') || 1;
              if (opaqueHeader.x === x && currWidth === opaqueWidth) {
                blocked = true;
              }
            });
          }
        } else if (deltaY === 0) {
          //If there are any cells in the opaque headers list anchored with the same y-coordinate as the current cell, and with the same height as current cell, then let blocked be true.
          if (scope === 'row') {
            blocked = true; 
          } else {
            $.each(opaqueHeaders, function (i, opaqueHeader) {
              var currHeight = +currCell.attr('rowspan') || 1;
              var opaqueHeight = +$(opaqueHeader.cell).attr('rowspan') || 1;
              if (opaqueHeader.y === y && currHeight === opaqueHeight) {
                blocked = true;
              }
            });
          }
        }
        if (blocked === false) {
          headerList.add(currCell);
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
      headerCells.add('th#' + id + ', td#' + id, table);
    });
    return headerCells;
  }


  function getHeadersFromScope(cell) {
    var i, x, y;
    var table = cell.closest('table');
    var tableMap = table.getTableMap();
    var headerCells = $();
    
    // Grab the width and height, undefined, invalid or 0 become 1
    var height = +cell.attr('rowspan') || 1;
    var width = +cell.attr('colspan') || 1;

    i = 0;
    y = 0;
    // Locate the x and y coordinates of the current cell
    while (x === undefined) {
      if (tableMap[y][i] === cell[0]) {
        x = i;

      } else if (i + 1 === tableMap[y].length) {
        y += 1;
        i = 0;
      } else {
        i += 1;
      }
    }

    for (i = 0; i < width; i++) {
      scanHeaders(tableMap, x - i, y, 0, -1, headerCells);
    }

    for (i = 0; i < height; i++) {
      scanHeaders(tableMap, x, y - i, -1, 0, headerCells);
    }

  }


	$.fn.tableHeaders = function () {
  	var headers = $();
  	this.each(function () {
  		var $this = $(this);

  		if ($this.is(':not(td, th)')) {
  			return;
  		}

  		if ($this.is('[headers]')) {
  			headers.add(getHeadersFromAttr($this));

  		} else {
        headers.add(getHeadersFromScope($this));
  		}
  	});
    return headers.not(':empty');
  };


}(jQuery));