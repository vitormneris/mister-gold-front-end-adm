
document.addEventListener("DOMContentLoaded", function () {

    fetch('http://localhost:8084/categorias?page=0&pageSize=10&isActive=true', {
        method: "GET"
    }).then(
        response => {
            if (response.status === 200) {
                return response.json()
            }
        }).then(data => {
            showData(data)
        }).catch(error => {
            console.log(error)
        })

    function showData(data) {
        const divConteiner = document.getElementById("categoriesOptions")

        data.content.forEach(contents => {

            const cardCategories = `<option value="${contents.id}">${contents.name}</option>`

            divConteiner.innerHTML += cardCategories
        })
    }
})