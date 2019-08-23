const isAuthenticated = require("./isAuthenticated");
const checkSSORedirect = require("./checkSSORedirect");

function login(app) {
    app.use(checkSSORedirect());
    app.use(isAuthenticated);
}

module.exports = login;