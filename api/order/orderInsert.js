import { validationClient } from "../validationClient.js"

const token = localStorage.getItem("token")

validationClient(token).then(id => {
    document.getElementById("button").addEventListener("click", function(event) {
        event.preventDefault()
        let cart = JSON.parse(localStorage.getItem("cart"))

        let items = []
        cart.forEach(element => {
            items.push(
                {
                    "quantity": element.quantity,
                    "product": {
                        "id": element.id
                    }
                })
            element
        });

        let order = {
            "client": {
                "id": id
            }, 
            "items": items
        }

        console.log(order)

        fetch('http://localhost:8084/pedidos/salvar', {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(order)
        })
        .then(response => {
            if (response.status === 201) {
                return response.json()
            }
            return null
        })
        .then(data => {
            if (data) {
                showData("Pedido realizado com sucesso!", "green")
            } else {
                showData("Problemas ao realizar pedido!", "red")
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