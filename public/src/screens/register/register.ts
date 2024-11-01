import { dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { registerUser } from '../../utils/firebase';

const credentials = {
	username: '',
	email: '',
	password: '',
	name: '',
};

class RegisterPage extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

	changeUsername(e: any) {
		credentials.username = e.target.value;
	}

    changeEmail(e: any) {
		credentials.email = e.target.value;
	}

	changePassword(e: any) {
		credentials.password = e.target.value;
	}

	changeName(e: any) {
		credentials.name = e.target.value;
	}

	async submitForm() {
		const resp = await registerUser(credentials);
		resp ? dispatch(navigate(Screens.LOGIN)) : alert('User could not be created');
	}
	
	backToLogin() {
		dispatch(navigate(Screens.LOGIN));
	}

    async render() {
		if (this.shadowRoot) {
			const title = this.ownerDocument.createElement('h1');
			title.innerText = 'Register';
			this.shadowRoot.appendChild(title);

			const pUsername = this.ownerDocument.createElement('input');
			pUsername.placeholder = 'Username';
			pUsername.required = true;
			pUsername.addEventListener('change', this.changeEmail);
			this.shadowRoot.appendChild(pUsername);

			const pEmail = this.ownerDocument.createElement('input');
			pEmail.placeholder = 'Email';
			pEmail.required = true;
			pEmail.addEventListener('change', this.changeEmail);
			this.shadowRoot.appendChild(pEmail);

			const pPassword = this.ownerDocument.createElement('input');
			pPassword.placeholder = 'Password';
			pPassword.type = 'password';
			pPassword.required = true;
			pPassword.addEventListener('change', this.changePassword);
			this.shadowRoot.appendChild(pPassword);

			const pName = this.ownerDocument.createElement('input');
			pName.placeholder = 'Name';
			pName.required = true;
			pName.addEventListener('change', this.changeName);
			this.shadowRoot.appendChild(pName);

			const save = this.ownerDocument.createElement('button');
			save.innerText = 'Sign Up';
			save.addEventListener('click', this.submitForm);
			this.shadowRoot.appendChild(save);

			const backToLogin = this.ownerDocument.createElement('button');
			save.innerText = 'Log In';
			save.addEventListener('click', this.submitForm);
			this.shadowRoot.appendChild(backToLogin);
		}
	}
}

customElements.define('register-page', RegisterPage);
export default RegisterPage;