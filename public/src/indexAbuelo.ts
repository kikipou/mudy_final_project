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
                <link rel="stylesheet" href="../src/index.css">
                <nav-component 
                explore="Explore" 
                create="Create"
                img= "https://www.figma.com/design/ClgCPq3OXLUdvgECBPTyWN/mudy?node-id=38-2&t=hC7D4XBSwqRcIUri-4">
                </nav-component>
                
            `;
        }
    }
}

// Definición del componente principal
customElements.define('app-container', AppContainer);
export default AppContainer
 