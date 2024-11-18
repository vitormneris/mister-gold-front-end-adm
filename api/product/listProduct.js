import { validationAdm } from "/api/validationAdm.js"

const token = localStorage.getItem("token");
let currentPage = 0;
const pageSize = 5;

validationAdm(token).then(id => {
    fetchData();

    document.querySelector(".pagination").addEventListener("click", handlePaginationClick);

    function fetchData() {
        fetch(`http://3.138.179.81:8081/produtos?page=${currentPage}&pageSize=${pageSize}&isActive=true`, {
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
            console.log(data); 
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
    }

    function showData(data) {
        const divContainer = document.getElementById("container");
        divContainer.innerHTML = "";

        data.content.forEach(product => {
            let list_category = []
            product.categories.forEach(cat => {
                list_category.push(cat.name)
            })

            const cardProducts = `
                <tr>
                    <td style="max-width: 300px;">${product.name}</td>
                    <td style="max-width: 300px;">${product.price.toFixed(2)}</td>
                    <td style="max-width: 300px;"><img src="${product.imageUrl}" style="width: 50px; height: 50px; border: 1px solid black; border-radius: 10px"></td>
                    <td style="max-width: 300px;">${product.description}</td>
                    <td style="max-width: 300px;">${product.quantity}</td>
                    <td style="max-width: 300px;">${list_category}</td>
                    <td><a onclick="redirectToProductPage('${product.id}')" class="btn btn-primary"> Editar </a></td>
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
