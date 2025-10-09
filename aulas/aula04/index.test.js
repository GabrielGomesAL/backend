import {soma, subraçao, multiplicaçao, divisao} from ".index.js";

if (soma(2, 2)===4) console.log("Passou 1º!")
    else console.log("falhou 1°")
if (soma(-1, 2) === 1) console.log("Passou 2°!")
    else console.log ("falhou 2°")
if (soma(2,0) ===2) console.log("Passou 3°!")
    else console.log ("falhou 3°")

console.log ("Teste da funçao subtraçao()");

if (subtraçao(2, 2)===4) console.log("Passou 4º!")
    else console.log("falhou 4°")
if (subtraçao(-1, 2) === 1) console.log("Passou 5°!")
    else console.log ("falhou 5°")
if (subtraçao(2,0) ===2) console.log("Passou 6°!")
    else console.log ("falhou 6°")

console.log("Teste da funçao multiplicaçao()")

if (multiplicaçao(2, 2)===4) console.log("Passou 7º!")
    else console.log("falhou 7°")
if (multiplicaçao(-1, 2) === 1) console.log("Passou 8°!")
    else console.log ("falhou 8°")
if (multiplicaçao(2,0) ===2) console.log("Passou 9°!")
    else console.log ("falhou 9°")

console.log("Teste da funçao divisao()")

if (divisao(2, 2) === 2) console.log("Passou 10º!")
    else console.log("falhou 10°")
if (divisao(-1, 2) === -2) console.log("Passou 11°!")
    else console.log ("falhou 11°")
if (divisao(2,0) === undefined) console.log("Passou 12°!")
    else console.log ("falhou 12°")

