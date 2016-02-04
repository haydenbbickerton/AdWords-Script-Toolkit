/*
    Define our accounts and configure them.

    Example:
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
*/

var accounts = [];

module.exports = accounts;