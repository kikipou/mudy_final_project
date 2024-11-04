export enum Attributesbutton {
   'text' = 'text'
}

class Button extends HTMLElement {
    text?: string;
   

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.keys(Attributesbutton);
    }

    attributeChangedCallback(propName: Attributesbutton, oldValue: string | undefined, newValue: string | undefined) {
        this[propName] = newValue;
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="../public/src/components/buttons/buttons.css">
                
                            <button class="button">${this.text}</button>
                         
                       
              
            `;
            
     
        }
    }
}

customElements.define('button-component', Button);
export default Button;