import { FileCode } from "../app/FileCode";
import {expect} from 'chai';

describe("FileCode", () => {

    it("should construct", () => {
        let sut = new FileCode("./test/resources/somefilefortest.txt");
        expect(sut.getContent().length).to.equal(4);


    });
});
