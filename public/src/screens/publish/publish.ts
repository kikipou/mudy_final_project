import '../../components/header/header';
import '../../components/sidebar/sidebar';
import '../../components/buttons/buttons';
import '../../components/inputs/inputs';
import { addPost } from "../../utils/firebase";
import { addObserver, appState, dispatch } from "../../store";
import { getPostsAction, navigate } from "../../store/actions";
import { Screens } from "../../types/store";
import { Post } from "../../types/post";
import { uploadPost, getPost } from "../../utils/firebase";

const post: Post = {
    title: "",
    genre: "",
    tags: "",
    coverimg: "",
  };

  export const generateUniqueFileName = (userId: string, fileName: string): string => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);  // Genera una cadena aleatoria
    return `imagesPost/${userId}-${fileName}-${timestamp}-${randomString}`;
};

class Publish extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open'});
        addObserver(this);
    }

    connectedCallback() {
        this.render();
    }

    changeName(e: any) {
        post.title = e.target.value;
      }
    
      changeGenre(e: any) {
        post.genre = e.target.value;
      }

      changeTags(e: any) {
        post.tags = e.target.value;
      }
    
      changeCoverimg(e: any) {
        post.coverimg = e.target.value;
      }

    submitForm() {
        console.log(post)
        addPost(post);
        console.log('Post added in create post');
        
        dispatch(navigate(Screens.DASHBOARD))
        console.log(appState.user);
        }

    async render() {
		if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="../public/src/screens/publish/publish.css">
              <div class="publish">
                  <nav-component class="nav"
                      explore="Explore" 
                      create="Create"
                      img="https://github.com/kikipou/mudy_final_project/blob/cata/mudy-logo.png?raw=true"
                      search="Search"
                  ></nav-component>
                        <form class="form">
                          <input id="name-input" placeholder="Song name" required>
                          <input id="genre-input" placeholder="Genre" required>
                          <input id="tags-input" placeholder="Tags" required>
                          <input id="coverimg-input" type="file" required>
                          <img id="postImg" src="">
                          <button-component id="publish-button" text="Publish"></button-component>
                        </form>
              </div>
            `;

        // Referencia al input de tipo file y al elemento img
        const pImage = this.shadowRoot.querySelector('#coverimg-input') as HTMLInputElement;
        const postImg = this.shadowRoot.querySelector('#postImg') as HTMLImageElement;

        // Asigna el evento al input para subir el archivo cuando cambie
        if (pImage && postImg) {
          pImage.addEventListener('change', async () => {
              const file = pImage.files?.[0];
              if (file) {
                  // Muestra la imagen inmediatamente usando URL.createObjectURL
                  postImg.src = URL.createObjectURL(file);
                  
                  // Genera un identificador único para el archivo (por ejemplo, usando el ID de usuario)
                  const userId = 'user123';  // Aquí usa el ID de usuario real o cualquier identificador único

                  // Genera el nombre único del archivo usando la función
                  const uniqueFileName = generateUniqueFileName(userId, file.name);

                  // Sube el archivo con el nombre único generado
                  await uploadPost(file, userId, uniqueFileName);

                  // Opcional: Limpia el objeto URL creado para liberar memoria
                  URL.revokeObjectURL(postImg.src);

                  // Usa el nombre único para obtener la URL desde Firebase Storage
                  const urlImg = await getPost(uniqueFileName);
                  
                  // Actualiza el src de la imagen con la URL obtenida del servidor
                  postImg.src = String(urlImg);
              }
          });
        }
      // Asignación de eventos
      this.shadowRoot.querySelector('#name-input')?.addEventListener('change', this.changeName.bind(this));
      this.shadowRoot.querySelector('#genre-input')?.addEventListener('change', this.changeGenre.bind(this));
      this.shadowRoot.querySelector('#tags-input')?.addEventListener('change', this.changeTags.bind(this));
      this.shadowRoot.querySelector('#publish-button')?.addEventListener('click', this.submitForm.bind(this));
    }
	}
}

console.log (Publish)
customElements.define('publish-page', Publish);
export default Publish;