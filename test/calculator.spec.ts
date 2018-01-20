import Calculator from '../app/calculator';
import {expect} from 'chai';

describe('Calculator', () => {
    let calculator:Calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    describe('add()', () => {

        it('should add two numbers together', () => {
            const result:number = calculator.add(2, 3);
            expect(result).to.equal(5);
        });

    });
});
