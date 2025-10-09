function calcularMediaAluno(a1, a2, a3) {
    if (a1 === undefined || a2 === undefined) {
        throw new Error('Notas a1 ou a2 nao informadas');
    }

    if (a1 < 0 || a2 < 0) {
        throw new Error('As notas nao podem ser negativas');
    }

    if (a3 !== undefined && a3 < 0) {
        throw new Error('Nota a3 nao pode ser negativa');
    }

    if (a3 === undefined) {
        return a1 * 0.4 + a2 * 0.6;
    }

    const media1 = a1 * 0.4 + a2 * 0.6;
    const media2 = a1 * 0.4 + a3 * 0.6;
    const media3 = a3 * 0.4 + a2 * 0.6;

    return Math.max(media1, media2, media3);
}

module.exports = { calcularMediaAluno };
