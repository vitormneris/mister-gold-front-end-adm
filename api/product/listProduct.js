import { validationAdm } from "../validationAdm.js";

const token = localStorage.getItem("token");
let currentPage = 0;
const pageSize = 10;

validationAdm(token).then(id => {
    fetchData();

    document.querySelector(".pagination").addEventListener("click", handlePaginationClick);

    function fetchData() {
        fetch(`http://localhost:8084/produtos?page=${currentPage}&pageSize=${pageSize}&isActive=true`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            method: "GET"
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then(data => {
            console.log(data); // Verifica o conteúdo da resposta
            if (data && data.content) {
                showData(data);
                updatePagination(data.totalPages || 1); // Define o número de páginas
            } else {
                console.log("Nenhum dado encontrado.");
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    function showData(data) {
        const divContainer = document.getElementById("container");
        divContainer.innerHTML = "";

        data.content.forEach(contents => {
            const cardProducts = `
                <tr>
                    <td>${contents.name}</td>
                    <td>${contents.price}</td>
                    <td>${contents.description}</td>
                    <td>${contents.material}</td>
                    <td>${contents.size}</td>
                    <td>${contents.weight}</td>
                    <td>${contents.color}</td>
                    <td>${contents.quantity}</td>
                    <td><a onclick="redirectToProductPage('${contents.id}')" class="btn btn-primary"> Editar </a></td>
                </tr>`;
            divContainer.innerHTML += cardProducts;
        });
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
