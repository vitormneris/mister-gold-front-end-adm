document.getElementById("button").addEventListener("click", function(event) {
    event.preventDefault()

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const phone = document.getElementById("phone").value
    const state = document.getElementById("state").value
    const city = document.getElementById("city").value
    const neighborhood = document.getElementById("neighborhood").value
    const street = document.getElementById("street").value
    const postalCode = document.getElementById("postalCode").value
    const number = document.getElementById("number").value
    const complement = document.getElementById("complement").value


    client = {
        "name": name,
        "email": email,
        "password": password,
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

    console.log(client)

    fetch('http://localhost:8084/clientes/salvar', {
        method: "POST",
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(client)
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