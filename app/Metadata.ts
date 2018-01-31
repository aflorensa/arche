import * as PromptSync from "prompt-sync";
import * as Config from "prompt-sync";
import {Prompt} from "prompt-sync";
import * as fs from "fs-extra";
import * as path from "path";
import * as shell from 'shelljs';
import * as chalk from "chalk";
import * as figlet from "figlet";


export class Metadata {

    prompt: Prompt;

    constructor(private rule: any = {}) {
        this.prompt = PromptSync(Config);
    }

    getArchetypeModel():any{
        var options:Array<Object> = this.getArchetypesList();
        this.printRuleOptions(options);
        var artifact = this.prompt(">");
        if (isNaN(parseInt(artifact)) || parseInt(artifact)>=options.length) this.exitMierder();
        var name = this.prompt("Nombre del proyecto: ");
        if (name=="") this.exitMierder();
        var destination = this.prompt("Carpeta destino: ("+__dirname+")",__dirname);
        if (destination=="") this.exitMierder();
        var ask = this.prompt("Quieres subir el projecto a github (si o no)?: ");
        if (ask != "si" && ask != "no") this.exitMierder();
        var json = fs.readJsonSync(options[parseInt(artifact)]['file']);
        json.name=name;
        json.destination=destination;
        json.ask = ask;
        return json;
    }

    getArchetypesList():Array<Object> {
        var archetypeList:Array<Object> = Array();
        let rulesDir = path.join(__dirname, 'rules');
        let id=0;
        if(fs.existsSync(rulesDir)){
            fs.readdirSync(rulesDir).forEach(file => {
                let filePath = path.join(rulesDir, file);
                var json = fs.readJsonSync(filePath);
                archetypeList.push({"id":id,"file":filePath,"title":json.title,"description":json.description});
                id++;
            });
        }
        return archetypeList;
    }

    printRuleOptions(rules: Array<Object>){
        console.log("Elije entre estos proyectos:\n");
        rules.forEach(rule => {
            console.log(rule['id']+") "+rule['title']+" ["+rule['description']+"]");
        });
    }

    exitMierder(){
        console.log(
            chalk.black(
                figlet.textSync('CAPULLO', { horizontalLayout: 'full' })
            )
        );
        console.log("\na la mierda por retarded.\n");
        shell.exit(0);
    }

}