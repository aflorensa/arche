import {IArchetyper} from "./IArchetyper";
import {Repository} from "./repository";
import {Parser} from "./parser";


export class Arquetyper implements IArchetyper {
    private model: any;

    constructor(private rule: any = {}) {
    }

    public createFromSeed(){
        this.clone();
        this.model=this.retrieveModel(this.rule);
        this.parse(this.rule.transformations);
    }

    retrieveModel(rule: any = {}):any {
        return {"name":rule.name};
    }

    parse(transformations: any = {}): Array<string> {
        let results: Array<string> = new Array;
        let parser = new Parser(this.rule.destination+"/"+this.rule.name, this.model);
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
