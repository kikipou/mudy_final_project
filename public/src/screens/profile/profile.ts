import '../../components/header/header';
import ArtistPost, { Attribute } from '../../components/userpost/userpost';
import '../../components/sidebar/sidebar';
import { getPostsInfo } from '../../utils/firebase';
import { getCurrentUserProfile } from '../../utils/firebase';
import { getPostsForCurrentUser } from '../../utils/firebase';

export interface UserProfile {
    uid: string;
    email: string | null;
    name?: string; // Opcional
    avatarUrl?: string; // Opcional
    [key: string]: any; // Para datos adicionales de Firestore
}

export interface UserPosts {
    title: '';
    genre: '';
    coverimg: '';
    tags: string[];
}

class Profile extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.loadUserProfile();
        this.loadUserPosts();
    }

    async loadUserProfile() {
        try {
            const userProfile: UserProfile = await getCurrentUserProfile();
            console.log('Datos del usuario:', userProfile);

            const userNameElement = this.shadowRoot?.querySelector('#user-name');
            const userEmailElement = this.shadowRoot?.querySelector('#user-email');
            const userAvatarElement = this.shadowRoot?.querySelector('#user-avatar');

            if (userNameElement) userNameElement.textContent = userProfile.name || 'Sin nombre';
            if (userEmailElement) userEmailElement.textContent = userProfile.email || 'Correo no disponible';
            if (userAvatarElement) userAvatarElement.setAttribute('src', userProfile.avatarUrl || 'default-avatar.png');
        } catch (error) {
            console.error('Error cargando el perfil del usuario:', error);
            window.location.href = '/login.html';
        }
    }

    async loadUserPosts() {
        try {
            const userPosts: any = await getPostsForCurrentUser();
            const postsContainer = this.shadowRoot?.getElementById('posts-container');

            if (!postsContainer) {
                console.error('Contenedor de posts no encontrado');
                return;
            }

            postsContainer.innerHTML = ''; // Limpiar contenido previo
            
            userPosts.forEach((post: any) => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.genre}</p>
                    <img src="${post.coverimg}" alt="Cover Image" />
                    <p>Tags: ${post.tags.join(', ')}</p>
                `;
                postsContainer.appendChild(postElement);
            });
        } catch (error) {
            console.error('Error cargando los posts del usuario:', error);
            // Opcional: muestra un mensaje de error en la interfaz
        }
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../public/src/screens/profile/profile.css">
                <div class="profile">
                    <nav-component class="nav"
                        explore="Explore" 
                        create="Create"
                        img="https://github.com/kikipou/mudy_final_project/blob/cata/mudy-logo.png?raw=true"
                        search="Search"
                    ></nav-component>
                        <h1>Perfil del Usuario</h1>
                        <div class="profile-info">
                            <img id="user-avatar" src="default-avatar.png" alt="Avatar del usuario" />
                            <h2 id="user-name">Cargando...</h2>
                            <p id="user-email">Cargando...</p>
                        </div>
                        <div id="posts-container">
                            <p>Cargando publicaciones...</p>
                        </div>
                        <sidebar-component></sidebar-component>
                </div>
            `;
        }
    }
    
}

customElements.define('profile-page', Profile);
export default Profile;
