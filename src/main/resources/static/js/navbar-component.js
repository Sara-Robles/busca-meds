class NavbarComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-link" href="/buscameds/home">Home</a>
                        <a class="nav-link" href="/buscameds/favorites">Favoritos</a>
                        <a class="nav-link" href="/buscameds/user/login" id="loginLink">Login</a>
                        <button type="button" class="btn btn-primary d-none" id="updatePageButton">Alterar Conta</button>
                        <button type="button" class="btn btn-primary d-none" id="logoutButton">Logout</button>
                    </div>
                </div>
            </div>
        </nav>
        `;
    }
}

customElements.define('navbar-component', NavbarComponent);