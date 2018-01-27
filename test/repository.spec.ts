import { Repository } from "../app/repository";
import * as fs from "fs-extra";
import {expect} from 'chai';


describe("Repository", () => {

    let sut;

    beforeEach(() => {
        let data = JSON.parse(fs.readFileSync("./test/resources/sample.json", "utf8"));
        sut = new Repository(data);
        sut.reset();
    });

    it("should clone", (done) => {
        let actual = sut.clone(done);
        expect(actual).to.equal("./tmp/test-project");
    });

});
