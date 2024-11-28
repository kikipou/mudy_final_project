import './screens/register/register';
import './screens/dashboard/dashboard';
import './screens/login/login';
import './screens/publish/publish';
import './screens/profile/profile';
import './screens/editprofile/editprofile'
import { addObserver, appState } from './store';
import { Screens } from './types/store';

class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
		console.log(appState)
		console.log('screen', appState.screen);
		
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = '';
			switch (appState.screen) {
				case Screens.REGISTER:
					const register = this.ownerDocument.createElement('register-page');
					this.shadowRoot.appendChild(register);
					break;

				case Screens.LOGIN:
					const login = this.ownerDocument.createElement('login-page');
					this.shadowRoot.appendChild(login);
					break;

				case Screens.DASHBOARD:
					const dashboard = this.ownerDocument.createElement('dashboard-page');
					this.shadowRoot.appendChild(dashboard);
					break;

				case Screens.PUBLISH:
					const publish = this.ownerDocument.createElement('publish-page');
					this.shadowRoot.appendChild(publish);
					break;

				case Screens.PROFILE:
					const profile = this.ownerDocument.createElement('profile-page');
					this.shadowRoot.appendChild(profile);
					break;

				case Screens.EDITPROFILE:
					const editProfile = this.ownerDocument.createElement('editprofile-page');
					this.shadowRoot.appendChild(editProfile);
					break;

				default:
					break;
			}
		}
	}
}

customElements.define('app-container', AppContainer);