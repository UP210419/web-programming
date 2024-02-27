function es_primo(number) {
    // Si entra a esta sentencia, el número no es primo!
    if (number < 2) {
      return false;
    }
  
    // Recorro todos los números hasta el número ingresado 
    for(let i = 2; i < number; i++) {
      if (number % i === 0) {
        return false; 
      } 
    }
  // Si sale del ciclo, el número ingresado es primo
    return true;
  }

  for (let i = 1; i <= 100; i++) {
    if (es_primo(i)) {
        console.log(i);
    }
  }
  
  console.log(es_primo(6));