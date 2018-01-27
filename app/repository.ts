import { Promise } from "es6-shim";
import * as shell from 'shelljs';
import * as fs from "fs-extra";

export class Repository {

    private rule: any;
    private destination: string;
    private projectName: string;
    private projectPath: string;

    constructor(rule: any = {}, projectName: string = "") {
        this.rule = rule;
        this.projectName = projectName;
        this.destination = "./";
        this.projectPath = this.destination + "/" + this.projectName;
    }

    public reset()  {
        if(fs.existsSync(this.projectPath)){
            fs.removeSync(this.projectPath);
        }
    }
    public clone(callback:any): string  {
        let command = "cd "+this.destination+" && git clone " + this.rule.repository.url + " " + this.projectName;
        if (shell.exec(command).code == 0) {
            callback();
        }
        return this.projectPath;
        // Promise.resolve([1, 2, 3]);
    }

}
