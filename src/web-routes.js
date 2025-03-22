import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { folderController } from "./controllers/folder-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addfolder", config: dashboardController.addFolder },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/folder/{id}", config: folderController.index },
  { method: "POST", path: "/folder/{id}/addlocation", config: folderController.addLocation },

  { method: "GET", path: "/dashboard/deletefolder/{id}", config: dashboardController.deleteFolder },
  { method: "GET", path: "/folder/{id}/deletelocation/{locationid}", config: folderController.deleteLocation },

];
