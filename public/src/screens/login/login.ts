import { dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { loginUser } from '../../utils/firebase';

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
			const title = this.ownerDocument.createElement('h1');
			title.innerText = 'Login';
			this.shadowRoot.appendChild(title);

			const pName = this.ownerDocument.createElement('input');
			pName.placeholder = 'Correo electrónico';
			pName.addEventListener('change', this.changeEmail);
			this.shadowRoot.appendChild(pName);

			const pPrice = this.ownerDocument.createElement('input');
			pPrice.placeholder = 'Contraseña';
			pPrice.addEventListener('change', this.changePassword);
			this.shadowRoot.appendChild(pPrice);

			const save = this.ownerDocument.createElement('button');
			save.innerText = 'Iniciar sesión';
			save.addEventListener('click', this.submitForm);
			this.shadowRoot.appendChild(save);
			
			const registerBack = this.ownerDocument.createElement('button');
			registerBack.innerText = 'Go to Register';
			registerBack.addEventListener('click', () => this.backToRegister());
			this.shadowRoot.appendChild(registerBack);
		}
	}
}

customElements.define('login-page', LoginPage);
export default LoginPage;