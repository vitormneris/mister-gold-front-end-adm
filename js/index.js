document.addEventListener('DOMContentLoaded', function() {
    try {
        const containerProducts = document.getElementById('card-container');
        const cardProducts = `
        <div class="col-lg-4 col-md-12 mb-6 mb-lg-3">
                        <div class="card">

                            <div class="bg-image hover-overlay" data-mdb-ripple-init data-mdb-ripple-color="light">
                              <a href="/html/product.html">
                                <img src="/images/anel.jpg" class="img-fluid"> 
                              
                                </a>
                            </div>

                            <div class="card-body">
                                <h5 class="card-title">Anel Pedra Oval Em Ouro 18K Com Esmeralda E Diamante 0,174Ct</h5>
                                <div class="category_line_alt"></div>
                                <p class="card-text product-price-cash">
                                    R$ 11.691,00 à vista
                                </p>
                                <p class="card-text product-price-card">
                                    R$ 12.599,00 no cartão
                                </p>
                                <a href="#!" class="btn btn-primary"><i class="fa-solid fa-cart-shopping"></i>+</a>
                            </div>

                        </div>
                    </div>
    `;
    const numberOfProducts = 7;
    for (let i = 0; i < numberOfProducts; i++) {
        containerProducts.insertAdjacentHTML('beforeend', cardProducts);
    }
    } catch (error) {
        console.log("Não foi encontrado um container para os cards de produtos!")
    }

    try {
        const containerCategories = document.getElementById('categories_container');
        const cardCategories = `
            <div class="category"><a href="/html/products.html">
                <img src="/images/anel.jpg" class="category-img-top" alt="Sunset Over the Sea"/>
                <div class="category-body">
                    <p class="category-text">Anéis</p>
                    <div class="category_line" align="center"></a></div>
            </div>
        `;
        
        const numberOfCategories = 12;
        const categoriesPerRow = 6;
        
        let row = null; // variável para armazenar a linha
        for (let i = 0; i < numberOfCategories; i++) {
            // Quando for o primeiro item ou múltiplo de 6, cria uma nova linha
            if (i % categoriesPerRow === 0) {
                if (row) {
                    containerCategories.appendChild(row); // Adiciona a linha anterior antes de criar a nova
                }
                row = document.createElement('div');
                row.classList.add('row'); // Adiciona a classe 'row' para garantir a estrutura correta
            }
            row.insertAdjacentHTML('beforeend', cardCategories); // Adiciona o card à linha atual
        }
        if (row) {
            containerCategories.appendChild(row); // Adiciona a última linha
        }
    } catch (error) {
        console.log("Não foi encontrado um container para os cards de categorias!");
    }
   
});

// botao de edita/cancelar/salvar perfil de usuario

// Adicionando event listeners para os botões do grupo
document.getElementById('btnCancel').addEventListener('click', toggleEditButtons);
document.getElementById('btnSave').addEventListener('click', toggleEditButtons);
