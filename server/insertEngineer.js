// insertEngineer.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Engineer = require('./models/Engineers'); // Adjust the path if needed

const MONGO_URI = process.env.MONGO_URI;

const insertEngineers = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Optional: clear existing entries
    await Engineer.deleteMany();

    const engineers = [
      {
        name: 'John Engineer',
        user_id: 102,
        email: 'john.engineer@company.com',
        currently_assigned: true,
        project_assigned: 'Project Phoenix',
        domain: 'Frontend',
        hours_allocated: 30
      },
      {
        name: 'Alice Tech',
        user_id: 103,
        email: 'alice.tech@company.com',
        currently_assigned: false,
        project_assigned: '',
        domain: 'Backend',
        hours_allocated: 0
      },
      {
        name: 'Bob Dev',
        user_id: 104,
        email: 'bob.dev@company.com',
        currently_assigned: true,
        project_assigned: 'Project Hydra',
        domain: 'Full Stack',
        hours_allocated: 40
      },
      {
        name: 'Charlie Code',
        user_id: 105,
        email: 'charlie.code@company.com',
        currently_assigned: false,
        project_assigned: '',
        domain: 'Mobile',
        hours_allocated: 0
      },
      {
        name: 'David Build',
        user_id: 106,
        email: 'david.build@company.com',
        currently_assigned: true,
        project_assigned: 'Infra Upgrade',
        domain: 'DevOps',
        hours_allocated: 20
      },
      {
        name: 'Ella Test',
        user_id: 107,
        email: 'ella.test@company.com',
        currently_assigned: true,
        project_assigned: 'QA Automation',
        domain: 'QA',
        hours_allocated: 25
      },
      {
        name: 'Frank Design',
        user_id: 108,
        email: 'frank.design@company.com',
        currently_assigned: false,
        project_assigned: '',
        domain: 'UI/UX',
        hours_allocated: 0
      },
      {
        name: 'Grace DevOps',
        user_id: 109,
        email: 'grace.devops@company.com',
        currently_assigned: true,
        project_assigned: 'CI/CD Revamp',
        domain: 'DevOps',
        hours_allocated: 35
      },
      {
        name: 'Hannah Backend',
        user_id: 110,
        email: 'hannah.backend@company.com',
        currently_assigned: true,
        project_assigned: 'API Gateway',
        domain: 'Backend',
        hours_allocated: 40
      },
      {
        name: 'Ian Frontend',
        user_id: 111,
        email: 'ian.frontend@company.com',
        currently_assigned: false,
        project_assigned: '',
        domain: 'Frontend',
        hours_allocated: 0
      },
    ];

    await Engineer.insertMany(engineers);
    console.log('✅ Engineers inserted successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Error inserting engineers:', err);
    process.exit(1);
  }
};

insertEngineers();
