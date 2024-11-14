const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

fetch('http://localhost:8084/categorias/' + productId + '/id', {
    headers: {
        "Content-Type": "application/json"
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

    const tdImageUrl = document.getElementById("selectedImage")
    tdImageUrl.src = data.imageUrl

    // const tdDetails = document.getElementById("description")
    // tdDetails.value = data.description
    // tdDetails.focus()
}
