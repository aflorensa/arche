import * as fs from "fs";
import * as replace from 'replace-in-file';

export class Parser {

    private path: string;

    constructor(path: string = "./") {
        this.path = path;
    }

    public parse(options: any): Array<string>  {
        options.files=this.path+"/"+options.files;
        options=this.sanityze(options);
        let changes: Array<string> = replace.sync(options);
        return changes;
    }


    public sanityze(options: any):any {
        if (options.from.constructor.name === "RegExp") return options;
        options.from = new RegExp(options.from,"g");
        return options;
        // let from = (options.regexp) ? new RegExp(options.from, 'g') : options.from;
        // let json = this.stringify(options);
        // options = this.jsonparse(json);
    }

    public stringify(obj){
        var jsonified = {};
        for(let i in obj)
            jsonified[i] = {
                // magia xaviana to see type
                type: Object.prototype.toString.call(obj[i]).split(/\W/)[2],
                value: obj[i].toString()
            }
        return JSON.stringify(jsonified)
    }

    public jsonparse(json){
        let objectified = {};
        let obj = JSON.parse(json);
        for(let i in obj)
            if(obj[i].type == "RegExp"){
                var m = obj[i].value.match(/\/(.*)\/([a-z]+)?/);
                objectified[i] = new RegExp(m[1],m[2]);
            } else if(obj[i].type == "String"){
                objectified[i] = obj[i].value
            } else if(obj[i].type == "Function"){
                // WARNING: this is more or less like using eval
                // All the usual caveats apply - including jailtime
                objectified[i] = new Function("return ("+obj[i].value+")")();
            }

        return objectified
    }

}
