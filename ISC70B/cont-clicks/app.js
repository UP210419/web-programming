let containerClicks = document.getElementById('container-clicks');
let btnIncrement = document.querySelector('.btn-primary'); // query selector -> por etiqueta 
let btnDecrement = document.querySelector('.btn-secondary');
let btnReset = document.querySelector('.btn-reset');
let count = 0; 

document.addEventListener('DOMContentLoaded', function() {
    containerClicks.innerText = count;

    // escuchador de eventos
    btnIncrement.addEventListener("click", function() { 
        count = count + 1; // count += 1 o count++
        containerClicks.innerText = count;
    });
    
    btnDecrement.onclick = function() {
        /*
        count--;
        containerClicks.innerText = count;
        */
       if (count > 0) {
        count--;
        containerClicks.innerText = count;
       } else {
        alert("El contador es 0");
       }
    }
    
    btnReset.onclick = function() {
        count = 0;
        containerClicks.innerText = count;
    }  
});

//console.log(btnIncrement);


