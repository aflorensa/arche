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
            fs.rmdirSync(projectPath);
        }
    }
    public clone()  {
        shell.exec("cd "+this.destination+" && git clone " + this.rule.repository.url + " " + this.projectName );
    }

}
