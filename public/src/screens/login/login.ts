class LoginPage extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="./register.css">
                <div class="body">
                    <nav-component class="nav"
                        img="https://github.com/kikipou/mudy_final_project/blob/cata/mudy-logo.png?raw=true"
                        ></nav-component>
                        <sidebar-component 
                    ></sidebar-component>
                </div>
            `;
        }
    }
}
console.log (LoginPage)
customElements.define('register-page', LoginPage);
export default LoginPage;