document.getElementById("button").addEventListener("click", function(event) {
    event.preventDefault()

    const login = document.getElementById("email").value
    const password = document.getElementById("password").value

    userAuth = {
        "email": login,
        "password": password
    }

    fetch('http://3.138.179.81:8081/autorizacao/login', {
        method: "POST",
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userAuth)
    })
    .then(response => {
        return [ response.json(), response.status ]
    })
    .then(data => {        

        if (data[1] == 200) {
            data[0].then(json => localStorage.setItem("token", json.token))
            window.location.href = "/html/home.html"
        } if (data[1] == 403) {
            showData("Senha inválida", "red")
        } else {
            data[0].then(error => showData(error.message, "red"))
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