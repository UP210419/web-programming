import { getAllTasks, getAllUsers } from './petitions.js';

const listUsers = document.getElementById('users');
const tasksTable = document.getElementById('tasks');
const taskSelect = document.getElementById('listTasks');
const formTask = document.getElementById('form-task');
let isUpdatingTask = false;
let selectedID;
const btnUP = formTask.children[3];

document.addEventListener('DOMContentLoaded', async () => {
    const users = await getAllUsers();
    const tasks = await getAllTasks();

    listUsers.innerHTML = users.map(user => `<option value="${user.id}">${user.fullname}</option>`).join('');

    let templateTasks = tasks.map(task => `
        <tr>
            <td>${task.iduser}</td>
            <td>${task.name}</td>
            <td>${task.idtask}</td>
            <td>${task.title}</td> 
            <td></td>
            <td>
                <button class="update btn btn-secondary btn-sm" value="${task.idtask}">
                    <span>Update</span> <i class="nf nf-md-pencil"></i>
                </button>
                <button class="delete btn btn-danger btn-sm" value="${task.idtask}">
                    <span>Delete</span> <i class="nf nf-cod-trash"></i>
                </button>
            </td>
        </tr>     
    `).join('');

    taskSelect.innerHTML = tasks.map(task => `<option value="${task.idtask}">${task.idtask}</option>`).join('');
    tasksTable.innerHTML = templateTasks;

    taskSelect.addEventListener('change', async function() {
        const selectedValue = this.value;
        const answer = await fetch(`api/getTask.php?selectedTaskId=${selectedValue}`);
        const data = await answer.json();
        templateTasks = '';
        for (const task of data) {
            templateTasks += `
                <tr>
                    <td>${task.iduser}</td>
                    <td>${task.name}</td>
                    <td>${task.idtask}</td>
                    <td>${task.title}</td> 
                    <td></td>
                    <td>
                        <button class="update btn btn-secondary btn-sm" value="${task.idtask}">
                            <span>Update</span> <i class="nf nf-md-pencil"></i>
                        </button>
                        <button class="delete btn btn-danger btn-sm" value="${task.idtask}">
                            <span>Delete</span> <i class="nf nf-cod-trash"></i>
                        </button>
                    </td>
                </tr>     
            `;
        }
        tasksTable.innerHTML = templateTasks;
    });

    document.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete')) {
            const taskId = event.target.value;
            const formData = new FormData();
            formData.append('taskId', taskId);
            await fetch('api/deleteTask.php', {
                method: 'POST',
                body: formData
            });
        }
    });

    formTask.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(formTask);
        const title = formData.get('title');
        const userId = formData.get('users');
        if (!isUpdatingTask) {
            await fetch('api/createTask.php', {
                method: 'POST',
                body: formData
            });
        } else {
            const id = selectedID;
            formData.append('id', id);
            await fetch(`api/updateTask.php?id=${id}`, {
                method: 'POST',
                body: formData
            });
        }
    });

    document.addEventListener('click', async (event) => {
        if (event.target.classList.contains('update')) {
            const idTask = event.target.value;
            selectedID = idTask;
            const infoTask = await fetch(`api/getTask.php?selectedTaskId=${selectedID}`);
            const data = await infoTask.json();
            formTask.children[0].children[0].value = data[0].title;
            formTask.children[1].children[0].value = data[0].iduser;
            btnUP.innerText = "UPDATE";
            isUpdatingTask = true;
        }
    });

});
