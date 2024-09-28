
import Searchbar, { Attributesbar } from '../searchbar/searchbar';
import '../searchbar/searchbar';

export enum Attributesnav {
    'explore' = 'explore',
    'create' = 'create',
    'img' = 'img',
    'alt' = 'alt', 
    'profile' = 'profile',
    'search' = 'search',
}

class Nav extends HTMLElement {
    explore?: string;
    create?: string;
    img?: string;
    alt?: string;
    profile?: string;
    search?: string;

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
                    <img class="img" src="${this.img}"  />
                        <div class="items">
                            <button class="item">${this.explore}</button>
                            <button class="item">${this.create}</button>
                        </div>
                    <searchbar-component
                    <input type="text" id="input" name="nombre" placeholder=${this.search} />
                    ></searchbar-component>
                </div>
            `;
        }
    }
}

customElements.define('nav-component', Nav);
export default Nav;