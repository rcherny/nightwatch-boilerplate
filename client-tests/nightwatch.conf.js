

var seleniumStandaloneConf = require("selenium-binaries");
var chromedriver = seleniumStandaloneConf.chromedriver;
// var Environment = rootRequire('Environments');

// look in nightwatch.js for global.rootRequire();
var desiredBrowsers = rootRequire('desiredBrowsers');

var globals = require('./globals');
var launchUrl = globals.targetServers['local'].root;
var useBrowser = desiredBrowsers('phantomjs2');
// var useBrowser = desiredBrowsers('phantomjs');
// var useBrowser = desiredBrowsers('chrome');

module.exports = {
    "src_folders": ["tests"],
    "output_folder": "./target/reports",
    "custom_commands_path": "./commands",
    "globals_path": "./globals.js",
    "page_objects_path": "./pages",

    "live_output": true,

    "selenium": {
        "start_process": true,
        "server_path": seleniumStandaloneConf.seleniumserver,
        "log_path": "./target/log",
        "host": "127.0.0.1",
        "port": 4444,
        "cli_args": {
            "webdriver.chrome.driver": chromedriver
        }
    },

    "test_settings": {
        "default": {
            "launch_url": launchUrl,
            "selenium_port": 4444,
            "selenium_host": "localhost",
            "silent": true,
            "screenshots": {
                "enabled": true,
                "path": "target/screenshots"
            },
            "desiredCapabilities": useBrowser,
            "output": true,
            "exclude": []
        }
    }
}
