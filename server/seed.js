// seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();
const User = require("./models/User");

const MONGO_URI = process.env.MONGO_URI;

const seedUsers = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Optional: Clear existing users
    await User.deleteMany();

    const users = [
      {
        userId: 101,
        name: "Bhavuk Kumar",
        email: "manager@company.com",
        password: await bcrypt.hash("manager123", 10),
        role: "Manager",
      },
      {
        userId: 102,
        name: "John Doe",
        email: "john.engineer@company.com",
        password: await bcrypt.hash("engineer123", 10),
        role: "Engineer",
      },
      {
        userId: 103,
        name: "Alice Smith",
        email: "alice.tech@company.com",
        password: await bcrypt.hash("alice123", 10),
        role: "Engineer",
      },
      {
        userId: 104,
        name: "Bob Smith",
        email: "bob.dev@company.com",
        password: await bcrypt.hash("bob123", 10),
        role: "Engineer",
      },
      {
        userId: 105,
        name: "Charlie Smith",
        email: "charlie.code@company.com",
        password: await bcrypt.hash("charlie123", 10),
        role: "Engineer",
      },
      {
        userId: 106,
        name: "David Smith",
        email: "david.build@company.com",
        password: await bcrypt.hash("david123", 10),
        role: "Engineer",
      },
      {
        userId: 107,
        name: "Ella Smith",
        email: "ella.test@company.com",
        password: await bcrypt.hash("ella123", 10),
        role: "Engineer",
      },
      {
        userId: 108,
        name: "Frank Smith",
        email: "frank.design@company.com",
        password: await bcrypt.hash("frank123", 10),
        role: "Engineer",
      },
      {
        userId: 109,
        name: "Grace Smith",
        email: "grace.devops@company.com",
        password: await bcrypt.hash("grace123", 10),
        role: "Engineer",
      },
      {
        userId: 110,
        name: "Hannah Smith",
        email: "hannah.backend@company.com",
        password: await bcrypt.hash("hannah123", 10),
        role: "Engineer",
      },
      {
        userId: 111,
        name: "Ian Smith",
        email: "ian.frontend@company.com",
        password: await bcrypt.hash("ian123", 10),
        role: "Engineer",
      },
    ];

    await User.insertMany(users);
    console.log("✅ Users inserted");
    process.exit();
  } catch (err) {
    console.error("❌ Error inserting users:", err);
    process.exit(1);
  }
};

seedUsers();
