import { validationAdm } from "/api/validationAdm.js"

const token = localStorage.getItem("token")

document.addEventListener("DOMContentLoaded", function (e) {
    let currentPage = 0
    const pageSize = 3

    fetchData()

    document.querySelector(".pagination").addEventListener("click", handlePaginationClick)

    function fetchData() {

        validationAdm(token).then(id => {
            fetch(`http://localhost:8084/pedidos?page=${currentPage}&pageSize=${pageSize}&isActive=true`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                method: 'GET'
            })
                .then(response => {
                    if (response.status === 200) return response.json();
                })
                .then(data => {
                    if (data && data.content) {
                        showData(data);
                        updatePagination(data.totalPages || 1)
                    } else {
                        console.log("Nenhum dado encontrado.")
                    }
                })
                .catch(error => {
                    console.log(error)
                });
        }).catch(error => {
            console.log(error)
        })
    }

    function showData(data) {
        let count = 0
        const mainConteiner = document.getElementById("container")
        mainConteiner.innerHTML = ""; // Limpa os dados anteriores

        data.content.forEach(order => {
            count++


            const divConteiner = document.createElement("div")

            order.items.forEach(item => {
                const itemHTML = `
                    <div class="item-container">
                        <div class="left">
                            <div class="item-img"><img src="${item.product.imageUrl}" class="item-img" style="width: 100px; height:100px"></div>
                            <div class="item-name"><h3>${item.product.name}</h3></div>
                        </div>
                        <div class="item-quantity">
                            <label for="item-quantity">Quantidade:</label>
                            <span id="quantity" class="item-quantity")">${item.quantity}</span>
                        </div>
                        <div class="item-price">
                            <label for="item-price">Valor unitário:</label>
                            <h3>R$ ${item.price.toFixed(2)}</h3>
                        </div>
                    </div>
                </div>`
                divConteiner.innerHTML += itemHTML;
            })

            const firstPartConteiner = `
        <div class="form-container">
            <h2>Pedido ${count}</h2>
            <hr class="hr" />
            <h3 class="confirmTxt">Por favor, confirme os itens de seu pedido antes de concluir a compra:</h3>
            <hr class="hr" />`

            const date = new Date(order.moment)

            const formattedDate = date.toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            })

            const secondPartConteiner = `

            <h2 style="color: black; font-size: 25px; margin: 15px">Nome do cliente: <span id="orderStatus" style="color: blue;  font-size: 23px">${order.client.name}</span></h2>
            <h2 style="color: black; font-size: 25px; margin: 15px">E-mail do cliente: <span id="orderStatus" style="color: blue;  font-size: 23px">${order.client.email}</span></h2>
            <h2 style="color: black; font-size: 25px; margin: 15px">Total do pedido: <span id="totalPrice"  style="color: blue; font-size: 23px">R$ ${order.totalPrice.toFixed(2)}</span></h2>
            <h2 style="color: black; font-size: 25px; margin: 15px">Momento: <span id="moment" style="color: blue;  font-size: 23px">${formattedDate}</span></h2>
            <h2 style="color: black; font-size: 25px; margin: 15px">Status do pedido: <span id="orderStatus" style="color: blue;  font-size: 23px">${order.orderMessage}</span></h2>

            <button class="btn btn-success w-100">Confirmar compra</button>
        </div>`

            mainConteiner.innerHTML += firstPartConteiner + divConteiner.outerHTML + secondPartConteiner
        })
    }

    function updatePagination(totalPages) {
        const pagination = document.querySelector(".pagination");
        pagination.innerHTML = `
        <li class="page-item ${currentPage === 0 ? 'disabled' : ''}">
            <a class="page-link" href="#" aria-label="Previous" data-page="prev">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>`;

        for (let i = 0; i < totalPages; i++) {
            pagination.innerHTML += `
            <li class="page-item ${currentPage === i ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i}">${i + 1}</a>
            </li>`;
        }

        pagination.innerHTML += `
        <li class="page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" aria-label="Next" data-page="next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>`;
    }

    function handlePaginationClick(event) {
        event.preventDefault();
        const page = event.target.getAttribute("data-page");

        if (page === "prev" && currentPage > 0) {
            currentPage--;
        } else if (page === "next" && currentPage < document.querySelectorAll(".pagination .page-item").length - 3) {
            currentPage++;
        } else if (!isNaN(page)) {
            currentPage = parseInt(page);
        }

        fetchData();
    }

})
