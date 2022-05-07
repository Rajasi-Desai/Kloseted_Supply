import passport from 'passport';
import passportLocal from 'passport-local';
import { Database } from './database.js';

const { Strategy } = passportLocal;

// Passport Configuration
// Create a new LocalStrategy object to handle authentication using username and
// password credentials from the client. The LocalStrategy object is used to
// authenticate a user using a username and password.
const strategy = new Strategy(async (username, password, done) => {
  const db = new Database(process.env.DB_URL);
  await db.connect();
  if(username === null)
  {
    window.alert("Must enter a username!");
    return done(null, false, { message: 'No username' });
  }
  else if(password === null)
  {
    window.alert("Must enter a password!");
    return done(null, false, { message: 'No password' });
  }
  let user = await db.getUser(username);

  if (user === null) {
    // no such user
    return done(null, false, { message: 'Wrong username' });
  }
  if (user.password !== password) {
    // invalid password
    // should disable logins after N messages
    // delay return to rate-limit brute-force attacks
    await new Promise((r) => setTimeout(r, 2000)); // two second delay
    return done(null, false, { message: 'Wrong password' });
  }
  // success!
  // should create a user object here, associated with a unique identifier
  return done(null, username);
});

// Configure passport to use the LocalStrategy object.
// The LocalStrategy object is used to authenticate a user using a username and
// password. There are other strategies available, but this is the simplest.
passport.use(strategy);

// Convert user object to a unique identifier.
passport.serializeUser((user, done) => {
  done(null, {id: user.id, username : user.username});
});

// Convert a unique identifier to a user object.
passport.deserializeUser((uid, done) => {
  done(null, uid);
});

export default {
  configure: (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
  },

  authenticate: (domain, where) => {
    return passport.authenticate(domain, where);
  },
};
