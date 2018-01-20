import * as fs from "fs";
import * as replace from 'replace-in-file';

export class Parser {

    private path: string;

    constructor(path: string = "./") {
        this.path = path;
    }

    public parse(options: any): Array<string>  {
        options.files=this.path+options.files;
        let changes: Array<string> = replace.sync(options);
        return changes;
    }

}
