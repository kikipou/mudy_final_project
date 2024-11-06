import { dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { loginUser } from '../../utils/firebase';
import '../../components/buttons/buttons';
import '../../components/inputs/inputs'

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
			<link rel="stylesheet" href="../public/src/screens/login/login.css">
			
				<div class="login">
				<form class="form">
				<img class="img" src="https://github.com/kikipou/mudy_final_project/blob/cata/mudy-logo.png?raw=true"/>
                <input id="email-input" placeholder="Email" required>
				<input id="password-input" placeholder="Password" type="password" required>
				<button-component id="login-button" text="Log In"></button-component>
				<div class="register">
				<p>Not registered yet?</p>
				<button id="register-button">Go to Register</button>
				</div>
				</form>
				</div>
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
