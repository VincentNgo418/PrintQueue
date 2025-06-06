import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import reset from "../styles/reset.css.ts"
import { PrintRequestViewElement } from "../PrintRequest.ts";
import {
  Auth,
  Observer,
  define
} from "@calpoly/mustang";

type requestView = {
    _id: string;
    print_details: {
    requestor: string;
    status: string;
    purpose: string;
    num: string;
    drop: Date;
    submitted: Date;
  };
  parts: { total: number }[];
  
};

define({
    "print-request":PrintRequestViewElement
})



function formatDate(date: Date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().slice(-2)}`;
}


export class QueueElement extends LitElement {


    _authObserver = new Observer<Auth.Model>(this, "sandbox:auth");
    _user?: Auth.User;

    get authorization() {
    return (
        this._user?.authenticated && {
        Authorization:
            `Bearer ${(this._user as Auth.AuthenticatedUser).token}`
        }
    );
    }

    hydrate() {
        const headers: HeadersInit = {
            'Content-Type': 'application/json'
        }
        if (this.authorization) {
            Object.assign(headers, this.authorization)
        }

        //console.log("user is: "+this._user)
        fetch("/api/printrequests", {
            headers,
            method: "GET"
        })
        .then((res)=> res.json())
        .then((data: any[]) => {
            this.requests = data.map((item: any) => ({
                _id: item._id,
                print_details: {
                    requestor: item.print_details.requestor,
                    status: item.print_details.status,
                    purpose: item.print_details.purpose,
                    num: item.print_details.num,
                    drop: new Date(item.print_details.drop.$date),
                    submitted: new Date(item.print_details.submitted.$date)
                },
                parts: item.parts,
           
            }))
           
          })     
    }
    connectedCallback() {
        super.connectedCallback();
        this._authObserver.observe((auth: Auth.Model) => {
            this._user= auth.user;
            //console.log("User id: "+(this._user as Auth.AuthenticatedUser).token)
            this.hydrate();
        });
        
        
    }

    @state()
    modal_appear: boolean = false;

    @state()
    requests: Array<requestView> = [];

    @state()
    selected_request: string = "";

    disappearModalDisplay() {
        this.modal_appear = false;
    }


    appearModalDisplay(event: MouseEvent) {
        this.modal_appear = true;
        this.selected_request = (event.target as HTMLElement).id;
        console.log("New req selected id: "+this.selected_request);
    }

    

    

    static styles = [reset.styles, css`   
        :host {
            width: 70%;
        
        
        }
        th {
             border-bottom: 1px solid var(--color-border)
        }
        
        tr {
            height: 1.8rem;
            text-align: center;
        }
        
        tbody {
            margin-left: 5px;
        
        }
        
        .Queue {
            background-color: var(--color-background);
            width:100%;
        }

        .dropdown-btn {
            border: none; /* Remove borders */
            color: white; /* White text */
        }

        .overlay {
            display: block;
            align-content:center;
            position: fixed;
            top:0;
            left:0;
            width: 100%;
            height: 100%;
            background-color: var(--color-tint);

        }

        .modal-overlay {
            display:flex;
            position: fixed;
            left:15%;
            top:0;
            margin-top:12rem;
            background-color: var(--color-background);
            width:70%;
            padding-top:0.5rem;
            flex-direction: column;
            align-items: center;
        }
        `];

    render() {
        return html`
        <table class="Queue">
                    <thead>
                        <tr>
                            <th>Req #</th>
                            <th>Requestor</th>
                            <th>Submitted</th>
                            <th>Drop Date</th>
                            <th>Purpose</th>
                            <th># Parts</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tr id="Request-02" href="PrintRequest.html">
                        <td>1234</td>
                        <td>Nathan H</td>
                        <td>5/10/23</td>
                        <td>5/16/23</td>
                        <td>Personal</td>
                        <td>2</td>
                        <td>Not Started</td>
                        <td><button class="dropdown-btn" @click=${this.appearModalDisplay}>▶️</button></td>
                    </tr>
                    ${this.requests.map((request)=> {
                        return html`
                         <tr>
                            <td>${request.print_details.num}</td>
                            <td>${request.print_details.requestor}</td>
                            <td>${formatDate(request.print_details.submitted)}</td>
                            <td>${formatDate(request.print_details.drop)}</td>
                            <td>${request.print_details.purpose}</td>
                            <td>${request.parts.map((part)=>(part.total)).reduce((sum, n)=> sum+n,0)}</td>
                            <td>${request.print_details.status}</td>
                            <td><button class="dropdown-btn" id="${request._id}" @click=${this.appearModalDisplay}>▶️</button></td>
                         </tr> 
                        `;
                    })}
                   
                </table>
                ${this.modal_appear ? html`
                <div class = "overlay" @click=${this.disappearModalDisplay}>
                    <div class="modal-overlay" @click=${(e: any) => e.stopPropagation()} >
                        <print-request req-id="${this.selected_request}">
                        </print-request>

                    </div>
                </div>` : null}
    `;
    }

    // more to come
}