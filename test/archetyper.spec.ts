import * as fs from "fs-extra";
import {expect} from 'chai';
import {Arquetyper} from "../app/archetyper";


describe("Archetyper", () => {

    let sut;
    let data;
    beforeEach(() => {
        data = JSON.parse(fs.readFileSync("./test/resources/sample.json", "utf8"));
        sut = new Arquetyper(data);
    });

    it("should parse", (done) => {
        sut.createFromSeed();

        let actual : Array<string>  = sut.parse(data.transformations);
        expect(actual.length).to.equal(3);

        done();
    });

});
