'use strict';

/**
 * Shared constants
 *
 * IMPORTANT INSTRUCTIONS!
 *
 * 1. Only include constants that are shared across multiple menu functions
 *      a. Constants that are only used within one menu function should be placed on the base controller
 * 2. Keys should be in all caps with underscores
 * 3. Choose meaningful and descriptive names for keys so that we can easily know what the constant is for
 * 4. Keep in alphabetical order
 */
app.constant('Constants', {
   AUTOCOMPLETE_DELAY: 600, // We increase the autocomplete search delay to reduce unnecessary calls. This is delay between stop typing and search call. (soho default is 300 ms)
   CART_LIMIT: 25,
   DEFAULT_HTTP_TIMEOUT: 60000, // Default timeout in milliseconds for ajax requests (can be overridden on a call-by-call basis)
   DOUBLE_CLICK_PREVENTION_DELAY: 1000, // The time in ms to ignore additional button clicks after a click happens (prevents accidental double clicks)
   EASY_ENTRY_PAGE_SIZE: 10,
   EASY_ENTRY_RECORD_LIMIT: 100,
   EXCEL_LOAD_UPDATE_ETENDED_TIMEOUT: 300000,
   LABEL_DELIMITER: ': ',
   LOT: 'l',
   MAX_MULTIPLE_FUNCTION_TABS: 5,
   MENU_FUNCTION_OEET: 'oeet',
   MENU_FUNCTION_POET: 'poet',
   MENU_FUNCTION_WTET: 'wtet',
   MRU_INVALIDATE_DATE: '2017-09-22T00:00:00', // All MRU data stored before this date will be removed upon user login (ex. 2017-07-15T00:00:00)
   PV_DELIMITER: '\x0003',
   SEARCH_PATH: '/web/serviceinterface/server/AppserverLogic/search/searchindex', // Path for the elastic search call
   SERIAL: 's',
   SESSION_ID_KEY: 'SXE_SESSION_ID', // The key for where to store the session id in the browser's session storage
   BEARER_TOKEN: 'BEARER_TOKEN', 
   SESSION_LOGIN_RESULTS_KEY: 'SXE_LOGIN_RESULTS', // The key for where to store the login results data in session storage
   SIGN_OUT_INFO_KEY: 'SXE_SIGN_OUT_INFO',
   STORAGE_KEY_ACTIVE_WINDOWS: 'ACTIVE_WINDOWS', // Number of open browser windows logged into sxe for the user
   STORAGE_KEY_ADVANCED_SEARCH: 'AS',
   STORAGE_KEY_LAST_MRU_CLEAR: 'LASTMRUCLEAR',
   STORAGE_KEY_MRU: 'MRU',
   STORAGE_KEY_RECENTLY_VISITED: 'RV',
   SUB_TITLE_SEPARATOR: ' | ', // Separator between pieces in a header sub-title
   VENDOR_AND_PRODUCT_LINE: 'Vendor and Product Line',
   VENDOR: 'Vendor'
});