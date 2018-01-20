import { Parser } from "../app/parser";
import {expect} from 'chai';
import * as fse from "fs-extra";

describe("Parser", () => {

    describe("parse conf/application.conf", () => {

        let sut;
        let expected = "./test/resources/fakeProjects/playframework_tmp/conf/application.conf";

        beforeEach(function () {
            fse.copySync("./test/resources/fakeProjects/playframework", "./test/resources/fakeProjects/playframework_tmp");
            sut = new Parser("./test/resources/fakeProjects/playframework_tmp/");

        });

        let exerciseParse = function(from: any) {
            let actual = sut.parse({
                "files": "conf/application.conf",
                "from": from,
                "to": "patata"
            });
            return actual;
        };

        it("should process regexp", () => {
            let actual = exerciseParse(/[A-Za-z-]+/g);
            expect(actual[0]).to.equal(expected);
        });

        it("should process simple substitution", () => {
            let actual = exerciseParse("default");
            expect(actual[0]).to.equal(expected);
        });

        it("should process non matching substitution", () => {
            let actual = exerciseParse("asdfasdf");
            expect(actual.length).to.equal(0);
        });

    });



});