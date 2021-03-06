"use strict"

// Require the "fs" (filesystem) module:
var fs = require('fs');

// Change the current working directory to the "SmartHomeAPI" Root.
var fsRoot = require("path").resolve(__dirname);
process.chdir(fsRoot);
process.chdir("../");

// This is the object that will be exported!
module.exports = {

  lastError: "",
  exitWithError: false,

  devices: {

    driverDirectory    : "DeviceDrivers",
    interfaceDirectory : "DeviceInterfaces",

    packetLossThreshold: 20, // In percent (%)

    scanInterval: 300000, // 5 Minutes in ms.

    deviceDiscoverTimeout: 1000 * 60 // 1 Minute
    
  }, // End devices

  general: {

    // This app version
    version: '0.1.0',

    // Terminal Output:
    // -----------------------------------------------
    // 0 - Report Nothing to console (will still show up in the server log).
    // 1 - Errors Only.
    // 2 - Errors & Warnings
    // 3 - Report All (Errors, Warnings, and Notices).
    reporting: 3,

    // The salt for encryption/decryption
    salt: "…´ÄÛÔ∑ÛÔcn}.Ëÿí≈P-“&JÒ5ª«j£",

    deviceLoadTimeout: 180000, // 3 Minutes

    requireAuthentication: false,

    APIKey: fs.readFileSync('.key').toString(),

    firebaseRootURI   : "https://newsmarthometest.firebaseio.com/" + fs.readFileSync('.key').toString(),
    firebaseAPIStatus : "api_status",

    firebaseDevicePath              : "device_data",
    firebaseUserPath                : "users",
    firebaseUserSettingsPath        : "device_configs",
    firebaseAllDevicesPath          : "connected_devices",
    firebaseUserSettingsChangesPath : "last_request",

    logPath: "smarthomelog.log"

  }, // End general

  request: {

    requiredFields: [ "make", "model", "version", "func" ]

  },

  rules: {
    firebaseRulesPath: "rules",
    firebaseDeviceRulesPath: "device_rules",
    firebaseUserRulesPath: "user_rules"

  }, // End rules

  schedules: {
    firebaseSchedulesPath: "schedules"

  } // End schedules

}; // End module.exports