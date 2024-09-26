import { artistasIndependientes } from './data/data'; // Asegúrate de que la ruta sea correcta
import nav, { Attributesnav } from './components/header/header'; // Asegúrate de que la ruta sea correcta
import "./components/header/header";
import "./components/userpost/userpost";
import ArtistPost, { Attribute } from './components/userpost/userpost';
import "./components/userpost/userpost"

// Clase principal de la aplicación
class AppContainer extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
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
                        img="https://raw.githubusercontent.com/kikipou/mudy_final_project/main/mudy-logo.png"
                        profile="https://i.pinimg.com/564x/73/c1/b4/73c1b4a272425b7295eec9b0f874b8ee.jpg"
                        search="Search">
                    </nav-component>
                    <div class="posts-container"></div>
                </div>
            `;

            // Agregar los posts de artistas dentro de la clase `posts-container`
            const postsContainer = this.shadowRoot.querySelector('.posts-container');
            if (postsContainer) {
                artistasIndependientes.forEach(artista => {
                    const postElement = this.ownerDocument.createElement("artist-post") as ArtistPost;

                    // Asignar atributos al componente artist-post
                    postElement.setAttribute(Attribute.photo, artista.fotoalbum);
                    postElement.setAttribute(Attribute.artistName, artista.nombre);
                    postElement.setAttribute(Attribute.songName, artista.cancion);
                    postElement.setAttribute(Attribute.profile, artista.fotoperfil);
                    postElement.setAttribute(Attribute.songTime, artista.horasSubida.toString());

                    postsContainer.appendChild(postElement);
                });
            }
        }
    }
}

// Definición del componente principal
customElements.define('app-container', AppContainer);
export default AppContainer;
