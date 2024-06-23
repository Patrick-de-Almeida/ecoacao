document.getElementById("formAdmin").onsubmit = function (event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var userList = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
    userList.push({ username, email, date: new Date().toLocaleString() });
    localStorage.setItem("users", JSON.stringify(userList));
    displayUsers();
    document.getElementById("formAdmin").reset();
};

function displayUsers() {
    var users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
    var userListHtml = users
        .map(
            (user, index) =>
                `<li class="user-item">${user.date} - ${user.username}, ${user.email}
       <button onclick="deleteUser(${index})" class="delete-btn">Excluir</button>
      </li>`
        )
        .join("");
    document.getElementById("userList").innerHTML = userListHtml;
}

function deleteUser(index) {
    var users = JSON.parse(localStorage.getItem("users"));
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    displayUsers();
}

function filterUsers() {
    var searchInput = document.getElementById("searchUser").value.toLowerCase();
    var users = JSON.parse(localStorage.getItem("users"));
    var filteredUsers = users.filter(
        (user) => user.username.toLowerCase().includes(searchInput) || user.email.toLowerCase().includes(searchInput)
    );
    var userListHtml = filteredUsers
        .map(
            (user, index) =>
                `<li class="user-item">${user.date} - ${user.username}, ${user.email}
       <button onclick="deleteUser(${index})" class="delete-btn">Excluir</button>
      </li>`
        )
        .join("");
    document.getElementById("userList").innerHTML = userListHtml;
}

function clearUsers() {
    localStorage.removeItem("users");
    displayUsers();
}

function clearForm() {
    document.getElementById("formAdmin").reset();
}

window.onload = displayUsers;
