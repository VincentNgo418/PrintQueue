import {Part, PrintRequest} from "server/models/print-request";

export interface Model {
    part?: Part;
    printrequest?: PrintRequest;

}

export const init: Model = {};