import { Promise } from "es6-shim";
import * as shell from 'shelljs';
import * as fs from "fs-extra";
import * as path from "path";

export class Repository {

    private rule: any;
    private projectPath: string;

    constructor(rule: any = {}) {
        this.rule = rule;
        this.projectPath = this.rule.destination + "/" + this.rule.name;
    }

    public reset()  {
        if(fs.existsSync(this.projectPath)){
            fs.removeSync(this.projectPath);
        }
    }
    public clone(): string  {
        let command = "cd "+this.rule.destination+" && git clone " + this.rule.repository.url + " " + this.rule.name;
        if (shell.exec(command).code == 0) {
            // stuff here
        }
        let fullpath = path.join(this.rule.destination, this.rule.name,'.git');
        if(fs.existsSync(fullpath)){
            fs.removeSync(fullpath);
        }
        return this.projectPath;
        // Promise.resolve([1, 2, 3]);
    }

}
