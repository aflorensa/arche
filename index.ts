/**
 * Created by xavi on 1/28/2018.
 */

import * as chalk from "chalk";
import * as clear from "clear";
import * as figlet from "figlet";
import {Arquetyper} from "./app/archetyper";

clear();
console.log(
    chalk.red(
        figlet.textSync('Archetyper Jabba', { horizontalLayout: 'full' })
    )
);

var app = new Arquetyper();
app.createFromSeed();
