var passport = require('passport');
var APIKeyStrategy = require('passport-localapikey-update').Strategy;

passport.use(new APIKeyStrategy((apikey, done) => { // Se captura la apikey
  done(null,apikey);
}));

module.exports.ReadAccess = (req, res, next) => {
  passport.authenticate('localapikey', (err, user, info) => {
      if(!user)
          return res.sendStatus(401);
      else if (user!="user" && user!="userw") {
          return res.sendStatus(403);
      }
      return next();
  })(req, res, next);
};

module.exports.WriteReadAccess = (req, res, next) => {
    passport.authenticate('localapikey', (err, user, info) => {
        if(!user)
            return res.sendStatus(401);
        else if (user!="userw") {
            return res.sendStatus(403);
        }
        return next();
    })(req, res, next);
};
