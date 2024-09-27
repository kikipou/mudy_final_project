export enum Attributessidebar {
    'library' = 'library',
    'categories' = 'categories',
    'logout' = 'logout',

    'profile' = 'profile',
    // Agregué 'alt' al enumerado para manejar el atributo de imagen
}

class Sidebar extends HTMLElement {
    library?: string;
    categories?: string;
    logout?: string;
    profile?: string;
    // Definí la propiedad 'alt'

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.values(Attributessidebar);
    }

    attributeChangedCallback(propName: Attributessidebar, oldValue: string | undefined, newValue: string | undefined) {
        this[propName] = newValue;
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../public/src/components/sidebar/sidebar.css">
                <div class="body">
                    <div class="items">
                        <button class="item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.315 0-10 1.672-10 5v2h20v-2c0-3.328-6.685-5-10-5z" fill="#FFFFFF"/><"</svg>
                            
                        </button>
                       <button class="item">
    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="#FFFFFF">
        <path d="M3 4v17h2V6h12V4H3zm4 2v17h13V6H7zm2 2h9v13H9V8zm1 2v9h7v-9h-7z"/>
    </svg>
</button>



                       <button class="item">
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="34" viewBox="0 0 24 24" fill="#FFFFFF">
        <path d="M12 3v13.34c-.59-.22-1.23-.34-1.88-.34-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V8h4V3h-6z"/>
    </svg>
<button class="item">
    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="#FFFFFF">
        <path d="M16 13l-4-4v3H3v2h9v3l4-4z"/>
        <path d="M21 3H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7V5h14v14z"/>
    </svg>
</button>



                    </div>
                   
                </div>
            `;
        }
    }

}

customElements.define('sidebar-component', Sidebar);
export default Sidebar;