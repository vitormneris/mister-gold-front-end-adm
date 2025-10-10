import { validationAdm } from "/api/validationAdm.js"

const token = localStorage.getItem("token")


document.getElementById("buttonDelete").addEventListener("click", function() {
    validationAdm(token).then(id => {

        if (window.confirm("Você deseja deletar esta conta de administrador?")) {

            fetch('http://localhost:8081/administradores/' + id + '/deletar', {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + token
                },
            })
            .then(response => {
                if (response.ok) return [null, response.status]
                return [response.json(), response.status]
            })
            .then(data => {

                if (data[1] == 204) {
                    window.location.href = "/index.html"
                } if (data[1] == 403) {
                    showData("Não autorizado", "red")
                } else {
                    data[0].then(error => {
                        console.log(error)
                        showData(error.message + ".", "red")
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
        }
    }).catch(error => {
        console.log(error)
    })
}) 
