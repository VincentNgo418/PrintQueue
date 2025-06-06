import { html, LitElement } from "lit";
//import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts"
import { state } from "lit/decorators.js";

export class PrintRequestElement extends LitElement {

    @state() requests: Array<any> = [];

    index: number = 0;

    fetch_content(index:number) {
        fetch("/api/printrequests/", {
            method:"GET"
            //TODO
        })
        console.log(index);

    }


    connectedCallback(): void {
        super.connectedCallback();
        this.fetch_content(0);
    }

    handleScroll(e: Event) {
        const target = e.target as HTMLElement;

        if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
            // close to bottom, load more items
            this.index += 1;
            this.fetch_content(this.index);
        }
    }

    static styles = [
            reset.styles];

    override render() {
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
                <tr id="Request-01" href="PrintRequest.html">
                    <th>1234</th>
                    <th>Vincent N</th>
                    <th>5/10/23</th>
                    <th>5/16/23</th>
                    <th>Personal</th>
                    <th>2</th>
                    <th>Not Started</th>
                    <th><button class="dropdown-btn"><svg class="drop-icon"><use href="assets/nav.svg#icon-dropdown"/></svg></button></th>
                </tr>
                ${this.requests.map(() => {return html``}) }
            </table>

        `;       


    }




}