import { validationAdm } from "/api/validationAdm.js"

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
    
            fetch('http://3.15.223.242:8081/administradores/salvar', {
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                method: "POST",
                body: JSON.stringify(administrator)
            })
            .then(response => {
                return [response.json(), response.status]
            })
            .then(data => {
                if (data[1] == 201) {
                    showData("Criado com sucesso!", "green")
                } if (data[1] == 403) {
                    showData("Não autorizado", "red")
                } else {
                    data[0].then(error => {
                        console.log(error)
                        let name_fields = []
                        error.fields.forEach(field => {
                            name_fields.push(" " + field.description)
                        });

                        showData(error.message + name_fields + ".", "red")

                    })
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