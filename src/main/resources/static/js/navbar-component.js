class NavbarComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="navbar navbar-expand-lg bg-primary navbar-dark">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarNavAltMarkup">

                        <!-- Itens à esquerda -->
                        <div class="navbar-nav">
                            <a class="nav-link text-white" href="/buscameds/home">Home</a>
                            <a class="nav-link text-white" href="/buscameds/favorites">Favoritos</a>
                        </div>

                        <!-- Dropdown "Conta" à direita -->
                        <div class="navbar-nav">
                            <div class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle text-white" href="#" id="accountDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-person-circle"></i> Conta
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end bg-primary text-white" aria-labelledby="accountDropdown">
                                    <li>
                                        <a class="dropdown-item text-white" href="/buscameds/user/login" id="loginLink">
                                            <i class="bi bi-box-arrow-in-right"></i> Login
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item text-white d-none" href="#" id="logoutButton">
                                            <i class="bi bi-box-arrow-right"></i> Logout
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item text-white d-none" href="/buscameds/user/update" id="updatePageButton">
                                            <i class="bi bi-gear"></i> Alterar Conta
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </nav>
        `;
    }
}
customElements.define('navbar-component', NavbarComponent);
