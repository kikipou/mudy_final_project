import { dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { registerUser } from '../../utils/firebase';
import '../../components/buttons/buttons';

const credentials = {
	username: '',
	email: '',
	password: '',
	name: '',
    musicgenre: '',
    profiledesc: '',
};

class RegisterPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    changeUsername(e: Event) {
        credentials.username = (e.target as HTMLInputElement).value;
    }

    changeEmail(e: Event) {
        credentials.email = (e.target as HTMLInputElement).value;
    }

    changePassword(e: Event) {
        credentials.password = (e.target as HTMLInputElement).value;
    }

    changeName(e: Event) {
        credentials.name = (e.target as HTMLInputElement).value;
    }

    changeGenre(e: Event) {
        credentials.musicgenre = (e.target as HTMLInputElement).value;
    }

    changeDescription(e: Event) {
        credentials.profiledesc = (e.target as HTMLTextAreaElement).value;
    }

    backToLogin() {
        dispatch(navigate(Screens.LOGIN));
    }

    async submitForm() {
        const resp = await registerUser(credentials);
        resp ? dispatch(navigate(Screens.DASHBOARD)) : alert('Could not create user');
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
			<link rel="stylesheet" href="../public/src/screens/register/register.css">
            
				<div class="register">
                    <form >
                        <div class="info">
                            <img class="img" src="https://github.com/kikipou/mudy_final_project/blob/cata/mudy-logo.png?raw=true"/>
                                <input id="username-input" placeholder="Username" required>
                                <input id="email-input" placeholder="Email" type="email" required>
                                <input id="password-input" placeholder="Password" type="password" required>
                                <input id="name-input" placeholder="Full name" required>
                                <label for="genre-select">Select your favorite music genre</label>
                                    <select id="genre-select" required>
                                        <option value="">-- Select genre --</option>
                                        <option value="rock">Rock</option>
                                        <option value="pop">Pop</option>
                                        <option value="hiphop">Hip-Hop</option>
                                        <option value="jazz">Jazz</option>
                                        <option value="classical">Classical</option>
                                        <option value="indie">Indie</option>
                                        <option value="rnb">R&B</option>
                                        <option value="electronic">Electronic</option>
                                        <option value="rap">Rap</option>
                                        <option value="trap">Trap</option>
                                        <option value="reggae">Reggae</option>
                                        <option value="reggaeton">Reggaeton</option>
                                    </select>
                                        <label for="description-input">Profile Description</label>
                                        <textarea id="description-input" placeholder="Tell the others about yourself..." rows="4" required></textarea>
                                            <button id="register-button">Sign Up</button>
                                                <div class="Login">
                                                    <p>Already registered?</p>
                                                    <button type="button" id="login-back-button">Go to Log In</button>
                                                </div>
                        </div>
                    </form>
				</div>
            `;

            // Asignación de eventos
            this.shadowRoot.querySelector('#username-input')?.addEventListener('change', this.changeUsername.bind(this));
            this.shadowRoot.querySelector('#email-input')?.addEventListener('change', this.changeEmail.bind(this));
            this.shadowRoot.querySelector('#password-input')?.addEventListener('change', this.changePassword.bind(this));
            this.shadowRoot.querySelector('#name-input')?.addEventListener('change', this.changeName.bind(this));
            this.shadowRoot.querySelector('#genre-select')?.addEventListener('change', this.changeGenre.bind(this));
            this.shadowRoot.querySelector('#description-input')?.addEventListener('change', this.changeDescription.bind(this));
            this.shadowRoot.querySelector('#register-button')?.addEventListener('click', (e) => {
                e.preventDefault();
                this.submitForm();
            });
            this.shadowRoot.querySelector('#login-back-button')?.addEventListener('click', () => this.backToLogin());
        }
    }
}

customElements.define('register-page', RegisterPage);
export default RegisterPage;
