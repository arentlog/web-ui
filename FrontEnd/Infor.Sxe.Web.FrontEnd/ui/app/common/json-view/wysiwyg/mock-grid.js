'use strict';

/**
 * Directive for grids in the wysiwyg in order to have resizable columns using the mouse.
 *
 * Important! - Most of this code is taken from Soho's grid column resize code, so can look there if any issues arise.
 */
app.directive('mockGrid', function mockGrid($timeout) {

   return {
      restrict: 'A',
      scope: true,
      controller: function ($scope) {
         var self = this;

         // Initialize the ctrl to act like the Soho grid control api
         self.initialize = function (element) {
            self.element = element;
            self.headerContainer = element.find('.datagrid-header');
            self.headerRow = element.find('thead:first');
            self.headerTable = element.find('.datagrid-header table');
            self.table = element.find('.datagrid-body table');
            self.settings = {};

            var tableWidth = self.headerTable[0].offsetWidth;
            var lastHeader = self.headerTable.find('th:last')[0];

            // Need to make the last column stretch to the end of the grid like Soho does it (unless the column has a
            // specified width), otherwise pixel widths on columns are not accurate
            if (tableWidth && lastHeader) {
               var widthExceptLast = 0;
               var lastHasWidth = !!lastHeader.style.width;

               // Calculate table width minus last column
               self.headerTable.find('th:not(:last)').each(function () {
                  var colWidth = this.style.width;

                  // Use width on the column if exists, otherwise use default from wysiwyg style.css
                  colWidth = colWidth ? parseInt(colWidth) : 150;

                  widthExceptLast += colWidth;
               });

               // Stretch last column to end of grid if needed
               if (!lastHasWidth && tableWidth > widthExceptLast) {
                  var lastColStretchWidth = tableWidth - widthExceptLast;
                  self.headerTable.find('th:last').css('width', lastColStretchWidth);
                  self.table.find('td:last').css('width', lastColStretchWidth);
               } else if (lastHasWidth) {
                  // When last column has a specified width, then shrink table width as needed (otherwise pixel widths on columns are not accurate)
                  var lastWidth = parseInt(lastHeader.style.width);
                  var totalColumnWidth = widthExceptLast + lastWidth;
                  self.headerTable.css('width', totalColumnWidth);
                  self.table.css('width', totalColumnWidth);
               }
            }

            // Activate drag handle display upon mouse event
            self.headerRow.off('mousemove.datagrid').on('mousemove.datagrid', 'th', self.checkResizeHandle);
         };

         // Move the drag handle to the end or start of the column
         self.checkResizeHandle = function (e) {
            if (self.dragging) {
               return;
            }

            self.currentHeader = $(e.target).closest('th');

            if (!self.currentHeader.hasClass('is-resizable')) {
               return;
            }

            var headerDetail = self.currentHeader.closest('.header-detail'),
               extraMargin = headerDetail.length ? parseInt(headerDetail.css('margin-left'), 10) : 0,
               leftEdge = parseInt(self.currentHeader.position().left) - (extraMargin || 0) + self.element.scrollLeft(),
               rightEdge = leftEdge + self.currentHeader.outerWidth(),
               alignToLeft = (e.pageX - leftEdge > rightEdge - e.pageX),
               leftPos;

            leftPos = (alignToLeft ? (rightEdge - 6): (leftEdge - 6));

            //Ignore First Column
            if (self.currentHeader.index() === 0 && !alignToLeft) {
               leftPos = '-999';
            }

            if (!alignToLeft) {
               self.currentHeader = self.currentHeader.prev();
            }

            if (!self.currentHeader.hasClass('is-resizable')) {
               return;
            }

            self.createResizeHandle();
            self.resizeHandle[0].style.left = leftPos +'px';
            self.resizeHandle[0].style.cursor = '';
         };

         self.createResizeHandle = function () {
            if (self.resizeHandle) {
               return;
            }

            self.resizeHandle = $('<div class="resize-handle" aria-hidden="true"></div>');
            if (self.settings.columnGroups) {
               self.resizeHandle[0].style.height = '80px';
            }

            if (self.settings.filterable) {
               self.resizeHandle[0].style.height = '62px';
            }

            self.headerContainer.find('table').before(self.resizeHandle);

            var columnId, startingLeft, columnStartWidth, columnDef;

            self.resizeHandle.drag({axis: 'x', containment: 'parent'})
               .on('dragstart.datagrid', function () {
                  if (!self.currentHeader) {
                     return;
                  }

                  self.dragging = true;

                  columnId = self.currentHeader.attr('data-column-id');
                  columnDef = {};

                  startingLeft = self.currentHeader.position().left + self.table.scrollLeft() - 10;
                  self.tableWidth = self.table[0].offsetWidth;
                  columnStartWidth = self.currentHeader[0].offsetWidth;
               })
               .on('drag.datagrid', function (e, ui) {
                  if (!self.currentHeader) {
                     return;
                  }

                  var width = (ui.left - startingLeft - 1),
                     minWidth = columnDef.minWidth || 12,
                     maxWidth = columnDef.maxWidth || 1000;

                  if (width < minWidth || width > maxWidth) {
                     self.resizeHandle.css('cursor', 'inherit');
                     return;
                  }

                  width = Math.round(width);
                  self.setColumnWidth(self.currentHeader, width, width - columnStartWidth);
               })
               .on('dragend.datagrid', function () {
                  self.dragging = false;

                  // Get width from column's style
                  var width = self.currentHeader[0].style.width;
                  if (width) {
                     width = parseInt(width);
                  }

                  // Apply width to the json control
                  var controlId = self.currentHeader.attr('data-control-id');
                  if (controlId && width) {
                     controlId = parseInt(controlId); // must convert string attr to number

                     // The personalize ctrl was written with ctrl aliases, but the wysiwyg ctrl was not
                     if ($scope.base) {
                        $scope.base.resizeGridColumn(controlId, width);
                     } else {
                        $scope.resizeGridColumn(controlId, width);
                     }
                  }
               });
         };

         self.setColumnWidth = function(idOrNode, width, diff) {
            var percent = parseFloat(width),
               columnNode = idOrNode,
               columnSettings = [{}];

            if (!percent) {
               return;
            }

            if (typeof idOrNode === 'string') {
               self.headerNodes().not('.is-hidden').each(function () {
                  var col = $(this);

                  if (col.attr('data-column-id') === idOrNode) {
                     columnNode = col;
                  }

               });
            }

            //Handles min width on some browsers
            if ((columnSettings.minWidth && width > parseInt(columnSettings.minWidth))) {
               return;
            }

            //calculate percentage
            if (typeof width !=='number') {
               width = percent / 100 * self.element.width();
            }

            var idx = columnNode.index();
            self.headerRow.find('th').eq(idx)[0].style.width = (width + 'px');

            self.table.find('td').eq(idx)[0].style.width = (width + 'px');

            if (self.tableWidth && diff) {
               self.headerTable.css('width', parseInt(self.tableWidth) + diff);
               self.table.css('width', parseInt(self.tableWidth) + diff);
            }
         };
      },
      link: function (scope, element, attrs, ctrl) {
         // Initialize the mock grid functionality
         // Note: We delay this until next Angular digest because the screen needs to be fully rendered in order to
         //       calculate the grid table width properly.
         $timeout(function () {
            ctrl.initialize(element);
         });
      }
   };

});