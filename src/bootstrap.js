_ = require('lodash');

var config = require('../config/index.js');

// Only get accounts that are enabled
var accounts = _.filter(config.accounts, { 'enabled': true });

var main = require('./main.js');
main(accounts);