import { html, css, LitElement } from "lit";
import reset from "./styles/reset.css.ts"
import { property, state } from "lit/decorators.js";
import { define, View } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import {Part, PrintRequest} from "server/models/print-request.ts"

export class PrintRequestViewElement extends View<Model,Msg> {
    @property({attribute: "req-id"})
    reqid?: string;

    @state()
    get request(): PrintRequest {
        return this.model.printrequest ? 
        this.model.printrequest :
        this.defaultRequest;

    }


    constructor() {
        super("sandbox:model");
    }

    defaultRequest: PrintRequest = {
        
        print_details:{
            num: 0,
            requestor:"",
            email:"",
            strength:"",
            quality:"",
            submitted: new Date("2000-01-01T00:00:00.000Z"),
            drop: new Date("2000-01-01T00:00:00.000Z"),
            status: "in-progress"
        },
        parts: []
    }


    attributeChangedCallback(
        name: string,
        oldValue: string,
        newValue: string
        ) {
        super.attributeChangedCallback(name, oldValue, newValue);
        console.log("reqid changed: "+newValue);
        if (
            name === "req-id" &&
            oldValue !== newValue &&
            newValue
        ) {
            this.dispatchMessage([
            "request/select",
            { requestid: newValue }
            ]);
        }
    }


    static styles = [
        reset.styles,
        css`
        .wrapper{
            display:flex;
            flex-direction:column;
            align-items:center;
        
        }

        h2 {
            text-align:center;
        }

        .request-details {
            display:grid;
            grid-template-columns:1fr 1fr;
            grid-template-rows: 1fr 1fr;
            padding-left:4em;
            padding-right:2em;
        }
        .grid-pair {
            display:flex

        }
        .grid-pair * {
            margin-right: 0.6em;
        }

        .msg-box {
            width: 80%;
            height: 15rem;
            margin-top: 2rem;
            margin-bottom:2rem;
            background-color: var(--color-off-white);

        }
        `

    ];

   

/*     string : string = ""
    fetchPrintRequest(reqID: string) {
        console.log(reqID);
        fetch("/api/printrequests/"+"683b8494203c3ea3a6e50307", {
            method: "GET"

        })
            .then(res => res.json())
            .then((json: object) => {
                if(json) {
                     this.request = json as PrintRequest;
                     console.log(this.request.print_details.email)
                }

            }) 
    } */


    override render() {
        console.log("rerendering");
        function renderPart(p: Part) {
            var status: string = "";

            if (p.started != 0) {
                status = p.completed+"/"+p.total;
            }

            return html`
            <tr>
                <td></td>
                <td>${p.name}</td>
                <td>${status}</td>
            </tr>
            `
        }

        return html`
            <div class="wrapper">
                    <h2>
                        Request #1234
                    </h2>
                    <dl class="request-details">
                        <div class="grid-pair">
                            <dt>Requestor: </dt>
                            <dd>${this.request.print_details.requestor}</dd>
                        </div>
                        <div class="grid-pair">
                            <dt>Email: </dt>
                            <dd>${this.request.print_details.email}</dd>
                        </div>
                        <div class="grid-pair">
                            <dt>Print Strength: </dt>
                            <dd>${this.request.print_details.strength}</dd>
                        </div>
                        <div class="grid-pair">
                            <dt>Surface Quality: </dt>
                            <dd>${this.request.print_details.quality}</dd>
                        </div>
                    </dl>

                    <div class="msg-box">

                    </div>
                    <table>
                        <thead>
                            <th></th>
                            <th>Part Name</th>
                            <th>Status</th>
                        </thead>
                        <tbody>
                            ${this.request.parts.map(renderPart)}
                        </tbody>
                    </table>
            </div>
        `;

    }


}