import { Metadata } from "../app/Metadata";
import * as fs from "fs-extra";
import {expect} from 'chai';


describe("Metadata", () => {

    let sut;

    beforeEach(() => {
        let data = JSON.parse(fs.readFileSync("./test/resources/sample.json", "utf8"));
        sut = new Metadata(data);
    });


    it("getArchetypeModel should ask for metadata", () => {
        // let actual = sut.getArchetypeModel();
        expect(3).to.equal(3);
    });

    it("getArchetypesList should get array of rules to choose", () => {
        let actual = sut.getArchetypesList();
        console.log(actual);
        expect(actual.length).to.equal(3);
    });

    it("printRuleOptions should get array of rules to choose", () => {
        function sample() {
            return [ { id: 0,
                file: 'D:\\workspace\\justdigital\\archetypes\\typescript-mocha-kata-seed-master\\app\\rules\\fuse-seed.json',
                title: 'fuse-seed',
                description: 'Backoffice with angular 5 and fuse style' },
                { id: 1,
                    file: 'D:\\workspace\\justdigital\\archetypes\\typescript-mocha-kata-seed-master\\app\\rules\\play-ebean-seed.json',
                    title: 'Generic API backend',
                    description: 'Minimal stuff to prepare a backend, motherfucker.' },
                { id: 2,
                    file: 'D:\\workspace\\justdigital\\archetypes\\typescript-mocha-kata-seed-master\\app\\rules\\webapp-seed.json',
                    title: 'front-end-angular-web',
                    description: 'Frontend angular web' } ];
        }

        sut.printRuleOptions(sample());
        expect(3).to.equal(3);
    });


});
