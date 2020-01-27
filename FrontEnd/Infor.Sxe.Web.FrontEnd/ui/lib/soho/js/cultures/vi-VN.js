(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module
    define('cultures/vi-VN', ['jquery'], factory);
    factory();
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function () {

  if (!Locale) {
    return;
  }

  //Get Latest from http://www.unicode.org/Public/cldr/25/
  Locale.addCulture('vi-VN', {
    //layout/language
    language: 'vi',
    englishName: 'Vietnamese (Vietnam)',
    nativeName: 'Tiếng Việt (Việt Nam)',
    //layout/orientation/@characters
    direction: 'left-to-right',
    //ca-gregorian
    calendars: [{
      //ca-gregorian/main/dates/calendars/gregorian/dateFormats/
      dateFormat: {'separator': '/', //Infered
                   'timeSeparator': ':',
                   'short': 'dd/MM/yyyy', //use four digit year
                   'medium': 'dd-MM-yyyy',
                   'long': 'ngày dd tháng MM năm yyyy',
                   'full': 'EEEE, ngày dd MMMM năm yyyy',
                   'month': 'dd MMMM',
                   'year': 'MMMM yyyy',
                   'timestamp': 'HH:mm:ss',
                   'datetime': 'dd/MM/yyyy HH:mm'}, //Infered short + short gregorian/dateTimeFormats
      //ca-gregorian/main/dates/calendars/gregorian/days/format/short or abbreviated (2 digit)
      days: {
          wide: ['Chủ Nhật','Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy'],
          abbreviated: ['CN','Hai','Ba','Tư','Năm','Sáu','Bảy'],
          narrow: ['C', 'H', 'B', 'T', 'N', 'S', 'B']
      },
      //ca-gregorian/main/dates/calendars/gregorian/months/format/wide
      months: {
        wide: ['Tháng Giêng','Tháng Hai','Tháng Ba','Tháng Tư','Tháng Năm','Tháng Sáu','Tháng Bảy','Tháng Tám','Tháng Chín','Tháng Mười','Tháng Mười Một','Tháng Mười Hai'],
        abbreviated: ['Thg1','Thg2','Thg3','Thg4','Thg5','Thg6','Thg7','Thg8','Thg9','Thg10','Thg11','Thg12']
      },
      //ca-gregorian/main/dates/calendars/gregorian/timeFormats/short
      timeFormat: 'HH:mm',
      //ca-gregorian/main/dates/calendars/gregorian/dayPeriods/wide
      dayPeriods: ['SA', 'CH']
    }],
    //numbers/currencyFormats-numberSystem-latn/standard (Replace Sign http://www.currencysymbols.in ?)
    currencySign: '₫', //(Replace Sign http://www.currencysymbols.in ?)
    currencyFormat: '#,##0.00 ¤',
    //numbers/symbols-numberSystem-latn
    numbers: {
      percentSign: '%',
      percentFormat: '#,##0 %',
      minusSign: '-',
      decimal: ',',
      group: '.'
    },
    //Resx - Approved By Translation Team
    messages: {
      'AboutText': {id: 'AboutText', value: 'Bản quyền &copy; {0} Infor. Bảo lưu mọi quyền. Từ ngữ và các nhãn hiệu thiết kế trong đây là các thương hiệu và/hoặc thương hiệu đã được đăng ký của Infor và/hoặc các chi nhánh và công ty con của Infor. Bảo lưu mọi quyền. Tất cả thương hiệu khác được liệt kê ở đây là tài sản của chủ sở hữu tương ứng'},
      'Actions': {id: 'Actions', value: 'Hành động', comment: 'Tooltip text for the action button with additional in context actions'},
      'Add': {id: 'Add', value: 'Thêm', comment: 'Add'},
      'AddNewTab': {id: 'AddNewTab', value: 'Thêm tab mới', comment: 'Attached to a button that adds new tabs'},
      'AdvancedFilter': {id: 'AdvancedFilter', value: 'Tạo bộ lọc nâng cao', comment: 'In a data grid active an advanced filtering feature'},
      'Alert': {id: 'Alert', value: 'Cảnh báo', comment: 'Alert'},
      'AllResults': {id: 'AllResults', value: 'Tất cả kết quả cho', comment: 'Search Results Text'},
      'AligntoBottom': {id: 'AligntoBottom', value: 'Căn dưới', comment: 'Align to Bottom tooltip'},
      'AlignCenterHorizontally': {id: 'AlignCenterHorizontally', value: 'Căn giữa theo chiều ngang', comment: 'Align Center Horizontally tooltip'},
      'Amber': {id: 'Amber', value: 'Hổ phách', comment: 'Color in our color pallette'},
      'Amethyst': {id: 'Amethyst', value: 'Thạch anh tím', comment: 'Color in our color pallette'},
      'Apply': {id: 'Apply', value: 'Áp dụng', comment: 'Text in a button to apply an action'},
      'Attach': {id: 'Attach', value: 'Đính kèm', comment: 'Attach'},
      'Azure': {id: 'Azure', value: 'Xanh da trời', comment: 'Color in our color pallette'},
      'Between': {id: 'Between', value: 'Giữa', comment: 'Between in icons for filtering'},
      'Blockquote': {id: 'Blockquote', value: 'Thẻ trích dẫn khối', comment: 'insert a block quote in the editor'},
      'Bold': {id: 'Bold', value: 'Đậm', comment: 'Make text Bold'},
      'Bookmarked': {id: 'Bookmarked', value: 'Đã đánh dấu', comment: 'Bookmark filled - Element is already bookmarked'},
      'BookmarkThis': {id: 'BookmarkThis', value: 'Đánh dấu', comment: 'Bookmark an element'},
      'Breadcrumb': {id: 'Breadcrumb', value: 'Đường điều hướng', comment: 'Text describing the Breadcrumb'},
      'BulletedList': {id: 'BulletedList', value: 'Danh sách có dấu đầu dòng', comment: 'Bulleted List tooltip'},
      'Calendar': {id: 'Calendar', value: 'Lịch', comment: 'Inline Text for the title of the Calendar control'},
      'Camera': {id: 'Camera', value: 'Máy ảnh', comment: 'Camera tooltip'},
      'Cancel': {id: 'Cancel', value: 'Hủy', comment: 'Cancel tooltip'},
      'CapsLockOn': {id: 'CapsLockOn', value: 'Caps Lock đang bật', comment: 'Caps Lock On message'},
      'Cart': {id: 'Cart', value: 'Giỏ hàng', comment: 'Cart tooltip'},
      'CenterText': {id: 'CenterText', value: 'Trung tâm', comment: 'An Icon Tooltip'},
      'CharactersLeft': {id: 'CharactersLeft', value: 'Số ký tự bên trái {0}', comment: 'indicator showing how many more characters you can type.'},
      'CharactersMax': {id: 'CharactersMax', value: 'Số ký tự tối đa của ', comment: 'indicator showing how many max characters you can type.'},
      'ChangeSelection': {id: 'ChangeSelection', value: '. Để thay đổi lựa chọn, hãy sử dụng các phím mũi tên.', comment: 'Audible Text for drop down list help'},
      'Checkbox': {id: 'Checkbox', value: 'Hộp kiểm', comment: 'Checkbox tooltip'},
      'Checked': {id: 'Checked', value: 'Đã chọn', comment: 'Checked tooltip'},
      'Clear': {id: 'Clear', value: 'Xóa', comment: 'Tooltip for a Clear Action'},
      'ClearFilter': {id: 'ClearFilter', value: 'Xóa bộ lọc', comment: 'Clear the current filter criteria'},
      'Clock': {id: 'Clock', value: 'Đồng hồ', comment: 'Clock tooltip'},
      'Close': {id: 'Close', value: 'Đóng', comment: 'Tooltip for a Close Button Action'},
      'Copy': {id: 'Copy', value: 'Sao chép', comment: 'Copy tooltip'},
      'Collapse': {id: 'Collapse', value: 'Thu gọn', comment: 'Collapse / close a tree/submenu'},
      'CollapseAppTray': {id: 'CollapseAppTray', value: 'Thu gọn khay ứng dụng', comment: 'Collapse App Tray tooltip'},
      'Columns': {id: 'Columns', value: 'Cột', comment: 'Columns tooltip'},
      'Component': {id: 'Component', value: 'Thành phần', comment: 'As in a UI component - building block.'},
      'Compose': {id: 'Compose', value: 'Soạn thảo', comment: 'Compose tooltip'},
      'Completed': {id: 'Completed', value: 'Đã hoàn tất', comment: 'Text For a Completed Status'},
      'Confirm': {id: 'Confirm', value: 'Xác nhận', comment: 'Confirm tooltip'},
      'Contains': {id: 'Contains', value: 'Có chứa', comment: 'Contains in icons for filtering'},
      'Cut': {id: 'Cut', value: 'Cắt', comment: 'Cut tooltip'},
      'Date': {id: 'Date', value: 'Ngày', comment: 'Describes filtering by a date data type'},
      'Delete': {id: 'Delete', value: 'Xóa', comment: 'Delete Toolbar Action Tooltip'},
      'DistributeHoriz': {id: 'DistributeHoriz', value: 'Phân bổ theo chiều ngang', comment: 'Icon button tooltip for action that distributes elements across Horizontally'},
      'Document': {id: 'Document', value: 'Tài liệu', comment: 'Document tooltip'},
      'Dirty': {id: 'Dirty', value: 'Hàng đã thay đổi', comment: 'Record is dirty / modified'},
      'Drilldown': {id: 'Drilldown', value: 'Mở rộng', comment: 'Drill by moving page flow into a record'},
      'Drillup': {id: 'Drillup', value: 'Thu nhỏ', comment: 'Opposite of Drilldown, move back up to a larger set of records'},
      'Dropdown': {id: 'Dropdown', value: 'Thả xuống', comment: 'Dropdown'},
      'DoesNotContain': {id: 'DoesNotContain', value: 'Không chứa', comment: 'Does Not Contain in icons for filtering'},
      'DoesNotEndWith': {id: 'DoesNotEndWith', value: 'Không kết thúc bằng', comment: 'For condition filtering'},
      'DoesNotEqual': {id: 'DoesNotEqual', value: 'Không bằng', comment: 'Does Not Equal in icons for filtering'},
      'DoesNotStartWith': {id: 'DoesNotStartWith', value: 'Không bắt đầu với', comment: 'For condition filtering'},
      'Down': {id: 'Down', value: 'Xuống', comment: 'Down tooltip'},
      'Download': {id: 'Download', value: 'Tải xuống', comment: 'Download tooltip'},
      'Duplicate': {id: 'Duplicate', value: 'Trùng lặp', comment: 'Duplicate tooltip'},
      'EitherSelectedOrNotSelected': {id: 'EitherSelectedOrNotSelected', value: 'Hoặc được chọn hoặc không được chọn', comment: 'Either Selected Or NotSelected in icons for filtering'},
      'EndsWith': {id: 'EndsWith', value: 'Kết thúc bằng', comment: 'for condition filtering'},
      'EnterComments': {id: 'EnterComments', value: 'Nhập bình luận tại đây...', comment: 'Placeholder text for a text input (comments)'},
      'Error': {id: 'Error', value: 'Lỗi', comment: 'Title, Spoken Text describing fact an error has occured'},
      'ErrorAllowedTypes': {id: 'ErrorAllowedTypes', value: 'Loại tệp không được phép', comment: 'Error string for file-upload'},
      'ErrorMaxFileSize': {id: 'ErrorMaxFileSize', value: 'Đã vượt giới hạn kích cỡ tệp', comment: 'Error string for file-upload'},
      'ErrorMaxFilesInProcess': {id: 'ErrorMaxFilesInProcess', value: 'Đã vượt giới hạn số tệp tối đa được phép', comment: 'Error string for file-upload'},
      'EmailValidation': {id: 'EmailValidation', value: 'Địa chỉ email không hợp lệ', comment: 'This the rule for email validation'},
      'Emerald': {id: 'Emerald', value: 'Ngọc lục bảo', comment: 'Color in our color pallette'},
      'Expand': {id: 'Expand', value: 'Mở rộng', comment: 'Expand open a tree/submenu'},
      'ExpandAppTray': {id: 'ExpandAppTray', value: 'Mở rộng khay ứng dụng', comment: 'ExpandAppTray tooltip'},
      'ExpandCollapse': {id: 'ExpandCollapse', value: 'Mở rộng / Thu gọn', comment: 'Text to toggle a button in a container.'},
      'ExportAsSpreadsheet': {id: 'ExportAsSpreadsheet', value: 'Xuất dưới dạng bảng tính', comment: 'Export as Spreadsheet tooltip'},
      'Edit': {id: 'Edit', value: 'Sửa', comment: 'Edit tooltip'},
      'Equals': {id: 'Equals', value: 'Bằng', comment: 'Equals in icons for filtering'},
      'ExitFullView': {id: 'ExitFullView', value: 'Thoát chế độ xem toàn bộ', comment: 'Exit Full View tooltip'},
      'Export': {id: 'Export', value: 'Xuất', comment: 'Export tooltip'},
      'ExportToExcel': {id: 'ExportToExcel', value: 'Xuất sang Excel', comment: 'Export To Excel menu option in datagrid'},
      'Favorite': {id: 'Favorite', value: 'Mục yêu thích', comment: 'A favorite item'},
      'FileUpload': {id: 'FileUpload', value: 'Tải lên tệp. Nhấn Enter để duyệt tệp', comment: 'Screen Reader instructions'},
      'Filter': {id: 'Filter', value: 'Bộ lọc', comment: 'Filter tooltip'},
      'FirstPage': {id: 'FirstPage', value: 'Trang đầu tiên', comment: 'First Page tooltip'},
      'Folder': {id: 'Folder', value: 'Thư mục', comment: 'Folder tooltip'},
      'FullView': {id: 'FullView', value: 'Chế độ xem toàn bộ', comment: 'Full View tooltip'},
      'GoForward': {id: 'GoForward', value: 'Tiến', comment: 'Move Page / object this direction'},
      'GoBack': {id: 'GoBack', value: 'Lùi', comment: 'Move Page / object this directionp'},
      'GoDown': {id: 'GoDown', value: 'Xuống', comment: 'Move Page / object this directionp'},
      'GoUp': {id: 'GoUp', value: 'Lên', comment: 'Move Page / object this direction'},
      'Graphite': {id: 'Graphite', value: 'Than chì', comment: 'Color in our color pallette'},
      'GreaterOrEquals': {id: 'GreaterOrEquals', value: 'Lớn hơn hoặc bằng', comment: 'Greater Than Or Equals in icons for filtering'},
      'GreaterThan': {id: 'GreaterThan', value: 'Lớn hơn', comment: 'Greater Than in icons for filtering'},
      'Grid': {id: 'Grid', value: 'Lưới', comment: 'Grid tooltip'},
      'Hours': {id: 'Hours', value: 'Giờ', comment: 'the hour portion of a time'},
      'HeadingThree': {id: 'HeadingThree', value: 'Tiêu đề ba', comment: 'Heading Three tooltip'},
      'HeadingFour': {id: 'HeadingFour', value: 'Tiêu đề bốn', comment: 'Heading Four tooltip'},
      'Highest': {id: 'Highest', value: 'Cao nhất', comment: 'Highest Four tooltip'},
      'Home': {id: 'Home', value: 'Trang chủ', comment: 'Home tooltip'},
      'HtmlView': {id: 'HtmlView', value: 'Chế độ xem Html', comment: 'Html View tooltip'},
      'Image': {id: 'Image', value: 'Hình ảnh', comment: 'Image of something'},
      'Import': {id: 'Import', value: 'Nhập', comment: 'Import tooltip'},
      'Info': {id: 'Info', value: 'Thông tin', comment: 'Info tooltip'},
      'InProgress': {id: 'In Progress', value: 'Đang tiến hành', comment: 'Info tooltip that an action is in progress'},
      'InsertAnchor': {id: 'InsertAnchor', value: 'Chèn ký tự liên kết', comment: 'Insert Acnhor (link) in an editor'},
      'InsertImage': {id: 'InsertImage', value: 'Chèn hình ảnh', comment: 'Insert Image in an editor'},
      'Italic': {id: 'Italic', value: 'Nghiêng', comment: 'Make Text Italic'},
      'InvalidDate': {id: 'InvalidDate', value: 'Ngày không hợp lệ', comment: 'validation message for wrong date format (short)'},
      'InvalidTime': {id: 'InvalidTime', value: 'Thời gian không hợp lệ', comment: 'validation message for wrong time format'},
      'Inventory': {id: 'Inventory', value: 'Kiểm kê', comment: 'Icon button tooltop for Inventory Action'},
      'IsEmpty': {id: 'IsEmpty', value: 'Đang trống', comment: 'Is Empty in icons for filtering'},
      'IsNotEmpty': {id: 'IsNotEmpty', value: 'Không trống', comment: 'Is Not Empty in icons for filtering'},
      'ItemsSelected': {id: 'ItemsSelected', value: 'Mục đã chọn', comment: 'Num of Items selected for swaplist'},
      'JustifyCenter': {id: 'JustifyCenter', value: 'Trung tâm', comment: 'justify text to center in the editor'},
      'JustifyLeft': {id: 'JustifyLeft', value: 'Căn trái', comment: 'justify text to left in the editor'},
      'JustifyRight': {id: 'JustifyRight', value: 'Căn phải', comment: 'justify text to right in the editor'},
      'Keyword': {id: 'Keyword', value: 'Từ khóa', comment: 'Describes filtering by a keyword search'},
      'Launch': {id: 'Launch', value: 'Khởi chạy', comment: 'Launch'},
      'LastPage': {id: 'LastPage', value: 'Trang cuối cùng', comment: 'Last Page tooltip'},
      'Left': {id: 'Left', value: 'Trái', comment: 'Left tooltip'},
      'LessOrEquals': {id: 'LessOrEquals', value: 'Ít hơn hoặc bằng', comment: 'Less Than Or Equals in icons for filtering'},
      'LessThan': {id: 'LessThan', value: 'Nhỏ hơn', comment: 'Less Than in icons for filtering'},
      'Link': {id: 'Link', value: 'Liên kết', comment: 'Link - as in hyperlink - icon tooltop'},
      'Load': {id: 'Load', value: 'Tải', comment: 'Load icon tooltip'},
      'Loading': {id: 'Loading', value: 'Đang tải', comment: 'Text below spinning indicator to indicate loading'},
      'Locked': {id: 'Locked', value: 'Đã khóa', comment: 'Locked tooltip'},
      'Logout': {id: 'Logout', value: 'Đăng xuất', comment: 'Log out of the application'},
      'Lookup': {id: 'Lookup', value: 'Tra cứu', comment: 'Lookup - As in looking up a record or value'},
      'Lowest': {id: 'Lowest', value: 'Thấp nhất', comment: 'Lowest - As in Lowest value'},
      'Mail': {id: 'Mail', value: 'Thư', comment: 'Mail tooltip'},
      'MapPin': {id: 'MapPin', value: 'Ghim', comment: 'Map Pin tooltip'},
      'Maximize': {id: 'Maximize', value: 'Phóng to', comment: 'Maximize a screen or dialog in the UI'},
      'Median': {id: 'Median', value: 'Trung vị', comment: 'Median in Mathematics'},
      'Medium': {id: 'Medium', value: 'Trung bình', comment: 'Describes a Medium sized Row Height in a grid/list'},
      'Menu': {id: 'Menu', value: 'Menu', comment: 'Menu tooltip'},
      'MingleShare': {id: 'MingleShare', value: 'Chia sẻ với Ming.le', comment: 'Share the contextual object/action in the mingle system'},
      'Minutes': {id: 'Minutes', value: 'Phút', comment: 'the minutes portion of a time'},
      'Minimize': {id: 'Minimize', value: 'Thu nhỏ', comment: 'Minimize tooltip'},
      'Minus': {id: 'Minus', value: 'Trừ', comment: 'Minus tooltip'},
      'Mobile': {id: 'Mobile', value: 'Di động', comment: 'Indicates a mobile device (phone tablet ect)'},
      'More': {id: 'More', value: 'Khác...', comment: 'Text Indicating More Buttons or form content'},
      'MoreActions': {id: 'MoreActions', value: 'Hành động khác', comment: 'Text on the More Actions button indictating hidden functions'},
      'MsgDirty': {id: 'MsgDirty', value: ', Đã sửa đổi', comment: 'for modified form fields'},
      'NewDocument': {id: 'NewDocument', value: 'Tài liệu mới', comment: 'New Document tooltip'},
      'Next': {id: 'Next', value: 'Tiếp theo', comment: 'Next in icons tooltip'},
      'NextPage': {id: 'NextPage', value: 'Trang tiếp theo', comment: 'Next on Pager'},
      'NextMonth': {id: 'NextMonth', value: 'Tháng sau', comment: 'the label for the button that moves calendar to next/prev'},
      'No': {id: 'No', value: 'Không', comment: 'On a dialog button'},
      'NoResults': {id: 'NoResults', value: 'Không có kết quả', comment: 'Search Results Text'},
      'Normal': {id: 'Normal', value: 'Bình thường', comment: 'Normal row height'},
      'Notes': {id: 'Notes', value: 'Ghi chú', comment: 'Notes icon tooltip'},
      'NotSelected': {id: 'NotSelected', value: 'Không được chọn', comment: 'Not Selected in icons for filtering'},
      'NumberList': {id: 'NumberList', value: 'Danh sách được đánh số', comment: 'Number List tooltip'},
      'OpenBackClose': {id: 'OpenBackClose', value: 'Mở / Quay lại / Đóng', comment: 'Open / Back / Close tooltip'},
      'OpenClose': {id: 'OpenClose', value: 'Mở / Đóng', comment: 'Open / Close tooltip'},
      'OrderedList': {id: 'OrderedList', value: 'Chèn/Xoa danh sách được đánh số', comment: 'Insert an Ordered list in the editor'},
      'Page': {id: 'Page', value: 'trang ', comment: 'Text on the pager links'},
      'PageOf': {id: 'PageOf', value: 'Trang {0} / {1}', comment: 'Pager Text Showing current and number of pages'},
      'PageOn': {id: 'PageOn', value: 'Bạn hiện đang trên trang ', comment: 'Text on the pager links'},
      'Paste': {id: 'Paste', value: 'Dán', comment: 'Paste icon tooltip'},
      'PasswordValidation': {id: 'PasswordValidation', value: '<strong>Mật khẩu phải</strong><br>Dài ít nhất 10 ký tự<br>Có ít nhất một ký tự viết hoa<br>Có ít nhất một ký tự viết thường<br>Chứa một ký tự đặc biệt<br>Không chứa tên người dùng của bạn<br>Không thể là mật khẩu đã sử dụng trước đó<br>', comment: 'Password validation requirements'},
      'PasswordConfirmValidation': {id: 'PasswordConfirmValidation', value: 'Mật khẩu phải khớp', comment: 'Password Confirm validation'},
      'Peak': {id: 'Peak', value: 'Cao nhất', comment: 'the max or peak value in a chart'},
      'PersonalizeColumns': {id: 'PersonalizeColumns', value: 'Cá nhân hóa cột', comment: 'Customize Columns in a Grid'},
      'Period': {id: 'Period', value: 'Kỳ', comment: 'the am/pm portion of a time'},
      'PressDown': {id: 'PressDown', value: 'Nhấn mũi tên xuống để chọn một ngày', comment: 'the audible label for Tooltip about how to operate the date picker'},
      'PressShiftF10': {id: 'PressShiftF10', value: 'Nhấn Shift+F10 để mở menu ngữ cảnh.', comment: 'the audible infor for screen readers on how to use a field with a popup menu'},
      'Previous': {id: 'Previous', value: 'Trước', comment: 'Previous icon tooltip - moved to previous record'},
      'PreviousMonth': {id: 'PreviousMonth', value: 'Tháng trước', comment: 'the label for the button that moves calendar to next/prev'},
      'PreviousPage': {id: 'PreviousPage', value: 'Trang trước', comment: 'Previous Page tooltip'},
      'Print': {id: 'Print', value: 'In', comment: 'Print tooltip'},
      'Range': {id: 'Range', value: 'Phạm vi', comment: 'Range for tooltip'},
      'RecordsPerPage': {id: 'RecordsPerPage', value: '{0} Bản ghi mỗi trang', comment: 'Dropd own allows the user to select how many visible records {} shows select value.'},
      'Redo': {id: 'Redo', value: 'Làm lại', comment: 'Redo tooltip'},
      'Refresh': {id: 'Refresh', value: 'Làm mới', comment: 'Refresh tooltip'},
      'Required': {id: 'Required', value: 'Bắt buộc', comment: 'indicates a form field is manditory'},
      'Reset': {id: 'Reset', value: 'Đặt lại', comment: 'Reset tooltip'},
      'Results': {id: 'Results', value: 'Kết quả', comment: 'As in showing N Results in a List'},
      'RightAlign': {id: 'RightAlign', value: 'Căn phải', comment: 'Right Align tooltip'},
      'RightAlignText': {id: 'RightAlignText', value: 'Căn phải', comment: 'Right Align Text tooltip'},
      'Right': {id: 'Right', value: 'Phải', comment: 'Right'},
      'Roles': {id: 'Roles', value: 'Vai trò', comment: 'Roles tooltip'},
      'RowHeight': {id: 'RowHeight', value: 'Chiều cao hàng', comment: 'Describes the Height for Rows in a Data Grid'},
      'Ruby': {id: 'Ruby', value: 'Hồng ngọc', comment: 'Color in our color pallette'},
      'RunFilter': {id: 'RunFilter', value: 'Chạy bộ lọc', comment: 'Execute the current filter criteria'},
      'Save': {id: 'Save', value: 'Lưu', comment: 'Save tooltip'},
      'SaveCurrentView': {id: 'SaveCurrentView', value: 'Lưu dạng xem hiện tại', comment: 'Datagrids contain view sets. This menu option saves them'},
      'SavedViews': {id: 'SavedViews', value: 'Đã lưu dạng xem', comment: 'Label for a list of Views'},
      'Search': {id: 'Search', value: 'Tìm kiếm', comment: 'Search tooltip'},
      'SearchColumnName': {id: 'SearchColumnName', value: 'Tìm kiếm một tên cột', comment: 'Search for a datagrid column by name'},
      'SearchFolder': {id: 'SearchFolder', value: 'Tìm kiếm trong thư mục', comment: 'Search Folder tooltip'},
      'SearchList': {id: 'SearchList', value: 'Tìm kiếm trong danh sách', comment: 'Search List tooltip'},
      'Select': {id: 'Select', value: 'Chọn', comment: 'text describing a select action'},
      'Selected': {id: 'Selected', value: 'Được chọn', comment: 'text describing a selected object'},
      'Send': {id: 'Send', value: 'Gửi', comment: 'Send tooltip'},
      'SetTime': {id: 'SetTime', value: 'Đặt thời gian', comment: 'button text that inserts time when clicked'},
      'Settings': {id: 'Settings', value: 'Thiết đặt', comment: 'Settings tooltip'},
      'Short': {id: 'Short', value: 'Ngắn', comment: 'Describes a Shorted Row Height in a grid/list'},
      'ShowFilterRow': {id: 'ShowFilterRow', value: 'Hiển thị dòng bộ lọc', comment: 'Toggle a row with filer info above a list'},
      'ShowLess': {id: 'ShowLess', value: 'Hiển thị ít hơn', comment: 'Show less form content'},
      'ShowMore': {id: 'ShowMore', value: 'Hiển thị thêm', comment: 'Show more form content'},
      'Slate': {id: 'Slate', value: 'Xám đen', comment: 'Color in our color pallette'},
      'SliderHandle': {id: 'SliderHandle', value: 'Xử lý cho', comment: 'Description of the portion of a Slider control that is focusable and changes its value, followed in code by the name of the control'},
      'SliderMaximumHandle': {id: 'SliderMaximumHandle', value: 'Xử lý phạm vi tối đa cho', comment: 'Describes a maximum value handle in a Range (double slider), followed in code by the name of the control'},
      'SliderMinimumHandle': {id: 'SliderMinimumHandle', value: 'Xử lý phạm vi tối thiểu cho', comment: 'Describes a minimum value handle in a Range (double slider), followed in code by the name of the control'},
      'SkipToMain': {id: 'SkipToMain', value: 'Chuyển đến nội dung chính', comment: 'Skip link in header, jumps when clicked on to main area'},
      'StartsWith': {id: 'StartsWith', value: 'Bắt đầu với', comment: 'for condition filtering'},
      'StrikeThrough': {id: 'StrikeThrough', value: 'Gạch giữa chữ', comment: 'turn on and off strike through text in text editor (like word)'},
      'SortAtoZ': {id: 'SortAtoZ', value: 'Sắp xếp tăng dần', comment: 'Sort A to Z in icons for filtering'},
      'SortZtoA': {id: 'SortZtoA', value: 'Sắp xếp giảm dần', comment: 'Sort Z to A in icons for filtering'},
      'SortDown': {id: 'SortDown', value: 'Sắp xếp xuống', comment: 'Sort Down tooltip'},
      'SortUp': {id: 'SortUp', value: 'Sắp xếp lên', comment: 'Sort Up tooltip'},
      'Subscript': {id: 'Subscript', value: 'Chỉ số dưới', comment: 'Turn on and off Subscript text in text editor (like word)'},
      'Superscript': {id: 'Superscript', value: 'Chỉ số trên', comment: 'Turn on and off Superscript text in text editor (like word)'},
      'Tabs': {id: 'Tabs', value: 'Thẻ...', comment: 'Used in the Tabs Control\'s more menu, preceeded by a number that describes how many tabs are in the spillover menu'},
      'Tack': {id: 'Tack', value: 'Ghim', comment: 'Pin an object'},
      'Tall': {id: 'Tall', value: 'Cao', comment: 'Describes a Taller Row Height in a grid/list'},
      'Timer': {id: 'Timer', value: 'Bộ hẹn giờ', comment: 'Timer tooltip'},
      'Today': {id: 'Today', value: 'Hôm nay', comment: 'refering to today on a calendar'},
      'ToggleBold': {id: 'ToggleBold', value: 'Chuyển sang chữ in đậm', comment: 'turn on and off bold in text editor (like word)'},
      'ToggleH3': {id: 'ToggleH3', value: 'Chuyển sang tiêu đề 3', comment: 'turn on and off heading 3 text'},
      'ToggleH4': {id: 'ToggleH4', value: 'Chuyển sang tiêu đề 4', comment: 'turn on and off heading 4 text'},
      'ToggleItalic': {id: 'ToggleItalic', value: 'Chuyển sang chữ in nghiêng', comment: 'turn on and off Italic in text editor (like word)'},
      'ToggleUnderline': {id: 'ToggleUnderline', value: 'Chuyển sang chữ gạch dưới', comment: 'turn on and off Underline in text editor (like word)'},
      'Toolbar': {id: 'Toolbar', value: 'Thanh công cụ', comment: 'describing the toolbar component'},
      'TopAlign': {id: 'TopAlign', value: 'Căn trên', comment: 'Top Align tooltip'},
      'Total': {id: 'Total', value: 'Tổng cộng', comment: 'Mathematic total of a calculation'},
      'TreeCollapse': {id: 'TreeCollapse', value: 'Thu gọn cây', comment: 'Tree Collapse tooltip'},
      'TreeExpand': {id: 'TreeExpand', value: 'Mở rộng cây', comment: 'Tree Expand tooltip'},
      'Turquoise': {id: 'Turquoise', value: 'Màu ngọc lam', comment: 'Color in our color pallette'},
      'Up': {id: 'Up', value: 'Lên', comment: 'Up tooltip'},
      'Upload': {id: 'Upload', value: 'Tải lên', comment: 'Upload tooltip'},
      'UnavailableDate': {id: 'UnavailableDate', value: 'Ngày không khả dụng', comment: 'Unavailable Date Text'},
      'Underline': {id: 'Underline', value: 'Gạch chân', comment: 'Make text Underlined'},
      'Undo': {id: 'Undo', value: 'Hoàn tác', comment: 'Undo tooltip'},
      'Unlocked': {id: 'Unlocked', value: 'Đã mở khóa', comment: 'Unlocked tooltip'},
      'UnorderedList': {id: 'UnorderedList', value: 'Chèn/Xóa danh sách có dấu đầu dòng', comment: 'Insert an Unordered list in the editor'},
      'Unsupported': {id: 'Unsupported', value: 'Nội dung này không có sẵn do sử dụng các tính năng không được hỗ trợ trong phiên bản trình duyệt hiện tại của bạn.', comment: 'Suggesting browser upgrade for missing features.'},
      'Url': {id: 'Url', value: 'Url', comment: 'Url tooltip'},
      'UseArrow': {id: 'UseArrow', value: '. Sử dụng các phím mũi tên để chọn.', comment: 'Instructional comments for screen readers'},
      'UseEnter': {id: 'UseEnter', value: '. Sử dụng phím enter hoặc mũi tên xuống để tra cứu.', comment: 'Instructional comments for screen readers'},
      'User': {id: 'User', value: 'Người dùng', comment: 'User tooltip'},
      'UserProfile': {id: 'UserProfile', value: 'Hồ sơ người dùng', comment: 'User Profile tooltip'},
      'VerticalMiddleAlign': {id: 'VerticalMiddleAlign', value: 'Căn giữa theo chiều đứng', comment: 'Vertical Align tooltip'},
      'ViewSource': {id: 'ViewSource', value: 'Xem nguồn', comment: 'Toggle the source view in the editor'},
      'ViewVisual': {id: 'ViewVisual', value: 'Xem hình ảnh', comment: 'Toggle the visual view in the editor'},
      'Yes': {id: 'Yes', value: 'Có', comment: 'On a dialog button'}
    }
  });
}));