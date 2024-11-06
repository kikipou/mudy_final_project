class Publish extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../public/src/screens/dashboard/dashboard.css">
                <div class="body">
                    <nav-component class="nav"
                        explore="Explore" 
                        create="Create"
                        img="https://github.com/kikipou/mudy_final_project/blob/cata/mudy-logo.png?raw=true"
                        search="Search"
                        ></nav-component>
                            <div class=posts>
                            <div class="posts-container"></div>
                            </div>
                            <h1>HOLA</h1>
                        <sidebar-component 
                    ></sidebar-component>
                </div>
            `;
        }
    }
}
console.log (Publish)
customElements.define('publish-page', Publish);
export default Publish;