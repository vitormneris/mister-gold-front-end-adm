import { validationAdm } from "../validationAdm.js";

const token = localStorage.getItem("token");
let currentPage = 0; // Página inicial
const pageSize = 10; // Número de itens por página

validationAdm(token).then(id => {
    fetchData();

    document.querySelector(".pagination").addEventListener("click", handlePaginationClick);

    function fetchData() {
        fetch(`http://localhost:8084/clientes?page=${currentPage}&pageSize=${pageSize}&isActive=true`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            method: "GET"
        })
        .then(response => {
            if (response.status === 200) return response.json();
        })
        .then(data => {
            if (data && data.content) {
                showData(data);
                updatePagination(data.totalPages || 1); // Atualiza paginação com total de páginas
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
        divContainer.innerHTML = ""; // Limpa dados anteriores

        data.content.forEach(contents => {
            const cardClients = `
                <tr>
                    <td>${contents.name}</td>
                    <td>${contents.email}</td>
                    <td>${contents.phone}</td>
                    <td>${contents.address.state}/${contents.address.city}</td>
                </tr>`;
            divContainer.innerHTML += cardClients;
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
}).catch(error => {
    console.log(error);
});
