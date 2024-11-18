import { getCategoriesList } from "../category/CategoryOptions.js";
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

fetch('http://18.227.48.211:8081/produtos/' + productId + '/id', {
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


function showData(product) {

    const tdName = document.getElementById("name")
    tdName.value = product.name
    tdName.focus()

    const tdImageUrl = document.getElementById("selectedImage")
    tdImageUrl.style.borderRadius = "10px"
    tdImageUrl.style.border = "1px solid black"
    tdImageUrl.src = product.imageUrl

    const tdPrice = document.getElementById("price")
    tdPrice.value = product.price.toFixed(2)
    tdPrice.focus()

    const tdDetails = document.getElementById("description")
    tdDetails.value = product.description
    tdDetails.focus()

    const tdQuantity = document.getElementById("quantity")
    tdQuantity.value = product.quantity
    tdQuantity.focus()
    const divContainer = document.getElementById("categoriesOptions");

    let listCategories = getCategoriesList();
    const selectedCategories = []

    listCategories.then(categories => {
        categories.forEach(category => {
            product.categories.forEach(productCategory => {
                if(productCategory.id==category.id){
                    selectedCategories.push(category.id)
                }
            })
        })
    })

    listCategories.then(categories => {
        categories.forEach(category => {
            const isSelected = selectedCategories.includes(category.id) ? 'selected' : '';
            const optionElement = `<option value="${category.id}" ${isSelected}>${category.nome}</option>`;
            divContainer.innerHTML += optionElement;
        })

        new MultiSelectTag('categoriesOptions', {
            rounded: true,
            shadow: true,
            placeholder: 'Pesquisar',
            tagColor: {
                textColor: '#327b2c',
                borderColor: '#92e681',
                bgColor: 'transparent',
            },
            onChange: function (values) {
                console.log(values)
            }
        })
    }).catch(error => console.log(error))
}
