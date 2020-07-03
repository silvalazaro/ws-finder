const passport = require("koa-passport");
import * as strategy from "passport-facebook";

const FacebookStrategy = strategy.Strategy;
const callback = "/auth/facebook/callback";
// configurar passport
passport.use(
  new FacebookStrategy(
    {
      clientID: "548902762443170",
      clientSecret: "72facee2c1a0bc95db3e3cf7c4611bca",
      callbackURL: callback,
      profileFields: ["email", "name"],
    },
    function (accessToken, refreshToken, profile, done) {
      throw new Error("autenticouuu");
      const { email, first_name, last_name } = profile._json;
      const userData = {
        email,
        firstName: first_name,
        lastName: last_name,
      };
      console.log("autenticado...");
      console.log(userData);
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("serializar usuario...");
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    console.log("deserialize usuario...");
    //done(null, user)
  } catch (err) {
    done(err);
  }
});
export default passport;
