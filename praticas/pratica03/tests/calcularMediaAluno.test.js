const { calcularMediaAluno } = require('../src/calcularMediaAluno');

test('A função calcularMediaAluno deve existir', () => {
    expect(calcularMediaAluno).toBeDefined();
});

test('Deve lançar erro se a1 ou a2 nao forem informadas', () => {
    expect(() => calcularMediaAluno(undefined, 5))
        .toThrow('Notas a1 ou a2 nao informadas');
    expect(() => calcularMediaAluno(5, undefined))
        .toThrow('Notas a1 ou a2 nao informadas');
});

test('Se a1 ou a2 forem negativos retorna erro', () => {
    expect(() => calcularMediaAluno(-3, 5))
        .toThrow('As notas nao podem ser negativas');
    expect(() => calcularMediaAluno(5, -1))
        .toThrow('As notas nao podem ser negativas');
});

test('Se a3 for negativa retorna erro', () => {
    expect(() => calcularMediaAluno(5, 7, -2))
        .toThrow('Nota a3 nao pode ser negativa');
});

test('Se a3 nao for informado, calcular a media de a1 e a2', () => {
    expect(calcularMediaAluno(5, 7)).toBeCloseTo(5*0.4 + 7*0.6);
});

test('Se a3 for informada, melhor combinação é a1 + a3', () => {
    expect(calcularMediaAluno(5, 4, 8)).toBeCloseTo(5*0.4 + 8*0.6);
});

test('Se a3 for informada, melhor combinação é a3 + a2', () => {
    expect(calcularMediaAluno(4, 5, 7)).toBeCloseTo(7*0.4 + 5*0.6); 
});

test('Se a3 for informada, melhor combinação é a1 + a2', () => {
    expect(calcularMediaAluno(9, 10, 5)).toBeCloseTo(9*0.4 + 10*0.6);
});
