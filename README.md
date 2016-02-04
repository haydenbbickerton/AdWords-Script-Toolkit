# AdWords-Script-Toolkit

A more organized way to handle AdWords Scripts using [gulp](http://gulpjs.com/) and [Browserify](http://browserify.org/).

Installation
------------
Clone with git, install dependencies with npm.
```
git clone https://github.com/haydenbbickerton/AdWords-Script-Toolkit.git
cd Adwords-Script-Toolkit
npm install
```

Configuration
------------
Fill out `config/accounts.config.js` with your info.

Should look something like this:
```
var accounts = [
  {
    'enabled': true,
    'id': 'XXX-XXX-XXXX',
    'label': 'Client #1',
    'scripts' : {
        'myScriptName': {
            'enabled': true,
            'spreadsheetUrl': 'https://docs.google.com/spreadsheets/d/...',
            'myOption1': 'random value',
        }
    }
  },
  {
    'enabled': false,       // We set this to false, scripts won't run on this account
    'id': 'XXX-XXX-XXXX',
    'label': 'Client #2',
    'scripts' : {
        'myOtherScript': {
            'enabled': true,
            'myOption': 'Howdy, partner.',
        }
    }
  }
];

module.exports = accounts;
```
You can edit `config/index.js` if you need to add more config files.

Scripts
------------
Scripts go in the `src/scripts` folder, and an entry is created in `src/scripts/index.js`. Like this:
```
var scripts = {
	'myScriptName': require('./myScript.js')
};

module.exports = scripts;
```
In order to work with AST, scripts have to be tweaked a bit. Mostly it's about wrapping your 
code in `module.exports = function (config) { ... }` instead of `function main() { ... }`, and
changing your script options to use the config object passed in.

You can find an example script here - [Heat Map Creation Tool (AST)](https://gist.github.com/haydenbbickerton/ea55e763ec20a8a59825).
The original (non-AST) script can be found here for comparison - [Heat Map creation Tool](https://gist.github.com/BrainlabsDigital/ebed4453ca358fc3ae87).

Building
------------
Run:
```
gulp
```
The result file will be at `build/entry.js`. You can put that file on your webserver by itself if you want, although I prefer
to have the whole repo on the webserver and just reference the file from the build path.

Install in AdWords
------------
Create a new script in AdWords with this:
```
/*
  We put these outside our main script so it will trigger the authorization confirmation.
  Otherwise the script will fail and say you don't have permission. 
  These can be any spreadsheets/docs, doesn't matter, they aren't used.
*/
SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/...');
DocumentApp.openByUrl('https://docs.google.com/document/d/...');

function main() {
  // Thanks to Niklas9 for this - http://stackoverflow.com/a/15877644
  var url = "https://example.com/adwords/build/entry.js";
  eval(UrlFetchApp.fetch(url).getContentText());
}
```
If your scripts use Google services that require authorization (ex - Google Spreadsheets, Google Docs, etc), you'll have
to make a call in the script that goes in the AdWords interface. Otherwise AdWords won't see it, and the authorization
won't get triggered.

# !!! IMPORTANT !!!
The `eval()` function will run **all** code in the file passed to it. Double and triple check everything before
doing anything !important, and **always** do preview runs in AdWords first. If you're going to be making changes to scripts,
don't forget to turn off scheduling.

## License
AdWords Script Toolkit is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)

#### Isn't this against AdWords Policy?
`¯\_(ツ)_/¯`
