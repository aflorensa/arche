import * as fs from "fs";
import * as replace from 'replace-in-file';

export class Parser {
    path: string;

    constructor(private model: any = {}) {
        this.path = this.model.destination+"/"+this.model.name
    }

    public parse(options: any): Array<string>  {
        options.files=this.path+"/"+options.files;
        options=this.sanityze(options);
        let changes: Array<string> = replace.sync(options);
        return changes;
    }


    public sanityze(options: any):any {
        if (!Array.isArray(options.to) && options.to.match(/\[\[\[([^)]+)\]\]\]/)) {
            let to = options.to.match(/\[\[\[([^)]+)\]\]\]/)[1];
            if (this.model[to]) {
                options.to = this.model[to];
            } else {
                options.to=options.from;
            }

        }
        if (Array.isArray(options.from)) return options;
        if (options.from.constructor.name === "RegExp") return options;
        options.from = new RegExp(options.from,"g");
        return options;
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
                objectified[i] = new Function("return ("+obj[i].value+")")();
            }

        return objectified
    }

}
