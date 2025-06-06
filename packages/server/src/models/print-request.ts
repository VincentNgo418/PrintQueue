import { html, css, LitElement } from "lit";
//import { property } from "lit/decorators.js";
import { property, state } from "lit/decorators.js";


//this is a type definition?
//can ts use this to parse JSON?
export interface Part {
    name: string;
    id: string;
    completed: number;
    started: number;
    total: number;
    failed: number;
}

export interface PrintRequest {
    print_details: {
        num: number;
        requestor: string;
        email: string;
        strength: string;
        quality: string;
        submitted: Date;
        drop: Date;
        status: string;

    };
    parts: Array<Part>;
        
}




  


