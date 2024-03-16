// Elementos HTML
const userSelect = document.getElementById('select-users');
const userContainer = document.getElementById('user-container');
const taskContainer = document.getElementById('task-container');
const tasksBtn = document.getElementById('show-tasks-btn');

// Función que muestra información seleccionado 
function UserInfo(user) {
  userContainer.innerHTML = `
    <h3>Información del usuario seleccionado</h3>
    <ul>
      <li>Nombre completo: ${user.firstname} ${user.lastname}</li>
      <li>Email: ${user.email}</li>
    </ul>
  `;
}

// Función que muestra tareas de usuario selccionado 
function TasksUser(tasksuser) {
  taskContainer.innerHTML = `
    <h3>Lista de tareas del usuario</h3>
    <ul>
      ${tasksuser.map(task => `
        <li>
          <span>${task.title}</span>
          <input type="checkbox" ${task.completed ? 'checked' : ''}>
        </li>  
      `).join('')}
    </ul>
  `; 
}

// Cargar el archivo JSON con información de usuarios 
fetch('/data/usuarios.json')
.then(resp => {
  if (!resp.ok) {
    throw new Error('No se cargo el archivo de usuarios'); 
  }
  return resp.json();
})
.then(usuarios => {
  // Añade un Event Listener al elemento select para mostrar información de usuario seleccionado 
  userSelect.addEventListener('change', function() {
    // Obtiene ID usuario seleccionado 
    const IDuser = parseInt(userSelect.value); 

    // Encuentra usuario en el arreglo de usuarios 
    const user = usuarios.find(user => user.id === IDuser); 

    // Muestra información usuario seleccionado
    UserInfo(user);
  }); 

  // Cargar el archivo JSON con información de tareas
  return fetch('/data/tareas.json');
})
.then(resp => {
  if (!resp.ok) {
    throw new Error('No se cargo el archivo de tareas');
  }
  return resp.json();
})
.then(tareas => {
  // Añadir un event listener al botón para mostrar las tareas del usuario seleccionado
  tasksBtn.addEventListener('click', function() {
    // Obtener el ID usuario seleccionado
    const IDuser = parseInt(userSelect.value);

    // Filtrar tareas para obtener solo las del usuario seleccionado
    const tasksuser = tareas.filter(task => task.IDuser === IDuser);

    // Mostrar tareas de usuario seleccionado
    TasksUser(tasksuser);
  });
})
.catch(error => {
  console.error('Error al cargar los archivos JSON:', error);
});
