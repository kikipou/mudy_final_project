import { artistasIndependientes }  from './data/data'; // Asegúrate de que la ruta sea correcta
import nav, { Attributesnav } from './components/header/header'; // Asegúrate de que la ruta sea correcta

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
                input="holi"
                
            `;
        }
    }
}

// Definición del componente principal
customElements.define('app-container', AppContainer);
export default AppContainer
 