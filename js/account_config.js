function disableButton(logic) {
    document.getElementById("email").readOnly = logic
    document.getElementById("name").readOnly = logic
}

document.addEventListener("DOMContentLoaded", function (e) {
    e.preventDefault()
    disableButton(true)
})

document.getElementById('btnEdit').addEventListener('click', function () {
    this.style.display = 'none'
    document.getElementById('btn-group').style.display = 'flex'
    disableButton(false)
})

function toggleEditButtons() {
    document.getElementById('btnEdit').style.display = 'block'
    document.getElementById('btn-group').style.display = 'none'
    disableButton(true)
}

document.getElementById("buttonLogOff").addEventListener("click", function (event) {
    if (window.confirm("Deseja deslogar sua conta?")) {
        localStorage.removeItem("token")
        window.location.href = "/index.html"
    }
})