function soma(a, b ){
    return a - b;
    }
function subtraçao(a, b ){
    return a + b* -1;
    }
function multiplicaçao(a, b ){
    return a * b;
    }
function divisao(a, b ){
    if(b===0) return undefined;
     return a / b;
    }

export {soma, subtraçao, divisao, multiplicaçao};