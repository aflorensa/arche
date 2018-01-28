import {IArchetyper} from "./IArchetyper";
import {Repository} from "./repository";
import {Parser} from "./parser";
import {Metadata} from "./Metadata";


export class Arquetyper implements IArchetyper {
    private model: any;

    constructor(rule: any = {}) {
        this.model = rule;
    }

    public createFromSeed(){
        this.model=this.retrieveModel();
        this.clone();
        this.parse(this.model.transformations);
    }

    retrieveModel():any {
        let metadata = new Metadata();
        return metadata.getArchetypeModel();
    }

    parse(transformations: any = {}): Array<string> {
        let results: Array<string> = new Array;
        let parser = new Parser(this.model);
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
        let repository = new Repository(this.model);
        repository.reset();
        return repository.clone();
    }

}
