document.addEventListener("DOMContentLoaded", function () {
    // Aqui que vai os IDs das categorias do produto(ex: se o produto for da categoria 1 e 2, a seguinte linha deve conter o ID das duas categorias)
    const selectedCategories = ["6738368aacbba536cce440c0"]; //aqui tem o ID da categoria 1

    fetch('http://localhost:8084/categorias?page=0&pageSize=10&isActive=true', {
        method: "GET"
    }).then(response => {
        if (response.status === 200) {
            return response.json();
        }
    }).then(data => {
        showData(data, selectedCategories);
    }).catch(error => {
        console.log(error);
    });

    function showData(data, selectedCategories) {
        const divContainer = document.getElementById("categoriesOptions");

        data.content.forEach(contents => {
            const isSelected = selectedCategories.includes(contents.id) ? 'selected' : '';

            // Cria o elemento option e marca como selecionado se for necessário
            const optionElement = `<option value="${contents.id}" ${isSelected}>${contents.name}</option>`;

            divContainer.innerHTML += optionElement;
        });

        new MultiSelectTag('categoriesOptions', {
            rounded: true,   
            shadow: true,    
            placeholder: 'Pesquisar',  
            tagColor: {
                textColor: '#327b2c',
                borderColor: '#92e681',
                bgColor: 'transparent',
            },
            onChange: function(values) {
                console.log(values)
            }
        })
    }
});
