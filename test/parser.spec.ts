import { Parser } from "../app/parser";
import {expect} from 'chai';
import * as fse from "fs-extra";

describe("Parser", () => {

    describe("parse", () => {

        let sut;

        beforeEach(function () {
            fse.copySync("./test/resources/fakeProjects/playframework", "./test/resources/fakeProjects/playframework_tmp");
            sut = new Parser("./test/resources/fakeProjects/playframework_tmp/");

        });

        it("should process regexp", () => {
            let actual = sut.parse({
                "files": "conf/application.conf",
                "from": "[:]\\s(\\\".*\\\")" ,
                "to": "patata"
            });
            expect(actual).to.equal({});
        });

        it("should process simple substitution", () => {
            let actual:Array<string> = sut.parse({
                "files": "conf/application.conf",
                "from": "default" ,
                "to": "patata"
            });
            expect(actual[0]).to.equal("./test/resources/fakeProjects/playframework_tmp/conf/application.conf");
        });
    });



});