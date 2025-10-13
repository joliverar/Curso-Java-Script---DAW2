function fibonacci(n) {
  let serie = [];
  let a = 0, b = 1;

  for (let i = 0; i < n; i++) {
    serie[i] = a;
    let temp = a + b;
    a = b;
    b = temp;
  }
  return serie;
}

console.log(fibonacci(10));
