// import '../../components/header/header';
// import '../../components/sidebar/sidebar';
// import '../../components/buttons/buttons';
// import '../../components/inputs/inputs';
// import { uploadFile } from "../../utils/firebase";
// import { addObserver, appState, dispatch } from "../../store";
// import { navigate } from "../../store/actions";
// import { Screens } from "../../types/store";

// const profileInformation = {
//     name: '',
//     username: '',
//     genre: '',
//     tags: '',
//     profiledsc: '',
// };

// class EditProfile extends HTMLElement {

//     constructor() {
//         super();
//         this.attachShadow({ mode: 'open'});
//         addObserver(this);
//     }

//     connectedCallback() {
//         this.render();
//     }

//     changeName(e: any) {
//         profileInformation.name = e.target.value;
//     }

//     changeUserName(e: any) {
//     profileInformation.name = e.target.value;
//     }
    
//     changeGenre(e: any) {
//     profileInformation.genre = e.target.value;
//     }

//     changeTags(e: any) {
//     profileInformation.tags = e.target.value;
//     }

//     changeCoverimg(e: any) {
//     profileInformation.profiledsc= e.target.value;
//     }

//     submitForm() {        
//         dispatch(navigate(Screens.PROFILE))
//         }

//     async render() {
// 		if (this.shadowRoot) {
//             this.shadowRoot.innerHTML = `
//             <link rel="stylesheet" href="../public/src/screens/publish/publish.css">
//                 <div class="editprofile">
//                     <nav-component class="nav"
//                         explore="Explore" 
//                         create="Create"
//                         img="https://github.com/kikipou/mudy_final_project/blob/cata/mudy-logo.png?raw=true"
//                         search="Search"
//                     ></nav-component>
//                         <form class="form">
//                             <input id="name-input" placeholder="Name" required>
//                             <input id="username-input" placeholder="Username" required>
//                             <input id="genre-input" placeholder="Genre" required>
//                             <input id="tags-input" placeholder="Tags" required>
//                             <input id="profiledesc-input" placeholder="Description" required>
//                             <input id="profileimg-input" type="file" required>
//                             <button-component id="save-button" text="Save"></button-component>
//                         </form>
//                 </div>
//             `;

//             const pImage = this.shadowRoot?.querySelector("#profileimg-input") as HTMLInputElement;
//             pImage?.addEventListener("change", () => {
//             console.log(pImage);
//             const file = pImage.files?.[0];
//             if (file) uploadFile(file, appState.user.userId);
//             });

//             // Asignación de eventos
//             this.shadowRoot.querySelector('#name-input')?.addEventListener('change', this.changeName.bind(this));
//             this.shadowRoot.querySelector('#genre-input')?.addEventListener('change', this.changeGenre.bind(this));
//             this.shadowRoot.querySelector('#tags-input')?.addEventListener('change', this.changeTags.bind(this));
//             this.shadowRoot.querySelector('#profiledesc-input')?.addEventListener('change', this.changeCoverimg.bind(this));
//             this.shadowRoot.querySelector('#save-button')?.addEventListener('click', this.submitForm.bind(this));
//         }
// 	}
// }

// console.log (EditProfile)
// customElements.define('editprofile-page', EditProfile);
// export default EditProfile;