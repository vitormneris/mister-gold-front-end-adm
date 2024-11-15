const eyeSpan = document.getElementById("eyeSpan")

eyeSpan.addEventListener("click", function (e) {
    e.preventDefault()

    const yey = document.getElementById("eye")
    const inputPassword = document.getElementById("password")

    if (yey.className === 'far fa-eye') {
        yey.className = 'far fa-eye-slash'
        inputPassword.type = 'password'
    }
    else if (yey.className === 'far fa-eye-slash') {
        yey.className = 'far fa-eye'
        inputPassword.type = 'text'
    }
})

