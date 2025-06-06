import { html, css, LitElement } from "lit";
import { state } from "lit/decorators.js";

import {
  define,
  Auth,
  Dropdown,
  Events,
  Observer
} from "@calpoly/mustang";

import reset from "./styles/reset.css.ts";

export class HeaderElement extends LitElement {

    static uses = define({
        "mu-dropdown": Dropdown.Element
     });

    _authObserver = new Observer<Auth.Model>(this, "sbx:auth");

    @state()
    loggedIn = false;

    @state()
    userid?: string;


    static styles = [reset.styles, css`
        
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
        return html`
            <h1>
                Print Queue
            </h1>
            <nav>
               
                ${this.loggedIn ?
                    this.renderSignOutButton() :
                    this.renderSignInButton()
                }
                <a href="index.html">Requests</a>
                <a href="Printer.html">Printers</a>
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
        }}
      >
        Sign Out
      </button>
    `;
    }

    renderSignInButton() {
        return html`
        <a href="/login.html">
            Sign In…
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
        } else {
            this.loggedIn = false;
            this.userid = undefined;
        }
        });
    }
}