console.log("This is working!!!");

function sum(a, b) {
    return a + b; 
}

function suma2numeros(callback) {
    const resultadoSuma = sum(1,2);

    // Realice anteriormente varias cosas más!!! ...

    callback(resultadoSuma);
}

// calback - llama valor de func
function algo(valor) {
    console.log(valor);
}

suma2numeros(algo);

const button = document.getElementById('btn');
const container = document.getElementById('container');

button.addEventListener('click', function() {
    getUsers()
    .then(function(json) {
        const ul = document.createElement('ul');

        for(let i = 0; i < json.usuarios.length; i++) {
            const li = document.createElement('li');

            li.innerText = json.usuarios[i].name;

            ul.appendChild(li);
        }

        container.appendChild(ul);
        console.log(json.usuarios);
    });
});

function getUsers() {
    fetch("http://127.0.0.1:5500/ISC70B/test-callback/info.json")
    .then(function(response) {
        //console.log(response);
        return response.json();
    });
}


