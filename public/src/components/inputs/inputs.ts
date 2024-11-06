export enum Attributesinput {
    'text' = 'text',
    'uid'='uid',
    'type'='type',
 }
 
 class Input extends HTMLElement {
     text?: string;
     uid?:string
     type?:string
    
 
     constructor() {
         super();
         this.attachShadow({ mode: 'open' });
     }
 
     static get observedAttributes() {
         return Object.keys(Attributesinput);
     }
     attributeChangedCallback(propName: Attributesinput, oldValue: string | undefined, newValue: string | undefined) {
        this[propName] = newValue || ''; // Asigna una cadena vacía si newValue es undefined
        this.render(); // Vuelve a renderizar el componente
    }
    
 
     connectedCallback() {
         this.render();
     }
 
     render() {
         if (this.shadowRoot) {
             this.shadowRoot.innerHTML = `
             <link rel="stylesheet" href="../public/src/components/inputs/inputs.css">
                 
            <input type=${this.type} placeholder=${this.text}>
                          
                        
               
             `;
             
      
         }
     }
 }
 
 customElements.define('input-component', Input);
 export default Input;