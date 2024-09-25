import { artistasIndependientes }  from './data/data'; // Asegúrate de que la ruta sea correcta
import nav, { Attributesnav } from './components/header/header'; // Asegúrate de que la ruta sea correcta
import "./components/header/header"

// Clase principal de la aplicación
class AppContainer extends HTMLElement {
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
                <link rel="stylesheet" href="../public/src/index.css">
                <div class="body">
                <nav-component 
                explore="Explore" 
                create="Create"
                img= "https://raw.githubusercontent.com/kikipou/mudy_final_project/main/mudy-logo.png"
                profile= "https://i.pinimg.com/564x/73/c1/b4/73c1b4a272425b7295eec9b0f874b8ee.jpg"
                ></nav-component>
                </div>
                
            `;
        }
    }
}

// Definición del componente principal
customElements.define('app-container', AppContainer);
export default AppContainer
 