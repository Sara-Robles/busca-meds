class NavbarComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-link" href="index.html">Home</a>
                        <a class="nav-link" href="user-login.html">Login</a>
                        <a class="nav-link" href="favorites.html">Favoritos</a>
                    </div>
                </div>
            </div>
        </nav>
        `;
    }
}

customElements.define('navbar-component', NavbarComponent);