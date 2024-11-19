import { dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
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
                        <button class="profile-button">
                            <i class="fa-solid fa-user user-icon"></i>
                        </button>
                        <button class="library-button">
                            <i class="fa-solid fa-bookmark" library-icon"></i>
                        </button>
                        <button class="categories-button">
                            <i class="fa-solid fa-music" categories-icon"></i>
                        </button>
                        <button class="logout-button">
                            <i class="fa-solid fa-right-from-bracket logout-icon"></i>
                        </button>
                    </div>
                </div>
            `;

            const profileButton = this.shadowRoot.querySelector('.profile-button') as HTMLButtonElement;
            const libraryButton = this.shadowRoot.querySelector('.library-button') as HTMLButtonElement;
            const categoriesButton = this.shadowRoot.querySelector('.categories-button') as HTMLButtonElement;
            const logoutButton = this.shadowRoot.querySelector('.logout-button') as HTMLButtonElement;

            profileButton?.addEventListener('click', () => dispatch(navigate(Screens.PROFILE)));
            libraryButton?.addEventListener('click', () => dispatch(navigate(Screens.MYLIBRARY)));
            categoriesButton?.addEventListener('click', () => dispatch(navigate(Screens.CATEGORIES)));
            logoutButton?.addEventListener('click', () => this.handleLogout());
        }
    }
}

customElements.define('sidebar-component', Sidebar);
export default Sidebar;