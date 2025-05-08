import { html, css, LitElement } from "lit";
//import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts"
import { property, state } from "lit/decorators.js";


//this is a type definition?
//can ts use this to parse JSON?
type part = {
    name: string;
    id: string;
    completed: number;
    started: number;
    total: number;
    failed: number;
}

type printRequest = {
    print_details: {
        requestor: string;
        email: string;
        strength: string;
        quality: string;

    };
    parts: Array<part>;
        
}


export class PrintRequestElement extends LitElement {
    @property()
    src?: string;
    

    defaultRequest: printRequest = {
        print_details:{
            requestor:"",
            email:"",
            strength:"",
            quality:""
        },
        parts: []
    }

    @state()
    //why do I need to use the this keyword?
    request: printRequest = this.defaultRequest;
    

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

    connectedCallback() {
        super.connectedCallback();
        if (this.src) {
            console.log("1");
            this.hydrate(this.src);
        }
      }

    hydrate(src: string) {
        fetch(src)
            .then(res => res.json())
            .then((json: object) => {
            if(json) {
                this.request = json as printRequest;

                console.log(this.request.print_details.email)
                
        }
    })


    }

    string : string = ""
    fetchPrintRequest(reqID: bigint) {
        console.log(reqID);
        //send a fetch request to mongo for this
        //calls hydrate

    }


    override render() {

        function renderPart(p: part) {
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