var scripts = require('./scripts/index.js');

module.exports = function(accounts) {

    var mccAccount = AdWordsApp.currentAccount();

    // Loop though the accounts, run scripts for each one
    _.forEach(accounts, function(account) {

        Logger.log(['Running for', account.label, '(', account.id, ')'].join(' '));

        // Select this child account.
        var childAccounts = MccApp.accounts().withIds([account.id]).get();
        MccApp.select(childAccounts.next());

        // Loop through the scripts in this account,
        // pass our config values to the script.
        _.forEach(account.scripts, function(value, key) {
            if (value.enabled === true) {
                scripts[key](value);
            }
        });
    });

    // Go back to the mcc account
    MccApp.select(mccAccount);

}