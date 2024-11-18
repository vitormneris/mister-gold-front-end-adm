import { validationAdm } from "/api/validationAdm.js";

export function updateOrderStatus(orderId, newStatus, token) {
    token = localStorage.getItem("token")
   let orderUpdate = {
        "orderStatus": newStatus,
        "client": {
            "id": ""
        },
        "items": [
            {
                "quantity": 0,
                "product": {
                    "id": ""
                }
            }
        ]
    }
    validationAdm(token)
        .then(id => {
            fetch("http://3.15.223.242:8081/pedidos/" + orderId + "/atualizar", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                method: "PUT",
                body: JSON.stringify(orderUpdate)
            })
                .then(response => {
                    if (response.ok) {
                        console.log("Status atualizado com sucesso!");
                        alert("Status atualizado com sucesso!");
                        window.location.reload()
                    } else {
                        console.error("Falha ao atualizar o status.");
                        alert("Erro ao atualizar o status.");
                    }
                })
                .catch(error => console.error("Erro:", error));
        })
        .catch(error => console.error("Erro na validação:", error));
}
