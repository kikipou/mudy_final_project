// Enum para los atributos que queremos mostrar
export enum Attribute {
    'photo' = 'photo',
    'artistName' = 'artistName',
    'songName' = 'songName',
    'songTime' = 'songTime',
    'profile' = 'profile' // Tiempo desde que se subió la canción
}

class ArtistPost extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.values(Attribute);
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    connectedCallback() { 
        this.render();   
        this.addHeartButtonListener();
    }

    render() {
        if (this.shadowRoot) {
            const photo = this.getAttribute(Attribute.photo) || 'Not found';
            const artistName = this.getAttribute(Attribute.artistName) || 'Unknown Artist';
            const songName = this.getAttribute(Attribute.songName) || 'Untitled Song';
            const songTime = this.getAttribute(Attribute.songTime) || 'Time unknown';
            const profile = this.getAttribute(Attribute.profile) || 'Time unknown';
    
            this.shadowRoot.innerHTML = `
              <link rel="stylesheet" href="../public/src/components/userpost/userpost.css">
              
                <div class="post">
                    <div id="perfilinfo">
                        <img class="imgperfil" src="${profile}" alt="${artistName}">
                        <div class="encabezado">
                            <p>${artistName}</p>
                            <p>-</p>
                            <p>${songTime}h ago</p> 
                        </div>
                    </div>
    
                    <div id="photo">
                        <img class="img2" src="${photo}" alt="${artistName}">
                    </div>
    
                    <div class="info">
                        <div class="titulo">
                            <h2 class="songname">${songName}</h2>
                        </div>
                        <div class="subtitulo">
                            <p class="artist">By ${artistName}</p>
                             <div class="progress-bar">
                                <input type="range" min="0" max="100" value="20" class="progress-range" width="10" height="6">
                            </div>
                            <div class="player-controls">
    <button class="heart-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="6" height="6">
            <path class="heart-outline" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="#371081" stroke-width="2"/>
        </svg>
    </button>
    <div class="controles">
        <button class="prev-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="6" height="6">
                <path d="M6 19V5l8 7-8 7zm9-14v14h2V5h-2z" fill="#FFFFFF"/>
            </svg>
        </button>
        <button class="play-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="4" height="4">
                <path d="M8 5v14l11-7z" fill="#FFFFFF"/>
            </svg>
        </button>
        <button class="next-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="6" height="6">
                <path d="M10 5v14l8-7-8-7zM6 19h2V5H6v14z" fill="#FFFFFF"/>
            </svg>
        </button>
    </div>
</div>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    
    

    addHeartButtonListener() {
        const heartButton = this.shadowRoot?.querySelector(".heart-button");
        if (heartButton) {
            heartButton.addEventListener("click", () => {
                heartButton.classList.toggle("filled");
                const path = heartButton.querySelector(".heart-outline");
                if (path) {
                    if (heartButton.classList.contains("filled")) {
                        path.setAttribute("fill", "#371081"); // Relleno rosado
                        path.setAttribute("stroke", "#371081"); // Borde rosado
                    } else {
                        path.setAttribute("fill", "none"); // Sin relleno
                        path.setAttribute("stroke", "#371081"); // Borde rosado
                    }
                }
            });
        }
    }
};

customElements.define('artist-post', ArtistPost);
export default ArtistPost;