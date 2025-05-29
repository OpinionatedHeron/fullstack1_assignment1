import bcrypt from "bcryptjs";
import { db } from "../models/db.js";
import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to PlaceMark" });
    },
  },

  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for PlaceMark" });
    },
  },

  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      try {
        const userData = request.payload;

        const existingUser = await db.userStore.getUserByEmail(userData.email);
        if (existingUser) {
          return h. view("signup-view", {
            title: "Sign up error",
            errors: [{ message: "Email already in use"}]
          }).code(400)
        }

        const saltRounds = 12;
        userData.password = await bcrypt.hash(userData.password, saltRounds);

        await db.userStore.addUser(userData);
        retrun h.redirect("/");
      } catch (error) {
        return h.view("signup-view", {
          title:"Sign up error",
          errors: [{ message: "Error creating account" }]
        }).code(500)
      } 
    },
  },

  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to PlaceMark" });
    },
  },

  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      try{
        const { email, password } = request.payload;

        const user = await db.userStore.getUserByEmail(email);
        if (!user) {
          return h.view("login-view", {
            title: "Login error",
            errors: [{ message: "Invalid email or password" }]
          }).code(401);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {

          return h.view("login-view", {
            title: "Login error",
            errors: [{ message: "Invalid email or password"}]
          }).code(401)
        }
        request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
      } catch (error) {
        return h.view("login-view", {
          title: "Login error"
          errors: [{ message: "Login failed" }]
        }).code(500);
      }
    },
  },

  logout: {
    auth: false,
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },
};

