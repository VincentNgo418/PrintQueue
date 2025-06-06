// app/src/update.ts
import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { PrintRequest } from "server/models/print-request";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  switch (message[0]) {
    case "request/select":
        console.log("Checkpoint B")
      loadRequest(message[1], user)
        .then((profile) =>
          apply((model) =>
            ({ ...model, profile })
          )
        );
      break;
    // put the rest of your cases here
    default:
      throw new Error(`Unhandled Auth message`);
  }
}

function loadRequest(
  payload: { requestid: string },
  user: Auth.User
) {
  return fetch(`/api/printrequests/${payload.requestid}`, {
    headers: Auth.headers(user),
    method: "GET"
  })
    .then((response: Response) => {
      if (response.status === 200) {
        console.log("success get")
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Profile:", json);
        return json as PrintRequest;
      }
    });
}

  