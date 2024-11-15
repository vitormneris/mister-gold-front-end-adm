const eyeSpan1 = document.getElementById("eyeSpan1")

eyeSpan1.addEventListener("click", function (e) {
    e.preventDefault()

    const yey = document.getElementById("eye1")
    const inputPassword = document.getElementById("password_first")
    
    if (yey.className === 'far fa-eye') {
        yey.className = 'far fa-eye-slash'
        inputPassword.type = 'password'
    }
    else if (yey.className === 'far fa-eye-slash') {
        yey.className = 'far fa-eye'
        inputPassword.type = 'text'
    }
})

const eyeSpan2 = document.getElementById("eyeSpan2")

eyeSpan2.addEventListener("click", function (e) {
    e.preventDefault()

    const yey = document.getElementById("eye2")
    const inputPassword = document.getElementById("password_second")
    
    if (yey.className === 'far fa-eye') {
        yey.className = 'far fa-eye-slash'
        inputPassword.type = 'password'
    }
    else if (yey.className === 'far fa-eye-slash') {
        yey.className = 'far fa-eye'
        inputPassword.type = 'text'
    }
})