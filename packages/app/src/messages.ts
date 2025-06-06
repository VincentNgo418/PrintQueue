import {Part, PrintRequest} from "server/models/print-request";

export type Msg = 
    | ["request/select", {requestid: string}]
    | ["request/save", {requestid: string, printrequest:PrintRequest}]