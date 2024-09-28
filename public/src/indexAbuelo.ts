import { artistasIndependientes } from './data/data'; // Asegúrate de que la ruta sea correcta
import nav, { Attributesnav } from './components/header/header'; // Asegúrate de que la ruta sea correcta
import "./components/header/header";
import "./components/userpost/userpost";
import ArtistPost, { Attribute } from './components/userpost/userpost';
import "./components/userpost/userpost"
import "../src/components/sidebar/sidebar"
import Sidebar, { Attributessidebar } from './components/sidebar/sidebar';
// Clase principal de la aplicación
class AppContainer extends HTMLElement {

    Posts: ArtistPost[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

            artistasIndependientes.forEach(artista => {
                const postElement = this.ownerDocument.createElement("artist-post") as ArtistPost;

                // Asignar atributos al componente artist-post
                postElement.setAttribute(Attribute.photo, artista.fotoalbum);
                postElement.setAttribute(Attribute.artistName, artista.nombre);
                postElement.setAttribute(Attribute.songName, artista.cancion);
                postElement.setAttribute(Attribute.profile, artista.fotoperfil);
                postElement.setAttribute(Attribute.songTime, artista.horasSubida.toString());

                this.Posts.push(postElement)

            });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../public/src/index.css">
                <div class="body">
                    <nav-component class="nav"
                        explore="Explore" 
                        create="Create"
                        img="https://github.com/kikipou/mudy_final_project/blob/cata/mudy-logo.png?raw=true"
                        search="Search"
                        ></nav-component>
                        <div class=posts>
                    <div class="posts-container"></div>
                    </div>
                    <sidebar-component 
                    
                    ></sidebar-component>
                </div>
            `;
            const postContainer = this.shadowRoot.querySelector(".posts-container");
            this.Posts.forEach(artista => {
                if (postContainer) {
                    postContainer.appendChild(artista);
                }
            });
            // Agregar los posts de artistas dentro de la clase posts-container
           
        }
    }
}
console.log (AppContainer)
// Definición del componente principal
customElements.define('app-container', AppContainer);
export default AppContainer;