import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@email.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: true,
  },
  {
    name: "user",
    email: "user@email.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: true,
  },
];

export default users;
