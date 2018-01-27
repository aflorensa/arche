import { Repository } from "../app/repository";
import * as fs from "fs-extra";


describe("Repository", () => {

    let sut;

    beforeEach(() => {
        let data = JSON.parse(fs.readFileSync("./test/resources/sample.json", "utf8"));
        sut = new Repository(data,"test-project");
        sut.reset();
    });

    it("should clone", () => {
        sut.clone();
    });

});
