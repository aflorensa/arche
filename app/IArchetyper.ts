/**
 * Created by xavi on 1/27/2018.
 */

export interface IArchetyper {

    retrieveModel(rule: any):any;
    clone():string;
    parse(transformations: any): Array<string>;
    compile():string;


}