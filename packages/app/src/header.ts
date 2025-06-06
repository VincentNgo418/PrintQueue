import { html, css, LitElement } from "lit";
import { state } from "lit/decorators.js";
import reset from "./styles/reset.css.ts"

import {
  define,
  Auth,
  Dropdown,
  Events,
  Observer
} from "@calpoly/mustang";

//import headings from "./styles/headings.css.ts";

export class HeaderElement extends LitElement {

    static uses = define({
        "mu-dropdown": Dropdown.Element
     });

    _authObserver = new Observer<Auth.Model>(this, "sandbox:auth");

    @state()
    loggedIn = false;

    @state()
    userid?: string; 


    static styles = [reset.styles, css`
        :host  {
            color: var(--color-primary);
            padding-left:20px;
            padding-right:20px;
            padding-top:1em;
            padding-bottom:1em;
            background-color: var(--color-background);
            width: 100%;
            position: fixed;
            top: 0;
            display: flex;
            justify-content: space-between;
        }

        h1 {
            font-family:"GFS Didot";
        }

        nav {
            display: flex;
            flex-direction: row;
        }

        nav > * {
            margin-right: 2rem;
            text-decoration: none;
        }
        `
        
    ];
    render() {
        console.log("Header render() called with loggedIn =", this.loggedIn);
        return html`
            <h1>
                Print Queue
            </h1>
            <nav>
               
                ${this.loggedIn ?
                    this.renderSignOutButton() :
                    this.renderSignInButton()
                }
                ${this.loggedIn? html`
                    
                    <a @click=${() => location.assign("/app/queue")}>Requests</a>
                    <a href="Printer.html">Printers</a>`
                    : html`
                    
                    
                    
                    `
                }
                
                <input type="checkbox" autocomplete="off" @click=${this.toggleDarkMode}>
                <button>?</button>
            </nav>
        
        
        `;


    }

    renderSignOutButton() {
    return html`
      <button
        @click=${(e: UIEvent) => {
          Events.relay(e, "auth:message", ["auth/signout"])
          location.assign("/app/login")
        }}
      >
        Sign Out
      </button>
    `;
    }

    renderSignInButton() {
        return html`
        <a @click=${() => location.assign("/app/login")}>
            Sign In
        </a>
        `;
    }

 

            
    toggleDarkMode(event: MouseEvent) {
        event.stopPropagation();
        console.log("Toggled dark mode!");
        const target = event.target as HTMLInputElement;
        target.dispatchEvent( new CustomEvent(
            "dark-mode:toggle", {
                bubbles: true,
                detail: {checked: target.checked},
                composed: true
            }
        ))
                
    }


    connectedCallback() {
        super.connectedCallback();
         
        this._authObserver.observe((auth: Auth.Model) => {
        const { user } = auth;

        if (user && user.authenticated ) {
            this.loggedIn = true;
            this.userid = user.username;
            console.log("Called back "+this.userid+"logged in!")
        } else {
            this.loggedIn = false;
            this.userid = undefined;
            console.log("Called back "+this.userid+"logged out!")
        }
        }); 
        
    }
}