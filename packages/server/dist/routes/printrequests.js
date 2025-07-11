"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var printrequests_exports = {};
__export(printrequests_exports, {
  default: () => printrequests_default
});
module.exports = __toCommonJS(printrequests_exports);
var import_express = __toESM(require("express"));
var import_print_request_service = __toESM(require("../services/print-request-service"));
const router = import_express.default.Router();
router.get("/", (req, res) => {
  const skip = parseInt(req.query.index) || 0;
  import_print_request_service.default.getPrintQueue(skip).then((list) => res.json(list)).catch((err) => res.status(500).send(err));
});
router.get("/:requestid", (req, res) => {
  const { requestid } = req.params;
  console.log("server received req");
  import_print_request_service.default.get(requestid).then((printrequest) => res.json(printrequest)).catch((err) => res.status(404).send(err));
});
router.post("/", (req, res) => {
  const newTraveler = req.body;
  import_print_request_service.default.create(newTraveler).then(
    (printrequest) => res.status(201).json(printrequest)
  ).catch((err) => res.status(500).send(err));
});
router.put("/:userid", (req, res) => {
  const { userid } = req.params;
  const newPrintRequest = req.body;
  import_print_request_service.default.update(userid, newPrintRequest).then((printrequest) => res.json(printrequest)).catch((err) => res.status(404).end());
});
router.delete("/:userid", (req, res) => {
  const { userid } = req.params;
  import_print_request_service.default.remove(userid).then(() => res.status(204).end()).catch((err) => res.status(404).send(err));
});
var printrequests_default = router;
