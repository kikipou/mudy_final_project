export enum Attributes {
    'name' = 'name',
}

class Input extends HTMLElement {
    name?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return [Attributes.name];
    }

    attributeChangedCallback(propName: Attributes, oldValue: string | undefined, newValue: string | undefined) {
        this[propName] = newValue;
        this.render();
    }

    handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        this.setAttribute(Attributes.name, target.value);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <div>
                    <input type="text" value="${this.name || ''}" />
                    <div>Hello, ${this.name || 'please enter your name!'}</div>
                </div>
            `;

            const inputElement = this.shadowRoot.querySelector('input');
            if (inputElement) {
                inputElement.addEventListener('input', this.handleInput.bind(this));
            }
        }
    }
}

customElements.define('input-component', Input);
export default Input;
