(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module
    define('cultures/af-ZA', ['jquery'], factory);
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
  Locale.addCulture('af-ZA', {
    //layout/language
    language: 'af',
    englishName: 'Afrikaans (South Africa)',
    nativeName: 'Afrikaans (Suid Afrika)',
    //layout/orientation/@characters
    direction: 'left-to-right',
    //ca-gregorian
    calendars: [{
      name: 'gregorian',
      //ca-gregorian/main/dates/calendars/gregorian/dateFormats/
      dateFormat: {'separator': '-', //Infered
                   'timeSeparator': ':',
                   'short': 'yyyy-MM-dd', //use four digit year
                   'medium': 'dd MMM yyyy',
                   'long': 'dd MMMM yyyy',
                   'full': 'EEEE dd MMMM yyyy',
                   'month': 'dd MMMM',
                   'year': 'MMMM yyyy',
                   'timestamp': 'h:mm:ss a',
                   'datetime': 'yyyy-MM-dd h:mm a'}, //Infered short + short gregorian/dateTimeFormats
      //ca-gregorian/main/dates/calendars/gregorian/days/format/short or abbreviated (2 digit)
      days: {
         wide: ['Sondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrydag', 'Saterdag'],
         abbreviated: ['So', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'sa'],
         narrow: ['S','M','D','W','D','V','S',]
      },
      //ca-gregorian/main/dates/calendars/gregorian/months/format/wide
      months: {
        wide: ['Januarie', 'Februarie', 'Maart', 'April', 'Mei', 'Junie', 'Julie', 'Augustus', 'September', 'Oktober', 'November', 'Desember'],
        abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'Jan', 'Mei', 'Jun', 'Jan', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des']
      },
      //ca-gregorian/main/dates/calendars/gregorian/timeFormats/short
      timeFormat: 'h:mm a',
      //ca-gregorian/main/dates/calendars/gregorian/dayPeriods/wide
      dayPeriods: ['vm.', 'nm.']
    }],
    //numbers/currencyFormats-numberSystem-latn/standard (Replace Sign http://www.currencysymbols.in ?)
    currencySign: 'S', //(Replace Sign http://www.currencysymbols.in ?)
    currencyFormat: '¤#,##0.00',
    //numbers/symbols-numberSystem-latn
    numbers: {
      percentSign: '%',
      percentFormat: '#,##0%',
      minusSign: '-',
      decimal: '٫',
      group: ' '
    },
    //Resx - Approved By Translation Team
    messages: {
      'AboutText': {id: 'AboutText', value: 'Kopiereg &copy; {0} Infor. Alle regte voorbehou. Die woord- en ontwerpmerke wat hierin uiteengesit word, is handelsmerke en/of geregistreerde handelsmerke van Infor en/of sy geaffilieerdes en filiale. Alle regte voorbehou. Alle ander handelsmerke wat hierin gelys word, is die eiendom van hul onderskeie eienaars.'},
      'Actions': {id: 'Actions', value: 'Aksies', comment: 'Tooltip text for the action button with additional in context actions'},
      'Add': {id: 'Add', value: 'Voeg by', comment: 'Add'},
      'AddNewTab': {id: 'AddNewTab', value: 'Voeg Nuwe Vlaggie by', comment: 'Attached to a button that adds new tabs'},
      'AdvancedFilter': {id: 'AdvancedFilter', value: 'Skep Gevorderde Filtreerder', comment: 'In a data grid active an advanced filtering feature'},
      'Alert': {id: 'Alert', value: 'Waarskuwing', comment: 'Alert'},
      'AllResults': {id: 'AllResults', value: 'Alle Resultate Vir', comment: 'Search Results Text'},
      'AligntoBottom': {id: 'AligntoBottom', value: 'Stel Onderkant in lyn', comment: 'Align to Bottom tooltip'},
      'AlignCenterHorizontally': {id: 'AlignCenterHorizontally', value: 'Horisontale Inlynstelling in Middel', comment: 'Align Center Horizontally tooltip'},
      'Amber': {id: 'Amber', value: 'Amber', comment: 'Color in our color pallette'},
      'Amethyst': {id: 'Amethyst', value: 'Ametis', comment: 'Color in our color pallette'},
      'Apply': {id: 'Apply', value: 'Pas toe', comment: 'Text in a button to apply an action'},
      'Attach': {id: 'Attach', value: 'Heg aan', comment: 'Attach'},
      'Azure': {id: 'Azure', value: 'Asuur', comment: 'Color in our color pallette'},
      'Between': {id: 'Between', value: 'Tussen', comment: 'Between in icons for filtering'},
      'Blockquote': {id: 'Blockquote', value: 'Blokaanhaling', comment: 'insert a block quote in the editor'},
      'Bold': {id: 'Bold', value: 'Vetgedruk', comment: 'Make text Bold'},
      'Bookmarked': {id: 'Bookmarked', value: 'Geboekmerk', comment: 'Bookmark filled - Element is already bookmarked'},
      'BookmarkThis': {id: 'BookmarkThis', value: 'Boekmerk dit', comment: 'Bookmark an element'},
      'Breadcrumb': {id: 'Breadcrumb', value: 'Broodkrummel', comment: 'Text describing the Breadcrumb'},
      'BulletedList': {id: 'BulletedList', value: 'Kolpuntlys', comment: 'Bulleted List tooltip'},
      'Calendar': {id: 'Calendar', value: 'Kalender', comment: 'Inline Text for the title of the Calendar control'},
      'Camera': {id: 'Camera', value: 'Kamera', comment: 'Camera tooltip'},
      'Cancel': {id: 'Cancel', value: 'Kanselleer', comment: 'Cancel tooltip'},
      'CapsLockOn': {id: 'CapsLockOn', value: 'Bokasslot is Aan', comment: 'Caps Lock On message'},
      'Cart': {id: 'Cart', value: 'Trollie', comment: 'Cart tooltip'},
      'CenterText': {id: 'CenterText', value: 'Middel', comment: 'An Icon Tooltip'},
      'CharactersLeft': {id: 'CharactersLeft', value: 'Oorblywende karakters {0}', comment: 'indicator showing how many more characters you can type.'},
      'CharactersMax': {id: 'CharactersMax', value: 'Karaktertelling maksimum van ', comment: 'indicator showing how many max characters you can type.'},
      'ChangeSelection': {id: 'ChangeSelection', value: '. Om die keuse te verander, gebruik die pyltjietoetse.', comment: 'Audible Text for drop down list help'},
      'Checkbox': {id: 'Checkbox', value: 'Merkblokkie', comment: 'Checkbox tooltip'},
      'Checked': {id: 'Checked', value: 'Gemerk', comment: 'Checked tooltip'},
      'Clear': {id: 'Clear', value: 'Wis', comment: 'Tooltip for a Clear Action'},
      'ClearFilter': {id: 'ClearFilter', value: 'Wis Filtreerder', comment: 'Clear the current filter criteria'},
      'Clock': {id: 'Clock', value: 'Horlosie', comment: 'Clock tooltip'},
      'Close': {id: 'Close', value: 'Maak Toe', comment: 'Tooltip for a Close Button Action'},
      'Copy': {id: 'Copy', value: 'Kopieer', comment: 'Copy tooltip'},
      'Collapse': {id: 'Collapse', value: 'Vou op', comment: 'Collapse / close a tree/submenu'},
      'CollapseAppTray': {id: 'CollapseAppTray', value: 'Vou Toepassinglaai Op', comment: 'Collapse App Tray tooltip'},
      'Columns': {id: 'Columns', value: 'Kolomme', comment: 'Columns tooltip'},
      'Component': {id: 'Component', value: 'Komponent', comment: 'As in a UI component - building block.'},
      'Compose': {id: 'Compose', value: 'Stel saam', comment: 'Compose tooltip'},
      'Completed': {id: 'Completed', value: 'Voltooid', comment: 'Text For a Completed Status'},
      'Confirm': {id: 'Confirm', value: 'Bevestig', comment: 'Confirm tooltip'},
      'Contains': {id: 'Contains', value: 'Bevat', comment: 'Contains in icons for filtering'},
      'Cut': {id: 'Cut', value: 'Knip', comment: 'Cut tooltip'},
      'Date': {id: 'Date', value: 'Datum', comment: 'Describes filtering by a date data type'},
      'Delete': {id: 'Delete', value: 'Skrap', comment: 'Delete Toolbar Action Tooltip'},
      'DistributeHoriz': {id: 'DistributeHoriz', value: 'Versprei Horisontaal', comment: 'Icon button tooltip for action that distributes elements across Horizontally'},
      'Document': {id: 'Document', value: 'Dokument', comment: 'Document tooltip'},
      'Dirty': {id: 'Dirty', value: 'Ry het verander', comment: 'Record is dirty / modified'},
      'Drilldown': {id: 'Drilldown', value: 'Boor af', comment: 'Drill by moving page flow into a record'},
      'Drillup': {id: 'Drillup', value: 'Boor Op', comment: 'Opposite of Drilldown, move back up to a larger set of records'},
      'Dropdown': {id: 'Dropdown', value: 'Aftrek', comment: 'Dropdown'},
      'DoesNotContain': {id: 'DoesNotContain', value: 'Bevat Nie', comment: 'Does Not Contain in icons for filtering'},
      'DoesNotEndWith': {id: 'DoesNotEndWith', value: 'Eindig Nie Met', comment: 'For condition filtering'},
      'DoesNotEqual': {id: 'DoesNotEqual', value: 'Is Nie Gelyk Aan', comment: 'Does Not Equal in icons for filtering'},
      'DoesNotStartWith': {id: 'DoesNotStartWith', value: 'Begin Nie Met', comment: 'For condition filtering'},
      'Down': {id: 'Down', value: 'Af', comment: 'Down tooltip'},
      'Download': {id: 'Download', value: 'Laai af', comment: 'Download tooltip'},
      'Duplicate': {id: 'Duplicate', value: 'Dupliseer', comment: 'Duplicate tooltip'},
      'EitherSelectedOrNotSelected': {id: 'EitherSelectedOrNotSelected', value: 'Óf Gekies óf Nie Gekies', comment: 'Either Selected Or NotSelected in icons for filtering'},
      'EndsWith': {id: 'EndsWith', value: 'Eindig Met', comment: 'for condition filtering'},
      'EnterComments': {id: 'EnterComments', value: 'Voer kommentare hier in ...', comment: 'Placeholder text for a text input (comments)'},
      'Error': {id: 'Error', value: 'Fout', comment: 'Title, Spoken Text describing fact an error has occured'},
      'ErrorAllowedTypes': {id: 'ErrorAllowedTypes', value: 'Lêertipe word nie toegelaat nie', comment: 'Error string for file-upload'},
      'ErrorMaxFileSize': {id: 'ErrorMaxFileSize', value: 'Lêergrootteperk is oorskry', comment: 'Error string for file-upload'},
      'ErrorMaxFilesInProcess': {id: 'ErrorMaxFilesInProcess', value: 'Toegelate maksimum lêerperk is oorskry', comment: 'Error string for file-upload'},
      'EmailValidation': {id: 'EmailValidation', value: 'E-posadres is nie geldig nie', comment: 'This the rule for email validation'},
      'Emerald': {id: 'Emerald', value: 'Smarag', comment: 'Color in our color pallette'},
      'Expand': {id: 'Expand', value: 'Brei uit', comment: 'Expand open a tree/submenu'},
      'ExpandAppTray': {id: 'ExpandAppTray', value: 'Brei Toepassinglaai Uit', comment: 'ExpandAppTray tooltip'},
      'ExpandCollapse': {id: 'ExpandCollapse', value: 'Brei uit / Vou op', comment: 'Text to toggle a button in a container.'},
      'ExportAsSpreadsheet': {id: 'ExportAsSpreadsheet', value: 'Voer uit as Ontledingstaat', comment: 'Export as Spreadsheet tooltip'},
      'Edit': {id: 'Edit', value: 'Redigeer', comment: 'Edit tooltip'},
      'Equals': {id: 'Equals', value: 'Gelyk aan', comment: 'Equals in icons for filtering'},
      'ExitFullView': {id: 'ExitFullView', value: 'Verlaat Volledige Aansig', comment: 'Exit Full View tooltip'},
      'Export': {id: 'Export', value: 'Voer Uit', comment: 'Export tooltip'},
      'ExportToExcel': {id: 'ExportToExcel', value: 'Voer na Excel uit', comment: 'Export To Excel menu option in datagrid'},
      'Favorite': {id: 'Favorite', value: 'Gunsteling', comment: 'A favorite item'},
      'FileUpload': {id: 'FileUpload', value: 'Lêeroplaai. Druk Doen-toets om rond te blaai vir \'n lêer', comment: 'Screen Reader instructions'},
      'Filter': {id: 'Filter', value: 'Filtreerder', comment: 'Filter tooltip'},
      'FirstPage': {id: 'FirstPage', value: 'Eerste Bladsy', comment: 'First Page tooltip'},
      'Folder': {id: 'Folder', value: 'Lêergids', comment: 'Folder tooltip'},
      'FullView': {id: 'FullView', value: 'Volledige Aansig', comment: 'Full View tooltip'},
      'GoForward': {id: 'GoForward', value: 'Gaan Forentoe', comment: 'Move Page / object this direction'},
      'GoBack': {id: 'GoBack', value: 'Gaan Terug', comment: 'Move Page / object this directionp'},
      'GoDown': {id: 'GoDown', value: 'Gaan Af', comment: 'Move Page / object this directionp'},
      'GoUp': {id: 'GoUp', value: 'Gaan Op', comment: 'Move Page / object this direction'},
      'Graphite': {id: 'Graphite', value: 'Grafiet', comment: 'Color in our color pallette'},
      'GreaterOrEquals': {id: 'GreaterOrEquals', value: 'Groter As Of Gelyk Aan', comment: 'Greater Than Or Equals in icons for filtering'},
      'GreaterThan': {id: 'GreaterThan', value: 'Groter As', comment: 'Greater Than in icons for filtering'},
      'Grid': {id: 'Grid', value: 'Rooster', comment: 'Grid tooltip'},
      'Hours': {id: 'Hours', value: 'Ure', comment: 'the hour portion of a time'},
      'HeadingThree': {id: 'HeadingThree', value: 'Opskrif Drie', comment: 'Heading Three tooltip'},
      'HeadingFour': {id: 'HeadingFour', value: 'Opskrif Vier', comment: 'Heading Four tooltip'},
      'Highest': {id: 'Highest', value: 'Hoogste', comment: 'Highest Four tooltip'},
      'Home': {id: 'Home', value: 'Tuis', comment: 'Home tooltip'},
      'HtmlView': {id: 'HtmlView', value: 'HTML-Aansig', comment: 'Html View tooltip'},
      'Image': {id: 'Image', value: 'Afbeelding', comment: 'Image of something'},
      'Import': {id: 'Import', value: 'Voer In', comment: 'Import tooltip'},
      'Info': {id: 'Info', value: 'Info', comment: 'Info tooltip'},
      'InProgress': {id: 'In Progress', value: 'Tans Aan Die Gang', comment: 'Info tooltip that an action is in progress'},
      'InsertAnchor': {id: 'InsertAnchor', value: 'Voer Anker In', comment: 'Insert Acnhor (link) in an editor'},
      'InsertImage': {id: 'InsertImage', value: 'Voer Afbeelding In', comment: 'Insert Image in an editor'},
      'Italic': {id: 'Italic', value: 'Skuinsdruk', comment: 'Make Text Italic'},
      'InvalidDate': {id: 'InvalidDate', value: 'Ongeldige Datum', comment: 'validation message for wrong date format (short)'},
      'InvalidTime': {id: 'InvalidTime', value: 'Ongeldige Tyd', comment: 'validation message for wrong time format'},
      'Inventory': {id: 'Inventory', value: 'Inventaris', comment: 'Icon button tooltop for Inventory Action'},
      'IsEmpty': {id: 'IsEmpty', value: 'Is Leeg', comment: 'Is Empty in icons for filtering'},
      'IsNotEmpty': {id: 'IsNotEmpty', value: 'Is Nie Leeg Nie', comment: 'Is Not Empty in icons for filtering'},
      'ItemsSelected': {id: 'ItemsSelected', value: 'Items gekies', comment: 'Num of Items selected for swaplist'},
      'JustifyCenter': {id: 'JustifyCenter', value: 'Middel', comment: 'justify text to center in the editor'},
      'JustifyLeft': {id: 'JustifyLeft', value: 'Stel Links In Lyn', comment: 'justify text to left in the editor'},
      'JustifyRight': {id: 'JustifyRight', value: 'Stel Regs In Lyn', comment: 'justify text to right in the editor'},
      'Keyword': {id: 'Keyword', value: 'Sleutelwoord', comment: 'Describes filtering by a keyword search'},
      'Launch': {id: 'Launch', value: 'Begin', comment: 'Launch'},
      'LastPage': {id: 'LastPage', value: 'Laaste Bladsy', comment: 'Last Page tooltip'},
      'Left': {id: 'Left', value: 'Links', comment: 'Left tooltip'},
      'LessOrEquals': {id: 'LessOrEquals', value: 'Minder As Of Gelyk Aan', comment: 'Less Than Or Equals in icons for filtering'},
      'LessThan': {id: 'LessThan', value: 'Minder As', comment: 'Less Than in icons for filtering'},
      'Link': {id: 'Link', value: 'Skakel', comment: 'Link - as in hyperlink - icon tooltop'},
      'Load': {id: 'Load', value: 'Laai', comment: 'Load icon tooltip'},
      'Loading': {id: 'Loading', value: 'Laai tans', comment: 'Text below spinning indicator to indicate loading'},
      'Locked': {id: 'Locked', value: 'Gesluit', comment: 'Locked tooltip'},
      'Logout': {id: 'Logout', value: 'Teken Uit', comment: 'Log out of the application'},
      'Lookup': {id: 'Lookup', value: 'Soek op', comment: 'Lookup - As in looking up a record or value'},
      'Lowest': {id: 'Lowest', value: 'Laagste', comment: 'Lowest - As in Lowest value'},
      'Mail': {id: 'Mail', value: 'Pos', comment: 'Mail tooltip'},
      'MapPin': {id: 'MapPin', value: 'Pen', comment: 'Map Pin tooltip'},
      'Maximize': {id: 'Maximize', value: 'Vergroot', comment: 'Maximize a screen or dialog in the UI'},
      'Median': {id: 'Median', value: 'Mediaan', comment: 'Median in Mathematics'},
      'Medium': {id: 'Medium', value: 'Medium', comment: 'Describes a Medium sized Row Height in a grid/list'},
      'Menu': {id: 'Menu', value: 'Kieslys', comment: 'Menu tooltip'},
      'MingleShare': {id: 'MingleShare', value: 'Deel met Ming.le', comment: 'Share the contextual object/action in the mingle system'},
      'Minutes': {id: 'Minutes', value: 'Minute', comment: 'the minutes portion of a time'},
      'Minimize': {id: 'Minimize', value: 'Verklein', comment: 'Minimize tooltip'},
      'Minus': {id: 'Minus', value: 'Minus', comment: 'Minus tooltip'},
      'Mobile': {id: 'Mobile', value: 'Mobiel', comment: 'Indicates a mobile device (phone tablet ect)'},
      'More': {id: 'More', value: 'Meer ...', comment: 'Text Indicating More Buttons or form content'},
      'MoreActions': {id: 'MoreActions', value: 'Meer Aksies', comment: 'Text on the More Actions button indictating hidden functions'},
      'MsgDirty': {id: 'MsgDirty', value: ', Gewysig', comment: 'for modified form fields'},
      'NewDocument': {id: 'NewDocument', value: 'Nuwe Dokument', comment: 'New Document tooltip'},
      'Next': {id: 'Next', value: 'Volgende', comment: 'Next in icons tooltip'},
      'NextPage': {id: 'NextPage', value: 'Volgende Bladsy', comment: 'Next on Pager'},
      'NextMonth': {id: 'NextMonth', value: 'Volgende Maand', comment: 'the label for the button that moves calendar to next/prev'},
      'No': {id: 'No', value: 'Nee', comment: 'On a dialog button'},
      'NoResults': {id: 'NoResults', value: 'Geen Resultate', comment: 'Search Results Text'},
      'Normal': {id: 'Normal', value: 'Normaal', comment: 'Normal row height'},
      'Notes': {id: 'Notes', value: 'Notas', comment: 'Notes icon tooltip'},
      'NotSelected': {id: 'NotSelected', value: 'Nie Gekies Nie', comment: 'Not Selected in icons for filtering'},
      'NumberList': {id: 'NumberList', value: 'Nommerlys', comment: 'Number List tooltip'},
      'OpenBackClose': {id: 'OpenBackClose', value: 'Maak oop / Terug / Maak toe', comment: 'Open / Back / Close tooltip'},
      'OpenClose': {id: 'OpenClose', value: 'Maak oop / Maak toe', comment: 'Open / Close tooltip'},
      'OrderedList': {id: 'OrderedList', value: 'Verwyder/Voer Genommerde Lys by', comment: 'Insert an Ordered list in the editor'},
      'Page': {id: 'Page', value: 'bladsy ', comment: 'Text on the pager links'},
      'PageOf': {id: 'PageOf', value: 'Bladsy {0} van {1}', comment: 'Pager Text Showing current and number of pages'},
      'PageOn': {id: 'PageOn', value: 'Jy is tans op bladsy ', comment: 'Text on the pager links'},
      'Paste': {id: 'Paste', value: 'Plak', comment: 'Paste icon tooltip'},
      'PasswordValidation': {id: 'PasswordValidation', value: '<strong>Wagwoord moet</strong><br>ten minste 10 karakters lank wees<br>ten minste een hoofletterkarakter bevat<br>ten minste een kleinletterkarakter bevat<br>een spesiale karakter bevat<br>nie jou gebruikernaam bevat nie<br>nie \'n wagwoord wees wat voorheen gebruik is nie<br>', comment: 'Password validation requirements'},
      'PasswordConfirmValidation': {id: 'PasswordConfirmValidation', value: 'Wagwoord moet ooreenstem', comment: 'Password Confirm validation'},
      'Peak': {id: 'Peak', value: 'Piek', comment: 'the max or peak value in a chart'},
      'PersonalizeColumns': {id: 'PersonalizeColumns', value: 'Verpersoonlik Kolomme', comment: 'Customize Columns in a Grid'},
      'Period': {id: 'Period', value: 'Tydperk', comment: 'the am/pm portion of a time'},
      'PressDown': {id: 'PressDown', value: 'Druk afpyltjie om \'n datum te kies', comment: 'the audible label for Tooltip about how to operate the date picker'},
      'PressShiftF10': {id: 'PressShiftF10', value: 'Druk Shift+F10 om die kontekskieslys oop te maak.', comment: 'the audible infor for screen readers on how to use a field with a popup menu'},
      'Previous': {id: 'Previous', value: 'Vorige', comment: 'Previous icon tooltip - moved to previous record'},
      'PreviousMonth': {id: 'PreviousMonth', value: 'Vorige Maand', comment: 'the label for the button that moves calendar to next/prev'},
      'PreviousPage': {id: 'PreviousPage', value: 'Vorige Bladsy', comment: 'Previous Page tooltip'},
      'Print': {id: 'Print', value: 'Druk', comment: 'Print tooltip'},
      'Range': {id: 'Range', value: 'Strekking', comment: 'Range for tooltip'},
      'RecordsPerPage': {id: 'RecordsPerPage', value: '{0} Rekords per bladsy', comment: 'Dropd own allows the user to select how many visible records {} shows select value.'},
      'Redo': {id: 'Redo', value: 'Doen oor', comment: 'Redo tooltip'},
      'Refresh': {id: 'Refresh', value: 'Verfris', comment: 'Refresh tooltip'},
      'Required': {id: 'Required', value: 'Vereis', comment: 'indicates a form field is manditory'},
      'Reset': {id: 'Reset', value: 'Stel terug', comment: 'Reset tooltip'},
      'Results': {id: 'Results', value: 'Resultate', comment: 'As in showing N Results in a List'},
      'RightAlign': {id: 'RightAlign', value: 'Stel Regs In Lyn', comment: 'Right Align tooltip'},
      'RightAlignText': {id: 'RightAlignText', value: 'Stel Regs In Lyn', comment: 'Right Align Text tooltip'},
      'Right': {id: 'Right', value: 'Regs', comment: 'Right'},
      'Roles': {id: 'Roles', value: 'Rolle', comment: 'Roles tooltip'},
      'RowHeight': {id: 'RowHeight', value: 'Ryhoogte', comment: 'Describes the Height for Rows in a Data Grid'},
      'Ruby': {id: 'Ruby', value: 'Robyn', comment: 'Color in our color pallette'},
      'RunFilter': {id: 'RunFilter', value: 'Laat Filtreerder Loop', comment: 'Execute the current filter criteria'},
      'Save': {id: 'Save', value: 'Berg', comment: 'Save tooltip'},
      'SaveCurrentView': {id: 'SaveCurrentView', value: 'Berg Huidige Aansig', comment: 'Datagrids contain view sets. This menu option saves them'},
      'SavedViews': {id: 'SavedViews', value: 'Gebergde Aansigte', comment: 'Label for a list of Views'},
      'Search': {id: 'Search', value: 'Soek', comment: 'Search tooltip'},
      'SearchColumnName': {id: 'SearchColumnName', value: 'Soek vir \'n kolomnaam', comment: 'Search for a datagrid column by name'},
      'SearchFolder': {id: 'SearchFolder', value: 'Soek in Lêergids', comment: 'Search Folder tooltip'},
      'SearchList': {id: 'SearchList', value: 'Soek Lys', comment: 'Search List tooltip'},
      'Select': {id: 'Select', value: 'Kies', comment: 'text describing a select action'},
      'Selected': {id: 'Selected', value: 'Gekies', comment: 'text describing a selected object'},
      'Send': {id: 'Send', value: 'Stuur', comment: 'Send tooltip'},
      'SetTime': {id: 'SetTime', value: 'Stel Tyd In', comment: 'button text that inserts time when clicked'},
      'Settings': {id: 'Settings', value: 'Instellings', comment: 'Settings tooltip'},
      'Short': {id: 'Short', value: 'Kort', comment: 'Describes a Shorted Row Height in a grid/list'},
      'ShowFilterRow': {id: 'ShowFilterRow', value: 'Wys Filtreerry', comment: 'Toggle a row with filer info above a list'},
      'ShowLess': {id: 'ShowLess', value: 'Wys Minder', comment: 'Show less form content'},
      'ShowMore': {id: 'ShowMore', value: 'Wys Meer', comment: 'Show more form content'},
      'Slate': {id: 'Slate', value: 'Tablet', comment: 'Color in our color pallette'},
      'SliderHandle': {id: 'SliderHandle', value: 'Handvatsel vir', comment: 'Description of the portion of a Slider control that is focusable and changes its value, followed in code by the name of the control'},
      'SliderMaximumHandle': {id: 'SliderMaximumHandle', value: 'Maksimum strekkinghandvatsel vir', comment: 'Describes a maximum value handle in a Range (double slider), followed in code by the name of the control'},
      'SliderMinimumHandle': {id: 'SliderMinimumHandle', value: 'Minimum strekkinghandvatsel vir', comment: 'Describes a minimum value handle in a Range (double slider), followed in code by the name of the control'},
      'SkipToMain': {id: 'SkipToMain', value: 'Slaan oor na Hoofinhoud', comment: 'Skip link in header, jumps when clicked on to main area'},
      'StartsWith': {id: 'StartsWith', value: 'Begin Met', comment: 'for condition filtering'},
      'StrikeThrough': {id: 'StrikeThrough', value: 'Trek Streep Deur', comment: 'turn on and off strike through text in text editor (like word)'},
      'SortAtoZ': {id: 'SortAtoZ', value: 'Sorteer Stygend', comment: 'Sort A to Z in icons for filtering'},
      'SortZtoA': {id: 'SortZtoA', value: 'Sorteer Dalend', comment: 'Sort Z to A in icons for filtering'},
      'SortDown': {id: 'SortDown', value: 'Sorteer Af', comment: 'Sort Down tooltip'},
      'SortUp': {id: 'SortUp', value: 'Sorteer Op', comment: 'Sort Up tooltip'},
      'Subscript': {id: 'Subscript', value: 'Voetskrif', comment: 'Turn on and off Subscript text in text editor (like word)'},
      'Superscript': {id: 'Superscript', value: 'Boskrif', comment: 'Turn on and off Superscript text in text editor (like word)'},
      'Tabs': {id: 'Tabs', value: 'Vlaggies ...', comment: 'Used in the Tabs Control\'s more menu, preceeded by a number that describes how many tabs are in the spillover menu'},
      'Tack': {id: 'Tack', value: 'Pen', comment: 'Pin an object'},
      'Tall': {id: 'Tall', value: 'Lank', comment: 'Describes a Taller Row Height in a grid/list'},
      'Timer': {id: 'Timer', value: 'Tydhouer', comment: 'Timer tooltip'},
      'Today': {id: 'Today', value: 'Vandag', comment: 'refering to today on a calendar'},
      'ToggleBold': {id: 'ToggleBold', value: 'Wissel Vetdrukteks', comment: 'turn on and off bold in text editor (like word)'},
      'ToggleH3': {id: 'ToggleH3', value: 'Wissel Opskrif 3', comment: 'turn on and off heading 3 text'},
      'ToggleH4': {id: 'ToggleH4', value: 'Wissel Opskrif 4', comment: 'turn on and off heading 4 text'},
      'ToggleItalic': {id: 'ToggleItalic', value: 'Wissel Skuinsdrukteks', comment: 'turn on and off Italic in text editor (like word)'},
      'ToggleUnderline': {id: 'ToggleUnderline', value: 'Wissel Onderstreepteks', comment: 'turn on and off Underline in text editor (like word)'},
      'Toolbar': {id: 'Toolbar', value: 'Nutsbalk', comment: 'describing the toolbar component'},
      'TopAlign': {id: 'TopAlign', value: 'Bokant-Inlynstelling', comment: 'Top Align tooltip'},
      'Total': {id: 'Total', value: 'Totaal', comment: 'Mathematic total of a calculation'},
      'TreeCollapse': {id: 'TreeCollapse', value: 'Vou Boom Op', comment: 'Tree Collapse tooltip'},
      'TreeExpand': {id: 'TreeExpand', value: 'Brei Boom Uit', comment: 'Tree Expand tooltip'},
      'Turquoise': {id: 'Turquoise', value: 'Turkoois', comment: 'Color in our color pallette'},
      'Up': {id: 'Up', value: 'Op', comment: 'Up tooltip'},
      'Upload': {id: 'Upload', value: 'Laai op', comment: 'Upload tooltip'},
      'UnavailableDate': {id: 'UnavailableDate', value: 'Onbeskikbare Datum', comment: 'Unavailable Date Text'},
      'Underline': {id: 'Underline', value: 'Onderstreep', comment: 'Make text Underlined'},
      'Undo': {id: 'Undo', value: 'Ontdoen', comment: 'Undo tooltip'},
      'Unlocked': {id: 'Unlocked', value: 'Oopgesluit', comment: 'Unlocked tooltip'},
      'UnorderedList': {id: 'UnorderedList', value: 'Verwyder/Voer Kolpuntlys In', comment: 'Insert an Unordered list in the editor'},
      'Unsupported': {id: 'Unsupported', value: 'Hierdie inhoud is nie beskikbaar nie want dit gebruik kenmerke wat nie in jou huidige blaaierweergawe ondersteun word nie.', comment: 'Suggesting browser upgrade for missing features.'},
      'Url': {id: 'Url', value: 'Url', comment: 'Url tooltip'},
      'UseArrow': {id: 'UseArrow', value: '. Gebruik pyltjietoetse om te kies.', comment: 'Instructional comments for screen readers'},
      'UseEnter': {id: 'UseEnter', value: '. Gebruik doen- of afpyltjietoets om op te soek.', comment: 'Instructional comments for screen readers'},
      'User': {id: 'User', value: 'Gebruiker', comment: 'User tooltip'},
      'UserProfile': {id: 'UserProfile', value: 'Gebruikerprofiel', comment: 'User Profile tooltip'},
      'VerticalMiddleAlign': {id: 'VerticalMiddleAlign', value: 'Vertikale Inlynstelling In Middel', comment: 'Vertical Align tooltip'},
      'ViewSource': {id: 'ViewSource', value: 'Sien Bron', comment: 'Toggle the source view in the editor'},
      'ViewVisual': {id: 'ViewVisual', value: 'Sien Visueel', comment: 'Toggle the visual view in the editor'},
      'Yes': {id: 'Yes', value: 'Ja', comment: 'On a dialog button'}
    }
  });
}));
