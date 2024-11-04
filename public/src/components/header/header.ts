import { dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import Searchbar, { Attributesbar } from '../searchbar/searchbar';
import '../searchbar/searchbar';

export enum Attributesnav {
    'explore' = 'explore',
    'create' = 'create',
    'img' = 'img',
    'alt' = 'alt', 
    'search' = 'search',
}

class Nav extends HTMLElement {
    explore?: string;
    create?: string;
    img?: string;
    alt?: string;
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
                    <img class="img" src="${this.img}"/>
                        <div class="items">
                            <button class="explore-button">${this.explore}</button>
                            <button class="create-button">${this.create}</button>
                        </div>
                    <searchbar-component
                    <input type="text" id="input" name="nombre" placeholder=${this.search} />
                    ></searchbar-component>
                </div>
            `;
            
            const exploreButton = this.shadowRoot.querySelector('.explore-button') as HTMLButtonElement;
            const createButton = this.shadowRoot.querySelector('.create-button') as HTMLButtonElement;

            exploreButton?.addEventListener('click', () => dispatch(navigate(Screens.DASHBOARD)));
            createButton?.addEventListener('click', () => dispatch(navigate(Screens.PUBLISH)));
        }
    }
}

customElements.define('nav-component', Nav);
export default Nav;