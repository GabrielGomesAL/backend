const calculadora = require('../src/index.js');

describe("Função soma", () => {
    test("operações de soma", () => {
        expect(calculadora.soma).toBeDefined();
        expect(calculadora.soma(2, 2)).toBe(4);
        expect(calculadora.soma(2, 0)).toBe(2);
        expect(calculadora.soma(-2, -2)).toBe(-4);
    });
});

describe("Função subtração", () => {
    test("operações de subtração", () => {
        expect(calculadora.subtracao).toBeDefined();
        expect(calculadora.subtracao(2, 1)).toBeGreaterThanOrEqual(0);
        expect(calculadora.subtracao(2, 2)).toBeGreaterThanOrEqual(0);
        expect(calculadora.subtracao(2, -2)).toBeGreaterThanOrEqual(0);
        expect(calculadora.subtracao(-2, -4)).toBeGreaterThanOrEqual(0);
        expect(calculadora.subtracao(1, 2)).toBeLessThan(0);
        expect(calculadora.subtracao(-2, -1)).toBeLessThan(0);
        expect(calculadora.subtracao(-2, 1)).toBeLessThan(0);
    });
});

describe("Função multiplicação", () => {
    test("resultado positivo quando sinais iguais e zero", () => {
        expect(calculadora.multiplicacao).toBeDefined();
        expect(calculadora.multiplicacao(2, 2)).toBeGreaterThanOrEqual(0);
        expect(calculadora.multiplicacao(-2, -2)).toBeGreaterThanOrEqual(0);
        expect(calculadora.multiplicacao(5, 0)).toBeCloseTo(0);
        expect(calculadora.multiplicacao(0, 100)).toBeCloseTo(0);
        expect(calculadora.multiplicacao(-3, 0)).toBeCloseTo(0);
    });

    test("resultado negativo quando sinais diferentes", () => {
        expect(calculadora.multiplicacao(-2, 3)).toBeLessThan(0);
        expect(calculadora.multiplicacao(4, -5)).toBeLessThan(0);
    });
});

test("se b = 0 entao Divisao por ZERO", ()=>{
    expect(calculadora.divisao).toBeDefined();
    expect(()=> calculadora.divisao(2, 0))
    .toThrow("Divisao por ZERO");
})
