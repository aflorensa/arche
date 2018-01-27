import * as prompt from "prompt-sync";

export class Metadata {

    constructor(private rule: any = {}) {
    }

    getArchetypeModel():any{

        var value = 'frank';
        var name = prompt('enter name: ', value);
        console.log('name is: '+name);
        return {};
    }

}