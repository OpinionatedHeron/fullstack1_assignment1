import { title } from "process";

export const seedData = {
  users: {
    _model: "User",
    riz: {
      firstName: "Riz",
      lastName: "Gukgak",
      email: "riz@email.com",
      username: "Shadow",
      password: "theball",
    },
    fabian: {
      firstName: "Fabian",
      lastName: "Seacaster",
      email: "fabian@email.com",
      username: "iDance",
      password: "pappa",
    },
    kristen: {
      firstName: "Kristen",
      lastName: "Applebees",
      email: "kris@email.com",
      username: "k2lives",
      password: "heygirlie",
    }
  },
  folders: {
    _model: "Folder",
    dublin: {
      title: "Dublin Faves",
      userid: "->users.kristen"
    }
  },
  locations: {
    _model : "Location",
    dublin_castle : {
      title: "Dublin Castle",
      category: "Castle",
      description: "A former motte-and-bailey castle",
      folderid: "->folders.dublin"
    },
  }
};
