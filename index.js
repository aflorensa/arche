/**
 * Created by xavi on 1/28/2018.
 */

"use strict";

var chalk       = require('chalk');
var clear       = require('clear');
var figlet      = require('figlet');

clear();
console.log(
    chalk.yellow(
        figlet.textSync('Archetyper Jabba', { horizontalLayout: 'full' })
    )
);

