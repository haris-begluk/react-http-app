import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import Raven from "raven-js";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

Raven.config("https://f259d158a61444d392baaa4461addb09@sentry.io/1283062", {
  release: "1-0-0",
  environment: "development-test"
}).install();

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
