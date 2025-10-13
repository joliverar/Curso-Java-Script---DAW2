function estaEquilibrada(exp) {
  let pila = [];
  for (let i = 0; i < exp.length; i++) {
    let c = exp[i];
    if (c === '(' || c === '[' || c === '{') pila.push(c);
    if (c === ')' || c === ']' || c === '}') {
      if (pila.length === 0) return false;
      let ult = pila.pop();
      if ((c === ')' && ult !== '(') ||
          (c === ']' && ult !== '[') ||
          (c === '}' && ult !== '{')) return false;
    }
  }
  return pila.length === 0;
}

console.log(estaEquilibrada("{[a*(c+d)]-5}")); // true
