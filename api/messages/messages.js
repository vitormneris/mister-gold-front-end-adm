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
    
                <h2 style="color: black; font-size: 25px; margin: 15px">Nome do cliente: <span id="orderStatus" style="color: blue;  font-size: 23px">${message.senderName}</span></h2>
                <h2 style="color: black; font-size: 25px; margin: 15px">E-mail do cliente: <span id="orderStatus" style="color: blue;  font-size: 23px">${message.senderEmail}</span></h2>
                <h2 style="color: black; font-size: 25px; margin: 15px">Mensagem: <span id="totalPrice"  style="color: blue; font-size: 23px">${message.text}</span></h2>
                <h2 style="color: black; font-size: 25px; margin: 15px">Data de envio: <span id="moment" style="color: blue;  font-size: 23px">${formattedDate}</span></h2>
                
               <button onclick="deleteMessage('${message.id}')" class="fa-solid fa-trash"">APAGAR</button>
            </div>`
    
            mainConteiner.innerHTML += firstPartConteiner + secondPartConteiner
        })
    }
})

