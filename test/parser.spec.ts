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

    describe("parse package.json", () => {

        let sut;
        let expected = "./test/resources/fakeProjects/node_tmp/package.json";

        beforeEach(function () {
            fse.copySync("./test/resources/fakeProjects/nodejs", "./test/resources/fakeProjects/node_tmp");
            sut = new Parser("./test/resources/fakeProjects/node_tmp/");
        });

        it("should process node name", () => {
            let actual = sut.parse({"files": "package.json","from": /"name": ".*"/g ,"to": "\"name\": \"new-project\""});
            expect(actual[0]).to.equal(expected);
        });

        it("should parse regexp in string", () => {
            let actual = sut.parse({"files": "package.json","from": "\"name\": \".*\"" ,"to": "\"name\": \"new-project\""});
            expect(actual[0]).to.equal(expected);
        });


        describe("with model indirection in 'to' ", () => {
            beforeEach(function () {
                fse.copySync("./test/resources/fakeProjects/nodejs", "./test/resources/fakeProjects/node_tmp");
                var model = {"name":"wilfred"};
                sut = new Parser("./test/resources/fakeProjects/node_tmp/",model);
            });
            it("should parse vars with [[[]]]", () => {
                let actual = sut.parse({"files": "package.json","from":"true" ,"to": "[[[name]]]"});
                expect(actual[0]).to.equal(expected);
            });
            it("should work with non existing vars in model", () => {
                let actual = sut.parse({"files": "package.json","from":"true" ,"to": "[[[nonexisting]]]"});
                expect(actual[0]).to.equal(undefined);
            });
        });

        describe("usages  ", () => {
            beforeEach(function () {
                fse.copySync("./test/resources/fakeProjects/nodejs", "./test/resources/fakeProjects/node_tmp");
                var model = {"name":"wilfred"};
                sut = new Parser("./test/resources/fakeProjects/node_tmp/",model);
            });
            it("check array", () => {
                let actual = sut.parse({"files": "package.json","from":["true","dependencies"] ,"to": ["parata","asdf"]});
                expect(actual[0]).to.equal(expected);
            });
        });

    });
});