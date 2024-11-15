import { validationAdm } from "/api/validationAdm.js"

document.addEventListener("DOMContentLoaded", function() {

    const token = localStorage.getItem("token")

    validationAdm(token).then(id => {
        fetch(`http://localhost:8084/mensagens`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            method: 'GET'
        })
            .then(response => {
                if (response.status === 200) return response.json()
            })
            .then(data => {
                if (data) {
                    showData(data)
                } else {
                    console.log("Nenhum dado encontrado.")
                }
            })
            .catch(error => {
                console.log(error)
            });
    }).catch(error => {
        console.log(error)
    })
    
    
    function showData(data) {
    
        const mainConteiner = document.getElementById("container")
        mainConteiner.innerHTML = ""
    
        data.forEach(message => {
    
            const firstPartConteiner = `
            <div class="form-container">
                <div class="buttonDelete">
                    <button onclick="deleteMessage('${message.id}')" class="btn btn-danger"><i class="fa-solid fa-trash"></i>APAGAR</button>
                </div>
                <h2>Mensagem</h2>

                <hr class="hr" />`
    
            const date = new Date(message.infoActivation.creationDate)
    
            const formattedDate = date.toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            })
    
            const secondPartConteiner = `
                <div class="orderContainer"> 
                    <label class="form-label" for="senderName">Nome do cliente</label>
                    <input type="text" id="senderName" value="${message.senderName}" class="inputClass form-control-lg" disabled>
                    <label class="form-label" for="senderEmail">E-mail do cliente</label>
                    <input type="text" id="senderEmail" value="${message.senderEmail}" class="inputClass form-control-lg" disabled>
                    <label class="form-label" for="text">Mensagem</label>
                    <input type="text" id="text" value="${message.text}" class="inputClass form-control-lg" disabled>
                    <label class="form-label" for="date">Data de envio</label>
                    <input type="text" id="date" value="${formattedDate}" class="inputClass form-control-lg" disabled>
                </div>
            </div>`
    
            mainConteiner.innerHTML += firstPartConteiner + secondPartConteiner
        })
    }
})

