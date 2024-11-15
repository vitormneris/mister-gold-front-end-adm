import { validationAdm } from "/api/validationAdm.js"

const token = localStorage.getItem("token")

validationAdm(token).then(id => {

    document.getElementById("button").addEventListener("click", function(event) {
        event.preventDefault()

        const name = document.getElementById("name").value
        const price = document.getElementById("price").value
        const quantity = document.getElementById("quantity").value
        const description = document.getElementById("description").value

        const categoriesOptions = document.getElementById("categoriesOptions");
        const categoriesSelected = [];
    
        for (const option of categoriesOptions.options) {
            if (option.selected) {
                categoriesSelected.push({"id": option.value});
            }
        }

        const image = document.getElementById("image").files[0]

        const product = new FormData();
    
        product.append("product", new Blob([JSON.stringify({
            "name": name,
            "price": price,
            "quantity": quantity,
            "description": description,
            "categories": categoriesSelected
        })], { type: "application/json" }));
    
        product.append("file", image);

        fetch('http://localhost:8084/produtos/salvar', {
            method: "POST",
            headers: { 
                "Authorization": "Bearer " + token
            },
            body: product
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
}).catch(error => {
    console.log(error)
})