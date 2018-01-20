import * as fs from "fs";
import * as replace from 'replace-in-file';

export class Parser {

    private path: string;

    constructor(path: string = "./") {
        this.path = path;
    }

    public parse(options: any): Array<string>  {
        let changes: Array<string>;
        options.files=this.path+options.files;

        try {
            changes = replace.sync(options);
            console.log('Modified files:', changes.join(', '));
        }
        catch (error) {
            console.error('Error occurred:', error);
        }
        return changes;
    }

}
