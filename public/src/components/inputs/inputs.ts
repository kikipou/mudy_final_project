class RegisterInput extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
            };

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="./inputs.css">
                    <h1 class="title">Mudy</h1>
                        <form id="register-form">
                            <input id="name" placeholder="Name" required />
                            <input id="fullname" placeholder="Fullname" required />
                            <input id="username" placeholder="Username" required />
                            <input id="email" placeholder="Email" required />
                            <input id="password" placeholder="Password" required />
                            <button type="submit" id="Sign Up">Add song</button>
                        </form>
            `;
        }
    }
}
console.log (RegisterInput)
customElements.define('register-input', RegisterInput);
export default RegisterInput;