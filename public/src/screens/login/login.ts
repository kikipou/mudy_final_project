import { dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { loginUser } from '../../utils/firebase';
import  '../../components/buttons/buttons';

const credentials = {
	email: '',
	password: '',
};

class LoginPage extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    changeEmail(e: any) {
		credentials.email = e.target.value;
	}

	changePassword(e: any) {
		credentials.password = e.target.value;
	}

	backToRegister() {
		dispatch(navigate(Screens.REGISTER));
	}

	submitForm() {
		loginUser(credentials.email, credentials.password);
	}

    async render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<h1>Login</h1>
				<input id="email-input" placeholder="Email" required>
				<input id="password-input" placeholder="Password" type="password" required>
				<button id="login-button">Log In</button>
				<button id="register-button">Go to Register</button>
				<button-component></button-component>
			`;

			// Asignación de eventos
			this.shadowRoot.querySelector('#email-input')?.addEventListener('change', this.changeEmail.bind(this));
			this.shadowRoot.querySelector('#password-input')?.addEventListener('change', this.changePassword.bind(this));
			this.shadowRoot.querySelector('#login-button')?.addEventListener('click', this.submitForm.bind(this));
			this.shadowRoot.querySelector('#register-button')?.addEventListener('click', this.backToRegister.bind(this));
		}
	}
}

customElements.define('login-page', LoginPage);
export default LoginPage;
