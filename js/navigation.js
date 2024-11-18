document.addEventListener('DOMContentLoaded', function() {
    try {
        const containerSidebar = document.getElementById('sidebar');
        const sidebarContent = ` 
        <div class="sidebar-container">
        <h2 class="adm-pages">Administração</h2>
        <hr class="hr" />
         <ul>
            <li><a href="/html/adm/profile_adm.html">Perfil administrador</a></li>
            <li><a href="/html/messages.html">Mensagens</a></li>
        </ul>

        <h2 class="adm-pages">Gerenciar</h2>
        <hr class="hr" />
         <ul>
            <li><a href="/html/adm/list_client.html">Lista de clientes</a></li>
            <li><a href="/html/adm/list_product.html">Lista de produtos</a></li>
            <li><a href="/html/adm/list_category.html">Lista de categorias</a></li>
        </ul>
    </div>
                  `;
                  containerSidebar.insertAdjacentHTML('beforeend', sidebarContent);
    } catch (error) {
        console.log("Não foi possivel carregar a sidebar!")
    }

    
    try {
        const containerNavbar = document.getElementById('navbar');
        const navbarContent = ` 
         <nav class="navbar navbar-expand-lg navbar-light fixed-top">
                <div class="container-fluid justify-content-between">
                    <div class="d-flex">
                        <button class="btn-sidebar" id="btn-toggle-sidebar">
                            <i class="fa-solid fa-bars"></i>
                        </button>
                        <div class="logo">
                            <a class="navbar-brand me-2 mb-1 d-flex align-items-center" href="/html/home.html"><img src="/images/logo.png"
                                    loading="lazy" alt="Logo" /></a>
                            <a class="navbar-brand me-2 mb-1 d-flex align-items-center" href="/html/home.html">Mistergold</a>
                        </div>
                    </div>
                   
                    <div class="icons d-flex align-items-center">
                       
                        <button aria-label="Conta" id="btn-account-page">
                            <i class="fa-solid fa-user"></i><span>Conta</span>
                        </button>
                    </div>
                </div>
            </nav>
                  `;
                  containerNavbar.insertAdjacentHTML('beforeend', navbarContent);
    } catch (error) {
        console.log("Não foi possivel carregar a navbar!")
    }

    document.getElementById('btn-toggle-sidebar').addEventListener('click', function() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('open');
    });


    document.getElementById('btn-account-page').addEventListener('click', function() {
        window.location.href = "/html/adm/profile_adm.html";
    });
   
});