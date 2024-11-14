import { validationAdm } from "../validationAdm.js"

const token = localStorage.getItem("token")

document.getElementById("buttonDelete").addEventListener("click", function(event) {
    event.preventDefault()

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    validationAdm(token).then(id => {
    
        if (window.confirm("Você deseja deletar este produto?")) {

            fetch('http://localhost:8084/produtos/' + productId + '/deletar', {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + token
                },
            })
            .then(response => {
                if (response.ok) window.location.href = "/html/adm/list_product.html"
                 else showData("Erro ao tentar deletar este produto!", "red")
            })
            .catch(error => {
                console.log(error)
            });
        
        
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

