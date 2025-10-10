import { validationAdm } from "/api/validationAdm.js"

const token = localStorage.getItem("token")

validationAdm(token).then(id => {

    document.getElementById("buttonUpdate").addEventListener("click", function(event) {
        event.preventDefault()

        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;
        const image = document.getElementById("image").files[0]

        const category = new FormData();
    
        category.append("category", new Blob([JSON.stringify({
            "name": name,
            "description": description
        })], { type: "application/json" }));
    
        category.append("file", image);
 
        const urlParams = new URLSearchParams(window.location.search);
        const categoryId = urlParams.get('id');

        fetch('http://localhost:8081/categorias/' + categoryId + '/atualizar', {
            headers: { 
                "Authorization": "Bearer " + token
            },
            method: "PUT",
            body: category
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
