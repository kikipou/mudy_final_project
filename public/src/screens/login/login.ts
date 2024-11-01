import { dispatch } from '../store';
import { navigate } from '../store/actions';
import { Screens } from '../types/store';
import { loginUser } from '../utils/firebase';

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

	submitForm() {
		loginUser(credentials.email, credentials.password);
	}


    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="./register.css">
                <div class="body">
                    <nav-component class="nav"
                        img="https://github.com/kikipou/mudy_final_project/blob/cata/mudy-logo.png?raw=true"
                        ></nav-component>
                        <sidebar-component 
                    ></sidebar-component>
                </div>
            `;
        }
    }
}
console.log (LoginPage)
customElements.define('register-page', LoginPage);
export default LoginPage;