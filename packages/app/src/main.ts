import {
  Auth,
  define,
  History,
  Switch,
  Store
} from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { HeaderElement } from "./header.ts";
import { HomeViewElement} from "./views/home-view.ts";
import {QueueElement} from "./views/queue-view.ts";
import { LoginElement } from "./views/login-view.ts";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";

const routes = [

  {
    path: "/app",
    view: () => html`
      <landing-view></landing-view>
    `
  },
  {
    path: "/app/queue",
    view: () => html`
      <queue-view></queue-view>
    `
  },
  {
    path: "/app/login",
    view: () => html`
      <login-view></login-view>
    `
    
  },
  {
    path: "/",
    redirect: "/app"
  }
];

define({
  "mu-auth": Auth.Provider,
  
  "mu-history": History.Provider,
  "sb-header": HeaderElement,
  "queue-view": QueueElement,
  "landing-view": HomeViewElement,
  "login-view": LoginElement,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "sandbox:history", "sandbox:auth");
    }
  },
  "mu-store": class AppStore extends Store.Provider<Model, Msg> {
    constructor() {
       super(update, init, "sandbox:auth");    }
  }
});