

# Nightwatch Boilerplate

Basic set up for using [Nightwatch](http://nightwatchjs.org/) for testing use cases, integration, and client-side code.

## Note

Please note this is several versions behind the original Nightwatch master branch. Needs to be udpated!

## Dependencies

Please see the package.json file.

Overall we are talking about:

 - npm
 - node.js

NPM will install:
 - selenium standalone
 - phantomjs + ghostdriver for headless testing
 - chromedriver for browser testing (IE/Firefox is possible as well)

## Set Up

From the ./client-tests/ folder:

> npm install

This will install a number of node.js modules, such as those cited above. One of the modules is a selenium-binaries that includes the Chromedriver and Selenium standalone JAR files. By default these are going into the `$HOME/.selenium-binaries`

## Using in your project

For most projects this makes some assumptions about a global var and some addresses.

 - Currently the global var is set to `iso` but you'd want to replace that.
 - Also, urls are set in `globals.js`

### Note about install locations

We can override the path install that writes out the binary-paths.json file by including these sorts of things in the `nightwatch.js` file.

```
var path = require('path');
var home = process.env.HOME || process.env.USERPROFILE;
process.env.SELENIUM_BINARIES_HOME = path.resolve(home, '.selenium-binaries');
```

## Executing Tests

From the command line in the `client-tests` folder, run:

> node nightwatch

Output, including:

- Raw console output to a file
- A selenium debug log file
- junit XML files

Will go to:

> ./client-tests/target/

## Reference Links

Current test implementation uses Nightwatch with Phantom.js for headless testing.

Homepage:
- http://nightwatchjs.org/
- http://nightwatchjs.org/guide
- http://nightwatchjs.org/api

Support:
 - https://groups.google.com/forum/#!forum/nightwatchjs
 - http://stackoverflow.com/questions/tagged/nightwatch.js
 - https://twitter.com/nightwatchjs

Source Code and Documentation:
- https://github.com/nightwatchjs/nightwatch
- https://github.com/nightwatchjs/nightwatch-docs
