// Incase we want to make this a non-browser thing, this could be changed to global = global in node. :P
var global = window;


// <------------------------------------------- GLOBAL SETTINGS ------------------------------------------> //
var PAGE_TRANSITION_TYPE       = "slide";
var GET_PARAMETERS_GLOBAL_NAME = "$SH_GetParams";

var USERS_GLOBAL        = "$SH_Users";
var RULES_GLOBAL        = "$SH_Rules";
var SCHEDULES_GLOBAL    = "$SH_Schedules";
var DEVICES_GLOBAL      = "$SH_Devices";
var CONN_DEVICES_GLOBAL = "$SH_Conn_Devices";

var USER                    = "jason";
var FIREBASE_USER_DATA      = "https://smarthomeapp.firebaseio.com/users/" + USER + "/device_configs/";
var FIREBASE_USER_DATA_OBJ  = new Firebase(FIREBASE_USER_DATA);

var SPLASH_PAGE     = "index.html";
var MY_DEVICES_PAGE = "my-devices.html";
var DEVICES_PAGE    = "devices.html";

var FIREBASE_ROOT              = "https://smarthomeapp.firebaseio.com/";
var FIREBASE_OBJ               = new Firebase(FIREBASE_ROOT);
var FIREBASE_DEVICE_DATA       = "https://smarthomeapp.firebaseio.com/device_data";
var FIREBASE_DEVICE_DATA_OBJ   = new Firebase(FIREBASE_DEVICE_DATA);
var DEVICE_SETTINGS_PATH       = "settings";
var BOOTSTRAP_MSG_INTERVAL     = 350; // In MS.
var BOOTSTRAP_MSG_ELEMENT      = "#bootstrap-msg";

var DEVICE_ICON_DIR            = "img/device-icons";
var DEFAULT_DEVICE_ICON        = "default.png";


// <------------------------------------------- USEFUL METHODS -------------------------------------------> //
// *** NOTE THAT ALL FUNCTIONS ARE PREFIXED WITH '$SH_' TO PREVENT NAMESPACE ISSUES! ***


/**
 * Gets the URL Search String of A Page
 * @param url - The url to get parameters of
 * @return - The list of requested parameters, or if you pass multiple strings, the parameters with those names.
 */
global.$SH_GetParameters = function(url) {

    var pageURL     = (!url) ? window.location.search.substring(1) : url.split(/\?/)[1];
    var vars        = pageURL.split('&');
    var params      = {};

    // The arguments passed to this function, converted into a "real" array...
    var args = Array.prototype.slice.call(arguments);
    args.shift();

    // All GET Query Parameters passed
    var allParams = {};

    // Get all parameters
    for(var i = 0; i < vars.length; i++) {

        var param = vars[i].split('=');

        allParams[param[0]] = param[1];

    } // End for loop

    if(args.length > 0) { // The user has requested specific arguments...

        for(var n = 0; n < args.length; n++) (allParams[args[n]]) ? params[args[n]] = allParams[args[n]] : params[arg[n]] = null;

    }
    else { // The user didn't specify specific params, pass all back...

        params = allParams;

    } // End if/else block

    // If we haven't defined a global yet, do so...
    if((args.length === 0) && (params.length > 0) && !window[GET_PARAMETERS_GLOBAL_NAME] && !url)
        window[GET_PARAMETERS_GLOBAL_NAME] = params;

    // Return an array of requested (or all) parameters
    return params;

}; // End $SH_GetParameters()


/**
 * Cleanup GET parameters... replace '_' with spaces and make parameters title case.
 * @param params - A "params" object
 */
global.$SH_CleanParams = function (params) {

    var clean = {};

    for(var i in params) clean[i] = UCFirst(params[i].replace(/_/ig, ' '));

    return clean;

} // End $SH_CleanParams

global.UCFirst = function (s) {
    return s.replace(/\w\S*/ig, function (str) { return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase(); });
}


/**
 * On Demand Page Loader
 * @param pageName - The filename of the Page *** Without the "pages" prefix and extension! ***
 */
global.$SH_LoadPage = function (pageName) {

    // Immediately load the page into the DOM
    $.mobile.loadPage("pages/" + pageName + ".html");

}; // End $SH_LoadPage