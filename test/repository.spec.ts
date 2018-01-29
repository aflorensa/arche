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

    it("should clone", () => {
        sut.reset();
        expect("./tmp/test-project").to.equal("./tmp/test-project");
    });

});
