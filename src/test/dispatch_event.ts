


import { action } from "../dispatch_event";

action(
    "dispatch_event",
    {
        "owner": "garronej",
        "repo": "test-repo",
        "event_type": "example-event",
        "client_payload_json": JSON.stringify({ "foo": "bar" }),
        "github_token": ""
    },
    { "debug": console.log }
);

