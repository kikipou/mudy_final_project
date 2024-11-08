import '../../components/header/header';
import '../../components/sidebar/sidebar';
import '../../components/buttons/buttons';
import '../../components/inputs/inputs'

class Publish extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    // changeImage(event: any) {
    //     console.log(event)
    // }

    async render() {
		if (this.shadowRoot) {

                const title = this.ownerDocument.createElement('h1');
			    title.innerText = 'Publish';
			    this.shadowRoot.appendChild(title);

                const pImage = this.ownerDocument.createElement('input');
                pImage.type = 'file';
                pImage.addEventListener('change', () => {
                    console.log(pImage.files);
                    const file = pImage.files?.[0];
                });
                this.shadowRoot.appendChild(pImage);
		}
	}
}

console.log (Publish)
customElements.define('publish-page', Publish);
export default Publish;