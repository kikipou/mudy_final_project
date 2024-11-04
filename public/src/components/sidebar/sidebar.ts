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

            // Añadir evento de clic al último botón para cerrar sesión
            const logoutButton = this.shadowRoot.querySelector('.logout-button') as HTMLButtonElement;
            logoutButton?.addEventListener('click', () => this.handleLogout());
        }
    }
}

customElements.define('sidebar-component', Sidebar);
export default Sidebar;

// import { dispatch } from '../../store/index';
// import { navigate } from '../../store/actions';
// import { Screens } from '../../types/store';
// import { logOut } from '../../utils/firebase';

// class Sidebar extends HTMLElement {
//     private _open: boolean = false;

//     constructor() {
//         super();
//         this.attachShadow({ mode: 'open' });
//     }

//     connectedCallback() {
//         document.addEventListener('sidebar-toggle', this.toggle);
//         document.addEventListener('click', this.handleOutsideClick, true);
//     }

//     disconnectedCallback() {
//         document.removeEventListener('sidebar-toggle', this.toggle);
//         document.removeEventListener('click', this.handleOutsideClick, true);
//     }
    
//     toggle = () => {
//         this._open = !this._open;
//         this.render();
//     }
    
//     handleOutsideClick = (event: MouseEvent) => {
//         if (this._open && !this.shadowRoot?.contains(event.target as Node)) {
//             this._open = false;
//             this.render();
//         }
//     }

//     async handleLogout() {
//         try {
//             await logOut();
//             alert("Session successfully closed");
//         } catch (error) {
//             console.error("Error logging out:", error);
//         }
//     }
    
//     render() {
//         if (this.shadowRoot) {
//             this.shadowRoot.innerHTML = `
//                 <style>
//                     :host {
//                         display: block;
//                         width: 250px;
//                         height: 100%;
//                         position: fixed;
//                         top: 0;
//                         left: ${this._open ? '0' : '-250px'};
//                         bottom: 0;
//                         transition: left 0.3s ease;
//                         background-color: #551bc2;
//                         color: white;
//                         box-shadow: 4px 0 5px rgba(0,0,0,0.5);
//                         z-index: 1000;
//                     }
//                     ul {
//                         list-style: none;
//                         margin: 0;
//                         padding: 20px 0;
//                     }
//                     li {
//                         padding: 15px 20px;
//                         border-bottom: 1px solid #444;
//                     }
//                     li:last-child {
//                         border-bottom: none;
//                     }
//                     button {
//                         color: white;
//                         background: none;
//                         border: none;
//                         text-align: left;
//                         width: 100%;
//                         padding: 15px 20px;
//                         cursor: pointer;
//                     }
//                     button:hover {
//                         background-color: #1D0844;
//                     }
//                 </style>
//                 <ul>
//                     <li><button id="profile">Menu</button></li>
//                     <li><button id="mylibrary">Main</button></li>
//                     <li><button id="categories">Profile</button></li>
//                     <li><button id="logout">Log Out</button></li>
//                 </ul>
//             `;

//             // Corregido el selector a #logout
//             const logoutButton = this.shadowRoot.querySelector('#logout') as HTMLButtonElement;
//             logoutButton?.addEventListener('click', () => this.handleLogout());

//             this.addEventListeners();
//         }
//     }

//     addEventListeners() {
//         this.shadowRoot?.querySelector('#profile')?.addEventListener('click', () => {
//             console.log("Profile button clicked");
//             dispatch(navigate(Screens.PROFILE));
//         });
//         this.shadowRoot?.querySelector('#mylibrary')?.addEventListener('click', () => {
//             dispatch(navigate(Screens.MYLIBRARY));
//         });
//         this.shadowRoot?.querySelector('#categories')?.addEventListener('click', () => {
//             dispatch(navigate(Screens.CATEGORIES));
//         });
//     }
// }

// customElements.define('sidebar-component', Sidebar);
// export default Sidebar;