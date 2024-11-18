document.addEventListener("DOMContentLoaded", function () {

    fetch('http://3.15.223.242:8081/categorias?page=0&pageSize=1000000&isActive=true', {
        method: "GET"
    }).then(response => {
        if (response.status === 200) {
            return response.json();
        }
    }).then(data => {
        showData(data);
    }).catch(error => {
        console.log(error);
    });

    function showData(data) {
        const divContainer = document.getElementById("categoriesOptions");

        data.content.forEach(contents => {
            const optionElement = `<option value="${contents.id}" >${contents.name}</option>`;
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
