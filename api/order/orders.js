import { validationAdm } from "/api/validationAdm.js";
import { updateOrderStatus } from "./updateOrderStatus.js";

const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", function () {
    let currentPage = 0;
    const pageSize = 3;

    fetchData();

    document.querySelector(".pagination").addEventListener("click", handlePaginationClick);

    function fetchData() {
        validationAdm(token)
            .then(id => {
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
                            updatePagination(data.totalPages || 1);
                        } else {
                            console.log("Nenhum dado encontrado.");
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            });
    }

    function showData(data) {
        const mainContainer = document.getElementById("container");
        mainContainer.innerHTML = "";

        const statusOptions = [
            { key: "WAITING_PAYMENT", value: "Esperando pagamento." },
            { key: "PAID", value: "Pago." },
            { key: "SHIPPED", value: "Enviado." },
            { key: "DELIVERED", value: "Entregue." },
            { key: "CANCELED", value: "Cancelado." }
        ];

        data.content.forEach(order => {
            const divContainer = document.createElement("div");

            order.items.forEach(item => {
                const itemHTML = `
                    <div class="item-container">
                        <div class="left">
                            <div class="item-img"><img src="${item.product.imageUrl}" class="item-img" style="width: 100px; height:100px"></div>
                            <div class="item-name"><h3>${item.product.name}</h3></div>
                        </div>
                        <div class="item-quantity">
                            <label for="item-quantity">Quantidade:</label>
                            <span id="quantity" class="item-quantity">${item.quantity}</span>
                        </div>
                        <div class="item-price">
                            <label for="item-price">Valor unitário:</label>
                            <h3>R$ ${item.price.toFixed(2)}</h3>
                        </div>
                    </div>`;
                divContainer.innerHTML += itemHTML;
            });

            const firstPartContainer = `
                <div class="form-container">
                    <h1>Pedido</h1>
                    <hr class="hr" />

                    <h2 style="margin: 20px 0px"> Informações do cliente</h2>
                    <div class="clientContainer">
                        <label class="form-label" for="name">Nome do cliente</label>
                        <input type="text" id="name" value="${order.client.name}" class="inputClass form-control-lg" disabled>
                        <label class="form-label" for="email">Email do cliente</label>
                        <input type="email" id="email" value="${order.client.email}" class="inputClass form-control-lg" disabled>
                    </div>

                    <h2 style="margin: 20px 0px">Informações do pedido</h2>
                    <div class="orderContainer">`;

            const date = new Date(order.moment);
            const formattedDate = date.toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });

            const secondPartContainer = `
                <label class="form-label" for="totalPrice">Total do pedido</label>
                <input type="number" id="totalPrice" value="${order.totalPrice.toFixed(2)}" class="inputClass form-control-lg" disabled>
                <label class="form-label" for="moment">Momento</label>
                <input type="text" id="moment" value="${formattedDate}" class="inputClass form-control-lg" disabled>
                <div id="changeStatus">
                    <label class="form-label">Status do pedido:</label><br>
                    <select class="form-select statusOptions" id="status-${order.id}" style="border:2px solid black;" disabled>
                        ${statusOptions.map(status =>
                            `<option value="${status.key}" ${status.value === order.orderMessage ? "selected" : ""}>
                                ${status.value}
                            </option>`
                        ).join('')}
                    </select>
                    <button data-mdb-ripple-init type="button" class="btn btn-warning btn-block mt-3" id="btnEdit-${order.id}">Editar</button>
                    <div id="btn-group-${order.id}" style="display: none;">
                        <button class="btn btn-danger mt-3 me-3" id="btnCancel-${order.id}">Cancelar Alteração</button>
                        <button class="btn btn-primary mt-3 send-status" data-order-id="${order.id}" id="buttonUpdate-${order.id}">Atualizar Status</button>
                    </div>
                </div>
            </div>
        </div>`;

            mainContainer.innerHTML += firstPartContainer + divContainer.outerHTML + secondPartContainer;
        });

        // Delegação de eventos para os botões
        mainContainer.addEventListener("click", function (e) {
            const target = e.target;

            if (target.matches(".btn-warning")) { // Botão Editar
                const orderId = target.id.split("-")[1];
                toggleEditButtons(orderId, true);
                const selectElement = document.getElementById(`status-${orderId}`);
                selectElement.style.borderColor = "#facc15";
                selectElement.disabled = false;
            } else if (target.matches(".btn-danger")) { // Botão Cancelar Alteração
                const orderId = target.id.split("-")[1];
                toggleEditButtons(orderId, false);
                const selectElement = document.getElementById(`status-${orderId}`);
                selectElement.style.border = "2px solid black";
                selectElement.disabled = true;
            } else if (target.matches(".btn-primary")) { // Botão Atualizar Status
                const orderId = target.getAttribute("data-order-id");
                const selectElement = document.getElementById(`status-${orderId}`);
                const newStatus = selectElement.value;
                updateOrderStatus(orderId, newStatus, token);
                toggleEditButtons(orderId, false);
                selectElement.style.border = "2px solid black";
                selectElement.disabled = true;
            }
        });
    }

    function toggleEditButtons(orderId, editMode) {
        document.getElementById(`btnEdit-${orderId}`).style.display = editMode ? "none" : "block";
        document.getElementById(`btn-group-${orderId}`).style.display = editMode ? "flex" : "none";
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
});
