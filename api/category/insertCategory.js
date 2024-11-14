import { validationAdm } from "../validationAdm.js"

const token = localStorage.getItem("token")

validationAdm(token).then(id => {

    document.getElementById("button").addEventListener("click", function(event) {
        event.preventDefault()

        const name = document.getElementById("name").value;
        const description = "desc"// document.getElementById("description").value;

        const image = document.getElementById("image").files[0]

        const category = new FormData();
    
        category.append("category", new Blob([JSON.stringify({
            "name": name,
            "description": description
        })], { type: "application/json" }));
    
        category.append("file", image);

        fetch('http://localhost:8084/categorias/salvar', {
            headers: { 
                "Authorization": "Bearer " + token
            },
            method: "POST",
            body: category
        })
        .then(response => {
            if (response.status === 201) {
                return response.json()
            }
            return null
        })
        .then(data => {
            if (data) {
                showData("Cadastrado com sucesso!", "green")
            } else {
                showData("Problema ao cadastrar!", "red")
            }
        })
        .catch(error => {
            console.log(error)
        })

        function showData(text, cl) {
            const divStatus = document.getElementById("status")

            if (divStatus.querySelector("p")) divStatus.querySelector("p").remove()

            const parag = document.createElement("p")
            parag.textContent = text
            parag.style.color = cl
            parag.style.textAlign = "center"

            divStatus.appendChild(parag)
        }
    })
})