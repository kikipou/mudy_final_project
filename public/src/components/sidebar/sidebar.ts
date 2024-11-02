import { logOut } from '../../utils/firebase';

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

    async handleLogout() {
        try {
            await logOut();
            alert("Session successfully closed");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../public/src/components/sidebar/sidebar.css">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
                <div class="body">
                    <div class="items">
                        <button class="item">
                            <i class="fa-solid fa-user" style="color: #ffffff;"></i>  
                        </button>
                        <button class="item">
                            <i class="fa-solid fa-bookmark" style="color: #ffffff;"></i>
                        </button>
                        <button class="item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#FFFFFF">
                            <path d="M12 3v13.34c-.59-.22-1.23-.34-1.88-.34-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V8h4V3h-6z"/>
                            </svg>
                        </button>
                        <button class="item logout-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#FFFFFF">
                            <path d="M16 13l-4-4v3H3v2h9v3l4-4z"/>
                            <path d="M21 3H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7V5h14v14z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `;

            // Añadir evento de clic al último botón para cerrar sesión
            const logoutButton = this.shadowRoot.querySelector('.logout-button') as HTMLButtonElement;
            logoutButton?.addEventListener('click', () => this.handleLogout());
        }
    }
}

customElements.define('sidebar-component', Sidebar);
export default Sidebar;