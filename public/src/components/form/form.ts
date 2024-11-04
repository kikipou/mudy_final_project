export enum Attributesinput {
    'text' = 'text'
 }
 
 class Input extends HTMLElement {
     text?: string;
    
 
     constructor() {
         super();
         this.attachShadow({ mode: 'open' });
     }
 
     static get observedAttributes() {
         return Object.keys(Attributesinput);
     }
 
     attributeChangedCallback(propName: Attributesinput, oldValue: string | undefined, newValue: string | undefined) {
         this[propName] = newValue;
         this.render();
     }
 
     connectedCallback() {
         this.render();
     }
 
     render() {
         if (this.shadowRoot) {
             this.shadowRoot.innerHTML = `
             <link rel="stylesheet" href="../public/src/components/inputs/inputs.css">
                 
                             <button class="button">${this.text}</button>
                          
                        
               
             `;
             
      
         }
     }
 }
 
 customElements.define('button-component', Input);
 export default Input;