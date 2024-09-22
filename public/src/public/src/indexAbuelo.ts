// Importaciones de componentes
import { artistasIndependientes }  from './data/data'; // Asegúrate de que la ruta sea correcta
import Input, { Attributes } from './components/inputs/inputs'; // Asegúrate de que la ruta sea correcta

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
                
                
            `;
        }
    }
}

// Definición del componente principal
customElements.define('app-container', AppContainer);
export default AppContainer
