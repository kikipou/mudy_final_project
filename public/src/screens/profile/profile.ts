import '../../components/header/header';
import '../../components/sidebar/sidebar';
import { appState, dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { getCurrentUserProfile, getFile } from '../../utils/firebase';
import { getPostsForCurrentUser } from '../../utils/firebase';

export interface UserProfile {
    uid: string;
    name?: string;
    username?: string | null;
    displayName?: string | null;
    musicgenre?: string;
    profiledesc?: string;
    avatarUrl?: string;
    [key: string]: any; // Para datos adicionales de Firestore
}

export interface UserPosts {
    coverimg: '';
}

class Profile extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const urlImg = await getFile(appState.user)
        this.render(urlImg);
        this.loadUserProfile();
        this.loadUserPosts();
    }

    async loadUserProfile() {
        try {
            const userProfile: UserProfile = await getCurrentUserProfile();
            console.log('User data:', userProfile);

            const userNameElement = this.shadowRoot?.querySelector('#user-name');
            const userUserNameElement = this.shadowRoot?.querySelector('#user-username');
            const userMusicGenreElement = this.shadowRoot?.querySelector('#user-musicgenre');
            const userProfileDescriptionElement = this.shadowRoot?.querySelector('#user-description');
            const userAvatarElement = this.shadowRoot?.querySelector('#user-avatar');

            if (userNameElement) userNameElement.textContent = userProfile.name || 'Unknown name';
            if (userUserNameElement) userUserNameElement.textContent = userProfile.username || 'Unknown username';
            if (userMusicGenreElement) userMusicGenreElement.textContent = userProfile.musicgenre || 'Unknown music genre';
            if (userProfileDescriptionElement) userProfileDescriptionElement.textContent = userProfile.profiledesc || 'Profile description not found';
            if (userAvatarElement) userAvatarElement.setAttribute('src', userProfile.avatarUrl || 'default-avatar.png');
        } catch (error) {
            console.error('Error loading user profile:', error);
            window.location.href = '/login.html';
        }
    }

    async loadUserPosts() {
        try {
            const userPosts: any = await getPostsForCurrentUser();

            if (!Array.isArray(userPosts)) {
                console.error('Los posts del usuario no son un array:', userPosts);
                return;
            }
        
            const postsContainer = this.shadowRoot?.getElementById('posts-container');
            if (!postsContainer) {
                console.error('Posts container not found');
                return;
            }
            postsContainer.innerHTML = ''; // Limpiar contenido previo
            
            userPosts.forEach((post: any) => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                <link rel="stylesheet" href="../public/src/screens/profile/profile.css">
                    <div id="photo-container">
                        <img class= "cover-image" src="${post.coverimg}" alt="Cover Image"/>
                    </div>
                `;
                postsContainer.prepend(postElement);
            });
        } catch (error) {
            console.error('Error loading user posts:', error);
            // Opcional: muestra un mensaje de error en la interfaz
        }
    }

    render(urlImg: any) {
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


                    <div class="section-completo">
                        <div class="profile-photo">
                            <img id="user-img" src=${urlImg} alt="User profile img" />
                        </div>
                        <div class="profile-info">
                            <h2 id="user-name">Loading...</h2>
                            <h2 id="user-username">Loading...</h2>
                            <h2 id="user-musicgenre">Loading...</h2>
                            <h2 id="user-description">Loading...</h2>
                            <button-component id="edit-button" text="Edit"></button-component>
                        </div>
                    </div>

                        <div id="posts-container">
                        </div>
                        <sidebar-component></sidebar-component>
                </div>
            `;
            const editButton = this.shadowRoot.querySelector('#edit-button') as HTMLButtonElement;
            
            editButton?.addEventListener('click', () => dispatch(navigate(Screens.EDITPROFILE)));
        }
    }
    
}

customElements.define('profile-page', Profile);
export default Profile;