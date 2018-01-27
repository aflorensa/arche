import {IArchetyper} from "./IArchetyper";
import {Repository} from "./repository";
import {Parser} from "./parser";


export class Arquetyper implements IArchetyper {
    rule: any;

    constructor(rule: any = {}) {
        this.rule = rule;
    }

    public createFromSeed(){
        this.clone();
        this.parse(this.rule.transformations);
    }

    promptForData() {
        throw new Error('Method not implemented.');
    }

    parse(transformations: any = {}): Array<string> {
        let results: Array<string> = new Array;
        let parser = new Parser(this.rule.destination+"/"+this.rule.name);
        transformations.map(function(json){
            let message = parser.parse(json);
            results.push(message.pop())
        });
        return results;
    }

    compile(): string {
        throw new Error('Method not implemented.');
    }

    clone(): string {
        let repository = new Repository(this.rule);
        repository.reset();
        return repository.clone();
    }

}
