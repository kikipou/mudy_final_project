export enum Attributesbar {
    'search' = 'search',
     // Agregué 'alt' al enumerado para manejar el atributo de imagen
}

class Searchbar extends HTMLElement {
    search?: string;
      // Definí la propiedad 'alt'

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.keys(Attributesbar);
    }

    attributeChangedCallback(propName: Attributesbar, oldValue: string | undefined, newValue: string | undefined) {
        this[propName] = newValue;
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="../public/src/components/searchbar/searchbar.css">
            <input type="text" id="input" name="nombre" placeholder="Search" />  
            `;
        }
    }
}

customElements.define('searchbar-component', Searchbar);
export default Searchbar;