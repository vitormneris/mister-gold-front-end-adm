import { validationAdm } from "/api/validationAdm.js"

const token = localStorage.getItem("token")

validationAdm(token).then(id => {
    fetch('http://3.138.179.81:8081/administradores/' + id + '/id', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        method: 'GET'
    })
    .then(response => {
        if (response.ok) {
            return response.json()
        }
    })
    .then(data => {
        showData(data)
    })
    .catch(error => {
        console.log(error)
    });


    function showData(data) {
        const tdName = document.getElementById("name")
        tdName.value = data.name
        tdName.focus()

        const tdEmail = document.getElementById("email")
        tdEmail.value = data.email
        tdEmail.focus()

        const buttonDelete = document.getElementById("buttonDelete")
        buttonDelete.value = data.id
    }
})