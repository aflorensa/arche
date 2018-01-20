// import { Promise } from "es6-shim";
import * as fs from "fs";

// var fse = require("fs-extra");
// var jadeInline = require('node-file-to-string')();

export class FileCode {

    // private name: string;
    // private extension: string;
    private content: Array<string>;

    constructor(path: string) {
        this.content = fs.readFileSync(path, "utf8").split("\n");
    }

    public getContent(): Array<string> {
        return this.content;
    }

}
