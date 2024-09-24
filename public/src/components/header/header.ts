export enum Attributesnav {
    'explore' = 'explore',
    'create' = 'create',
    'img' = 'img',
    'alt' = 'alt',  // Agregué 'alt' al enumerado para manejar el atributo de imagen
}

class Nav extends HTMLElement {
    explore?: string;
    create?: string;
    img?: string;
    alt?: string;  // Definí la propiedad 'alt'

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.keys(Attributesnav);
    }

    attributeChangedCallback(propName: Attributesnav, oldValue: string | undefined, newValue: string | undefined) {
        this[propName] = newValue;
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <div>
                    <img class="img" src="${this.img}" alt="${this.alt}" />
                </div>
            `;
        }
    }
}

customElements.define('nav-component', Nav);
export default Nav;