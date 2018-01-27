import { Metadata } from "../app/Metadata";
import * as fs from "fs-extra";
import {expect} from 'chai';


describe("Metadata", () => {

    let sut;

    beforeEach(() => {
        let data = JSON.parse(fs.readFileSync("./test/resources/sample.json", "utf8"));
        sut = new Metadata(data);
    });

    it("should clone", () => {
        let actual = sut.getArchetypeModel();
        expect(actual).to.equal("./tmp/test-project");
    });

});
