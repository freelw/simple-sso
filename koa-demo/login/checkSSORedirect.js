const url = require("url");
const axios = require("axios");
const { URL } = url;
const { verifyJwtToken } = require("./jwt_verify");
const validReferOrigin = "http://sso.ankuranand.com:3010";
const ssoServerJWTURL = "http://sso.ankuranand.com:3010/simplesso/verifytoken";

const ssoRedirect = () => {
  return async function(ctx, next) {
    // check if the req has the queryParameter as ssoToken
    // and who is the referer.
    const { ssoToken } = ctx.query;
    if (ssoToken != null) {
      // to remove the ssoToken in query parameter redirect.
      const redirectURL = ctx.url;
      try {
        const response = await axios.get(
          `${ssoServerJWTURL}?ssoToken=${ssoToken}`,
          {
            headers: {
              Authorization: "Bearer l1Q7zkOL59cRqWBkQ12ZiGVW2DBL"
            }
          }
        );
        const { token } = response.data;
        const decoded = await verifyJwtToken(token);
        // now that we have the decoded jwt, use the,
        // global-session-id as the session id so that
        // the logout can be implemented with the global session.
        ctx.session.user = decoded;
      } catch (err) {
        return next(err);
      }

      return ctx.redirect(`${redirectURL}`);
    }

    return next();
  };
};

module.exports = ssoRedirect;
