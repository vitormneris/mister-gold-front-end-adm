const urlParams = new URLSearchParams(window.location.search);
const categoryId = urlParams.get('id');

fetch('http://localhost:8084/categorias/' + categoryId + "/id", {
    headers: {
        "Content-Type": "application/json"
    },
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
    const divConteiner = document.getElementById("containerProducts")

    data.products.forEach(contents => {

        const cardProducts = `
                    <div class="col-lg-4 col-md-12 mb-6 mb-lg-3">
                        <div class="card">

                            <div onclick="redirectToProductPage('${contents.id}')" class="bg-image hover-overlay" data-mdb-ripple-init data-mdb-ripple-color="light">
                                <img src="${contents.imageUrl}" class="img-fluid"> 
                            </div>

                            <div class="card-body">

                                <h5 class="card-title">${contents.name}</h5>

                                <div class="category_line_alt"></div>

                                <p class="card-text product-price-cash"> R$ ${contents.price.toFixed(2)} à vista </p>

                                <p class="card-text product-price-card"> 10 x R$ ${(contents.price / 10).toFixed(2)} no cartão </p>

                                <a href="#!" class="btn btn-primary" onclick="addToCart('${contents.id}', '${contents.name}', '${contents.price}', '${contents.imageUrl}')"><i class="fa-solid fa-cart-shopping"></i>+</a>

                            </div>
                        </div>
                    </div>`

        divConteiner.innerHTML += cardProducts
    })

    const title = document.getElementById("title")
    const sp = document.createElement("span")
    sp.style.color = "#facc15"
    sp.innerText += " " + data.name

    title.appendChild(sp)
}

function addToCart(id, name, price, imageUrl) {
    const product = {
        id: id,
        name: name,
        price: parseFloat(price),
        imageUrl: imageUrl,
        quantity: 1 // sempre será 1 inicialmente
    };

    // Verifica se já existe algum produto no carrinho
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Adiciona o produto ao carrinho
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Produto adicionado ao carrinho!");
}
