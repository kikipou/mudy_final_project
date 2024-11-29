import { addObserver, appState, dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { upLoadFile,  updateUserData } from '../../utils/firebase';
import '../../components/sidebar/sidebar'
import '../../components/header/header'

const profileData = {
  name: '',
  avatarUrl: '',
};

class EditProfile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    addObserver(this);
  }

  async connectedCallback() {
    const userId = appState.user;
    console.log('ID del usuario:', userId);
    this.render();
  }

  async changeScreen() {
    dispatch(navigate(Screens.PROFILE));
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="../public/src/screens/editprofile/editprofile.css">
        <nav-component class="nav"
                        explore="Explore" 
                        create="Create"
                        img="https://github.com/kikipou/mudy_final_project/blob/cata/mudy-logo.png?raw=true"
                        search="Search"
                    ></nav-component>
                    <sidebar-component></sidebar-component>
      `;

      // Contenedor principal
      const mainContainer = document.createElement('section');
      mainContainer.classList.add('maincontainer');

      const container = document.createElement('section');
      container.classList.add('edit-profile-container');
      mainContainer.appendChild(container);

      // Sección de perfil
      const profileSection = document.createElement('div');
      profileSection.classList.add('profile-section');
      container.appendChild(profileSection);

      // Sección del formulario
      const formSection = document.createElement('div');
      formSection.classList.add('form-section');
      container.appendChild(formSection);

      // Campo de la imagen
      const pImage = this.ownerDocument.createElement('input');
      pImage.classList.add('input');
      pImage.type= 'file'; 
      pImage.addEventListener('change', () => {
        console.log(pImage);
        const file = pImage.files?.[0]
        if (file) upLoadFile(file, appState.user);
      })
      formSection.appendChild(pImage);

      const nameInput = document.createElement('input');
      nameInput.value = profileData.name;
      nameInput.classList.add('input');
      nameInput.placeholder = 'Name';
      formSection.appendChild(nameInput);

      const saveButton = document.createElement('button');
      saveButton.innerText = 'Save Changes';
      saveButton.classList.add('save-button');
      saveButton?.addEventListener('click', () => dispatch(navigate(Screens.PROFILE)));
      saveButton.addEventListener('click', async () => {
        const updatedName = nameInput.value;
        const userId = appState.user;

      // Actualizar en Firebase
      await updateUserData (userId, updatedName)
      });
      formSection.appendChild(saveButton);

      this.shadowRoot.appendChild(mainContainer);
    }
  }
}

customElements.define('editprofile-page', EditProfile);