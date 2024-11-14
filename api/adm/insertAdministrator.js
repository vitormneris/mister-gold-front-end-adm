import { validationAdm } from "../validationAdm.js"

const token = localStorage.getItem("token")

validationAdm(token).then(id => {

    document.getElementById("button").addEventListener("click", function(event) {
        event.preventDefault()

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password_first = document.getElementById("password_first").value;
        const password_second = document.getElementById("password_second").value;

        let administrator = {
            "name": name,
            "email": email,
            "password": password_first
        }

        if (password_first == password_second) {
    
            fetch('http://localhost:8084/administradores/salvar', {
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                method: "POST",
                body: JSON.stringify(administrator)
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
        } else showData("As senhas digitadas não são iguais", "red")

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

}).catch(error => {
    console.log(error)
})