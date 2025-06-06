import {css, html, LitElement} from "lit";
import { LoginFormElement } from "../auth/login-form";
import { define, Auth } from "@calpoly/mustang";

define({
      "mu-auth": Auth.Provider,
      "login-form": LoginFormElement
});

export class LoginElement extends LitElement {
  
    static styles = [];
    
    

    render() {
    return html`
    <mu-auth>
    <h2>User Login</h2>
    <main class="card">
      <login-form api="/auth/login">
        <label>
          <span>Username:</span>
          <input name="username" autocomplete="off" />
        </label>
        <label>
          <span>Password:</span>
          <input type="password" name="password" />
        </label>
      </login-form>
    </main>
    <p>Or did you want to
      <a href="new-user.html">Sign up as a new user</a>?
    </p>
  </mu-auth>
    `;
  }
}