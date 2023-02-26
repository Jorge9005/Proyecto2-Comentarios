document.addEventListener("DOMContentLoaded", function(){
    const saveBtn = document.getElementById("saveBtn");
    const inputUserName = document.getElementById("inputUserName");
    const inputDescription = document.getElementById("inputDescription");
    const tableBody = document.getElementById("tableBody");

    function loadData(){
        tableBody.innerHTML = `
        <tr id="noData">
            <td colspan="4" class="text-center">No hay datos</td>
        </tr>
        `;
        const data = JSON.parse(localStorage.getItem("data")) || [];
        if (data.length){
            document.getElementById("noData").remove();
        }
        data.forEach((item, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.username}</td>
            <td>${item.description}</td>
            <td class="text-center">
                <button type="button" class="btn btn-warning btn-edit" data-index="${index}">Editar</button>
                <button type="button" class="btn btn-danger btn-delete" data-index="${index}">Eliminar</button>
            </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    function clearForm(){
        inputUserName.value = "";
        inputDescription.value = "";
    }

    saveBtn.addEventListener("click", () => {
        const username = inputUserName.value; //obtiene el valor que se encuentra en el HTML
        const description = inputDescription.value;
        console.log(username);
        console.log(description);
        if (!username){
            return;
        }

        const data = JSON.parse(localStorage.getItem("data")) || [];
        const index = saveBtn.getAttribute("data-index");
        console.log(index, "index");
        if (index) {
            data[index] = {username, description};
            saveBtn.removeAttribute("data-index");
            saveBtn.textContent = "Guardar";
        } else {
            data.push({
                username: username,
                description: description
            });
        }
        localStorage.setItem("data", JSON.stringify(data));
        loadData();
        clearForm();
    });

    tableBody.addEventListener("click", function (e) {
        console.log(e.target.classList);
        if (e.target.classList.contains("btn-edit")) {
            const index = e.target.dataset.index;
            const data = JSON.parse(localStorage.getItem("data")) || [];
            const item = data[index];
            inputUserName.value = item.username;
            inputDescription.value = item.description;
            saveBtn.textContent = "Actualizar";
            saveBtn.setAttribute("data-index", index);
        } else if (e.target.classList.contains("btn-delete"))
        {
            const index = e.target.dataset.index;
            const data = JSON.parse(localStorage.getItem("data")) || [];
            data.splice(index, 1);
            localStorage.setItem("data", JSON.stringify(data));
            loadData();
        }
    });
    loadData();
});