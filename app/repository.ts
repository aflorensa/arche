import { Promise } from "es6-shim";
import * as shell from 'shelljs';
import * as fs from "fs-extra";

export class Repository {

    private rule: any;
    private destination: string;
    private projectName: string;

    constructor(rule: any = {}, projectName: string = "") {
        this.rule = rule;
        this.projectName = projectName;
        this.destination = "./";
    }

    public reset()  {
        let projectPath:string = this.destination + "/" + this.projectName;
        if(fs.existsSync(projectPath)){
            fs.removeSync(projectPath);
        }
    }
    public clone()  {
        let command = "cd "+this.destination+" && git clone " + this.rule.repository.url + " " + this.projectName;
        if (shell.exec(command).code !== 0) {
            shell.echo('Error: something went wront cloning, matherfucker');
            shell.exit(1);
        }
        // Promise.resolve([1, 2, 3]);
    }

}
