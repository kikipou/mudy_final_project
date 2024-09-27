
import Searchbar, { Attributesbar } from '../searchbar/searchbar';
import '../searchbar/searchbar';


export enum Attributesnav {
    'explore' = 'explore',
    'create' = 'create',
    'img' = 'img',
<<<<<<< HEAD
    'alt' = 'alt',
=======
    'alt' = 'alt', 
    'profile' = 'profile',
>>>>>>> 7eff1e37b86facac8c7bafe9f6c29ff822471100
    'search' = 'search', // Agregué 'alt' al enumerado para manejar el atributo de imagen
}

class Nav extends HTMLElement {
    explore?: string;
    create?: string;
    img?: string;
    alt?: string;
<<<<<<< HEAD
=======
    profile?: string;
>>>>>>> 7eff1e37b86facac8c7bafe9f6c29ff822471100
    search?: string; // Definí la propiedad 'alt'

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
            <link rel="stylesheet" href="../public/src/components/header/header.css">
                <div class="body">
<<<<<<< HEAD
                    <img class="img" src="${this.img}" alt="${this.alt}" />
=======
                    <img class="img" src="${this.img}"  />
>>>>>>> 7eff1e37b86facac8c7bafe9f6c29ff822471100
                    <div class="items">
                    <button class="item">${this.explore}</button>
                    <button class="item">${this.create}</button>
                    </div>
                    <searchbar-component
                    <input type="text" id="input" name="nombre" placeholder=${this.search} />
                    ></searchbar-component>
<<<<<<< HEAD
=======
                    <img class="img2" src="${this.profile}" alt="${this.alt}" />
>>>>>>> 7eff1e37b86facac8c7bafe9f6c29ff822471100
                </div>
            `;
        }
    }
}

customElements.define('nav-component', Nav);
export default Nav;