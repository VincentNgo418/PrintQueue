import express, { Request, Response } from "express";
import { PrintRequest } from "../models/print-request";

import PrintRequests from "../services/print-request-service";

const router = express.Router();

//get print queue data, requires page number (zero indexed)
router.get("/", (req, res: Response) => {
  const skip = (parseInt(req.query.index as string) || 0);
  PrintRequests.getPrintQueue(skip)
    .then((list: PrintRequest[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:requestid", (req: Request, res: Response) => {
  const { requestid } = req.params;
  console.log("server received req!")
  PrintRequests.get(requestid)
    .then((printrequest: PrintRequest) => res.json(printrequest))
    .catch((err) => res.status(404).send(err));
});

//create new request
router.post("/", (req: Request, res: Response) => {
  const newTraveler = req.body;

  PrintRequests.create(newTraveler)
    .then((printrequest: PrintRequest) =>
      res.status(201).json(printrequest)
    )
    .catch((err) => res.status(500).send(err));
});

//updates a request
router.put("/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;
  const newPrintRequest = req.body;

  PrintRequests.update(userid, newPrintRequest)
    .then((printrequest: PrintRequest) => res.json(printrequest))
    .catch((err) => res.status(404).end());
});

//
router.delete("/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;

  PrintRequests.remove(userid)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router

