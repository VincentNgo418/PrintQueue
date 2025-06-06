"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var print_request_service_exports = {};
__export(print_request_service_exports, {
  default: () => print_request_service_default,
  getPrintQueue: () => getPrintQueue,
  getPrintRequest: () => getPrintRequest
});
module.exports = __toCommonJS(print_request_service_exports);
var import_mongoose = require("mongoose");
const PartSchema = new import_mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  completed: { type: Number, required: true },
  started: { type: Number, required: true },
  total: { type: Number, required: true },
  failed: { type: Number, required: true }
});
const PrintRequestSchema = new import_mongoose.Schema(
  {
    print_details: {
      requestor: { type: String, required: true },
      email: { type: String, required: true },
      strength: { type: String, required: true },
      quality: { type: String, required: true }
    },
    parts: [PartSchema]
  },
  { collection: "print-queue" }
);
const PrintRequestModel = (0, import_mongoose.model)(
  "PrintRequest",
  PrintRequestSchema
);
function index() {
  return PrintRequestModel.find();
}
function get(userid) {
  return PrintRequestModel.findById(userid).then((printRequest) => {
    if (!printRequest) throw `${userid} Not Found`;
    return printRequest;
  }).catch((err) => {
    throw `${userid} Not Found`;
  });
}
function create(json) {
  const t = new PrintRequestModel(json);
  return t.save();
}
function update(userid, printrequest) {
  return PrintRequestModel.findOneAndUpdate({ userid }, printrequest, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${userid} not updated`;
    else return updated;
  });
}
function remove(userid) {
  return PrintRequestModel.findOneAndDelete({ userid }).then(
    (deleted) => {
      if (!deleted) throw `${userid} not deleted`;
    }
  );
}
function getPrintRequest(requestid) {
  return PrintRequestModel.findById(requestid).then((printRequest) => {
    if (!printRequest) throw `${requestid} Not Found`;
    return printRequest;
  }).catch((err) => {
    throw `${requestid} Not Found`;
  });
}
function getPrintQueue(page) {
  return PrintRequestModel.find({}).sort({ status: -1, submitted: -1 }).skip(page * 25).limit(25).select("print_details.requestor print_details.num print_details.submitted print_details.drop print_details.purpose parts.total print_details.status").then((printrequests) => {
    if (!printrequests) throw `More Requests Not Found`;
    return printrequests;
  });
}
var print_request_service_default = { index, get, create, update, remove, getPrintQueue };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPrintQueue,
  getPrintRequest
});
