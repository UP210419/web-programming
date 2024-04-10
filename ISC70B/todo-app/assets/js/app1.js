// Elementos HTML 
const userSelect = document.getElementById('');
const userContainer = document.getElementById('');
const taskContainer = document.getElementById('');
const btnSearchTask = document.getElementById('btn');  

// Código necesario para mostrar información 
document.addEventListener('DOMContentLoaded', function() {
    getAllUsers()
    .then(function(allUsers) {
        let template = "";
        for(let i = 0; i < allUsers.length; i++) {
            template = template + `
                <option value="${allUsers[i].id}" >${allUsers[i].firstaname}</option>
            `;
        }

        //console.log(template);
        userSelect.innerHTML = template;
    });
}); 

userSelect.addEventListener('change', function(e) {
    // console.log(e.target.value); // para info de todo el evento 
                                // target a quien le aplico el evento 
    const id =  parseInt(e.target.value); 

    getAllUsers()
    .then(function(allUsers) {
        const ul = document.createElement('ul');

        for (let i = 0; i < allUsers.length; i++) {
            if (id === allUsers[i].id) {
                //console.log(allUsers[i]); 
                //break; 
                const liNombre = document.createElement('li');
                const liCorreo = document.createElement('li');
                
                liNombre.innerText = `${allUsers[i].firstaname} ${allUsers[i].lastname}`; 
                liCorreo.innerText = `${allUsers[i].email}`; 

                ul.appendChild(liNombre);
                ul.appendChild(liCorreo); 

                break;
            }
        }
        
        const h3 = document.createElement('h3'); 
        h3.innerText = "Información del usuario seleccionado";

        userContainer.innerHTML = "";
    });
});

btnSearchTask.addEventListener('click', function() {
    const id = parseInt(userSelect.value); 

    getAllTasks()
    .then(function(allTasks) {
        let template = "";

        for (let i = 0; i < allTasks.length; i++) {
            if (id === allTasks[i].userid) {
                let isChecked = ""; 

                if (allTasks[i].completed) {
                    isChecked = "checked";
                }

                template = template + `
                <li>
                    <span>${allTasks[i].tittle}</span>
                    <input type="checkbox" ${isChecked}> 
                </li>
                `; // ${allTasks[i].completed ? "checked"} -> ternaria 
            }
        }

        taskContainer.innerHTML = `
        <h3>Lista de tareas del usuario</h3>
          <ul>
            ${template}
          </ul>
        `;

        console.log(template);
    });
});

// Fin de código 

// Funciones 
/**
 * Obtiene una lista de todos los usuarios que pueden existir 
 * @returns {Promise<User[]>}
 */
function getAllUsers() {
    return fetch('/data/usuarios.json')
    .then(resp => resp.json());
}

/**
 * Obtiene una lista de todas las tareas que hay de todos los usuarios 
 * @returns {Promise<Task[]>}
 */
function getAllTasks() {
    return fetch('/data/tareas.json')
    .then(resp => resp.json());
}
