import { Schema, model } from "mongoose";
import { Part, PrintRequest } from "../models/print-request";


const PartSchema = new Schema<Part> ({
    name: { type: String, required: true },
    id: { type: String, required: true },
    completed: { type: Number, required: true },
    started: { type: Number, required: true },
    total: { type: Number, required: true },
    failed: { type: Number, required: true }
});


const PrintRequestSchema: Schema = new Schema<PrintRequest>({
   
    print_details: {
        requestor: { type: String, required: true },
        email: { type: String, required: true },
        strength: { type: String, required: true },
        quality: { type: String, required: true }
    },
    parts: [PartSchema]



    }, { collection :"print-queue" }

)

const PrintRequestModel = model<PrintRequest>(
  "PrintRequest",
  PrintRequestSchema
);

function index(): Promise<PrintRequest[]> {
  return PrintRequestModel.find();
}

function get(userid: String): Promise<PrintRequest> {
  return PrintRequestModel.findById(userid)
    .then((printRequest) => {
        if(!printRequest) throw `${userid} Not Found`;
        return printRequest;

    })
    .catch((err) => {
      throw `${userid} Not Found`;
    });
}

function create(json: PrintRequest) {
    const t = new PrintRequestModel(json);
    return t.save();

}

function update( userid: String, printrequest: PrintRequest): Promise<PrintRequest> {
  return PrintRequestModel.findOneAndUpdate({ userid }, printrequest, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${userid} not updated`;
    else return updated as PrintRequest
  });
}

function remove(userid: String): Promise<void> {
  return PrintRequestModel.findOneAndDelete({ userid }).then(
    (deleted) => {
      if (!deleted) throw `${userid} not deleted`;
    }
  );
}

export function getPrintRequest(requestid: string) {
  return PrintRequestModel.findById(requestid)
    .then((printRequest) => {
        if(!printRequest) throw `${requestid} Not Found`;
        return printRequest;

    })
    .catch((err) => {
      throw `${requestid} Not Found`;
    });


}

export function getPrintQueue(page: number) {
  return PrintRequestModel.find({})
    .sort({status: -1, submitted: -1})
    .skip(page*25)
    .limit(25)
    .select("print_details.requestor print_details.num print_details.submitted print_details.drop print_details.purpose parts.total print_details.status")
    .then((printrequests)=> {
      if(!printrequests) throw `More Requests Not Found`;
        return printrequests;

    });
}

export default { index, get, create, update, remove, getPrintQueue };