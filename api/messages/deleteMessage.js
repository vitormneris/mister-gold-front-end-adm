async function deleteMessage(data) {
    const token = localStorage.getItem("token");
    const messageId = data

    if (messageId != null) {

        if (window.confirm("Você deseja deletar esta mensagem?")) {
            fetch('http://localhost:8084/mensagens/' + messageId + '/deletar', {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + token,
                },
            })
            .then(response => {
                if (response.ok) {
                    window.location.href = "/html/messages.html";
                } else {
                    showDataDelete("Erro ao tentar deletar esta mensagem!", "red");
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
}

function showDataDelete(text, color) {
    const divStatus = document.getElementById("status");

    if (divStatus.querySelector("p")) divStatus.querySelector("p").remove();

    const parag = document.createElement("p");
    parag.textContent = text;
    parag.style.color = color;
    parag.style.textAlign = "center";

    divStatus.appendChild(parag);
}