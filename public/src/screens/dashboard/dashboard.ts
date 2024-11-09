import { artistasIndependientes } from '../../data/data';
import '../../components/header/header';
import ArtistPost, { Attribute } from '../../components/userpost/userpost';
import '../../components/sidebar/sidebar';
import { Post } from '../../types/post';
import { addPost, getPosts, uploadPost, getPost } from '../../utils/firebase';
import { addObserver, appState, dispatch } from '../../store';
import { getPostsAction } from '../../store/actions';

class Dashboard extends HTMLElement {

    Posts: ArtistPost[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.loadSongs();
    }

    async loadSongs() {
        const songs = await getPosts();
        const songListContainer = this.shadowRoot?.querySelector("#song-list");
        console.log('container', songListContainer);
        if(songListContainer){
            songs?.forEach((songData) => {
                console.log('songdata', songData);
                

                const songprops = document.createElement("artist-post") as ArtistPost;
                songprops.setAttribute("songName", songData.title);
                songprops.setAttribute("genre", songData.genre);
                songprops.setAttribute("albumcover", songData.albumcover);
                songListContainer.appendChild(songprops);
    
            });

        }
        this.render()
        
        
        
        
        
        console.log('songs dash', songs);
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../public/src/screens/dashboard/dashboard.css">
                <div class="body">
                    <nav-component class="nav"
                        explore="Explore" 
                        create="Create"
                        img="https://github.com/kikipou/mudy_final_project/blob/cata/mudy-logo.png?raw=true"
                        search="Search"
                        ></nav-component>
                            
                            <div id="song-list"></div>
                            <artist-post songname='hola' albumcover='link'></artist-post>
                        <sidebar-component 
                    ></sidebar-component>
                </div>
            `;
            
        }
    }
}
console.log (Dashboard)
customElements.define('dashboard-page', Dashboard);
export default Dashboard;