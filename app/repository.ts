//import { Promise } from "es6-shim";
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

    public clone(): string {

        let  command = "cd "+this.rule.destination+" && git clone --no-hardlinks" + this.rule.repository.url + " " + this.rule.name;
        if (shell.exec(command).code == 0) {
                 // stuff here
        }

        let fullpath = path.join(this.rule.destination, this.rule.name,'.git');
        let fullpath2 = path.join(this.rule.destination, this.rule.name)

        if(fs.existsSync(fullpath)){
            fs.removeSync(fullpath);
        }

        if (this.rule.ask == "si"){
            this.add()
        }

        this.add();
        return this.projectPath;
        // Promise.resolve([1, 2, 3]);
    }


    public add(){


            let  command1 = "git subtree split -P dist/app/"+ this.rule.name+ " -b master";
            if (shell.exec(command1).code == 0) {
                // stuff here
            }
            shell.cd(this.projectPath)
            let  command2 = "git init && git add -A && git commit -m 'first commit'";
            if (shell.exec(command2).code == 0) {
                // stuff here
            }
            let command3 = "git remote add origin master"+ this.rule.push + this.rule.name +".git && git push -u origin master";
            if (shell.exec(command3).code == 0) {
                // stuff here\n" +
            }
        }
}
