const isAuthenticated = (ctx, next) => {
  // simple check to see if the user is authenicated or not,
  // if not redirect the user to the SSO Server for Login
  // pass the redirect URL as current URL
  // serviceURL is where the sso should redirect in case of valid user
  const redirectURL = `http://${ctx.host}${ctx.url}`;
  if (ctx.session.user == null) {
    return ctx.redirect(
      `http://sso.ankuranand.com:3010/simplesso/login?serviceURL=${redirectURL}`
    );
  }
  next();
};

module.exports = isAuthenticated;
