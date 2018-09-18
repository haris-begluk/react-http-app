import Raven from "raven-js";

function init() {
  Raven.config("https://f259d158a61444d392baaa4461addb09@sentry.io/1283062", {
    release: "1-0-0",
    environment: "development-test"
  }).install();
}
function log(error) {
  Raven.captureException(error);
}
export default {
  init,
  log
};
