import { validationClient } from "../validationClient.js"

const token = localStorage.getItem("token")

validationClient(token).then(id => {

    document.getElementById("buttonUpdate").addEventListener("click", function(event) {
        event.preventDefault()

        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const phone = document.getElementById("phone").value
        const state = document.getElementById("state").value
        const city = document.getElementById("city").value
        const neighborhood = document.getElementById("neighborhood").value
        const street = document.getElementById("street").value
        const postalCode = document.getElementById("postalCode").value
        const number = document.getElementById("number").value
        const complement = document.getElementById("complement").value

        let client = {
            "name": name,
            "email": email,
            "password": "no_password",       
            "phone": phone,
            "address": {
                "state": state,
                "city": city,
                "neighborhood": neighborhood,
                "street": street,
                "postalCode": postalCode,
                "number": number,
                "complement": complement
            }
        }

        fetch('http://localhost:8084/clientes/' + id + '/atualizar', {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            method: "PUT",
            body: JSON.stringify(client)
        })
        .then(response => {
            return [ response.json(), response.status ]
        })
        .then(data => {        
    
            if (data[1] == 200) {
                showData("Atualizado com sucesso!", "green")
            } if (data[1] == 403) {
                showData("Não autorizado", "red")
            } else {
                data[0].then(error => {
                    console.log(error)
                    let name_fields = []
                    error.fields.forEach(field => {
                        name_fields.push(" " +field.description)
                    });

                    showData(error.message +  name_fields + ".", "red")

                })
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

}).catch(error => {
    console.log(error)
})