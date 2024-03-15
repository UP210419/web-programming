const btn = document.getElementById('btn');
const container = document.getElementById('container-users');

btn.addEventListener('click', function() {
    container.innerHTML = "";

    getUsers(function(users) {
        const ul = document.createElement('ul');
        
        for(let i = 0; i < users.length; i++) {
            const li = document.createElement('li');
            const btnli = document.createElement('button');
            
            btnli.innerText = "Get User Info";
            li.innerText = users[i].name;
            li.appendChild(btnli); 

            ul.appendChild(li);

            btnli.addEventListener('click', function() {
                const id = users[i].id;

                getInfo(id, function(info) {
                    const ol = document.createElement('ol');
                    ol.innerHTML = `
                    <li> ${info.fullname} </li>
                    <li> ${info.birthday} </li>
                    `;

                    li.appendChild(ol);
                });
            });
        }
        //console.log(ul.innerHTML);
        container.appendChild(ul);
        //container.innerHTML = ul.innerHTML;
    });
});

function getUsers(callback) {
    const time = (Math.floor(Math.random() * 5) + 1) * 1000
    
    setTimeout(function() {
        const users = [
            { id: 1, name: "Sofia", years: 21},
            { id: 2, name: "Saul", years: 30}
        ];
        callback(users);

    }, time);
}

function getInfo(id, callback) {
    const time = (Math.floor(Math.random() * 5) + 1) * 1000
    
    setTimeout(function() {
        const userInfo = [
            { id: 1, idUser: 2, fullname: "Juan Pérez", birthday: "1987-02-10"},
            { id: 2, idUser: 1, fullname: "Sofia Orozco", birthday: "2003-01-28"}
        ];
        const userfindInfo = userInfo.find(function(user) {
            return user.idUser === id;
        })

        callback(userfindInfo);

    }, time);
}