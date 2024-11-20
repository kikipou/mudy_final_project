import '../../components/header/header';
import ArtistPost, { Attribute } from '../../components/userpost/userpost';
import '../../components/sidebar/sidebar';
import { getPostsInfo } from '../../utils/firebase';

class Dashboard extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.loadPosts();
    }

    async loadPosts() {
        const posts = await getPostsInfo(); // Obtiene la lista de posts desde Firebase
        const postListContainer = this.shadowRoot?.querySelector("#artist-post");

        if (postListContainer) {
            posts?.forEach((postData) => {
                const postElement = document.createElement("artist-post") as ArtistPost;
                postElement.setAttribute(Attribute.username, postData.username|| "Title not found");
                postElement.setAttribute(Attribute.title, postData.title || "Title not found");
                postElement.setAttribute(Attribute.genre, postData.genre || "Unknown genre");
                postElement.setAttribute(Attribute.tags, postData.tags || "Unknown tags");
                postElement.setAttribute(Attribute.coverimg, postData.coverimg || "Image not found");                
                postListContainer.appendChild(postElement);
            });
        }
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../public/src/screens/dashboard/dashboard.css">
                <div class="dashboard">
                    <nav-component class="nav"
                        explore="Explore" 
                        create="Create"
                        img="https://github.com/kikipou/mudy_final_project/blob/cata/mudy-logo.png?raw=true"
                        search="Search"
                    ></nav-component>
                    <div id="artist-post"></div> <!-- Contenedor para los posts -->
                    <sidebar-component></sidebar-component>
                </div>
            `;
        }
    }
}

customElements.define('dashboard-page', Dashboard);
export default Dashboard;
