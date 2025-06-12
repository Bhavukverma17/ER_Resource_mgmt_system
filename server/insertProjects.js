// insertProjects.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Project = require('./models/Projects');

const MONGO_URI = process.env.MONGO_URI;

const insertProjects = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Optional: Clear existing projects
    await Project.deleteMany();

    const projects = [
      {
        name: 'Project Phoenix',
        domain: 'Frontend',
        description: 'Revamp of customer dashboard UI',
        end_date: new Date('2025-08-01'),
        status: 'Active',
        total_hours: 200,
      },
      {
        name: 'Project Hydra',
        domain: 'Full Stack',
        description: 'Internal admin portal for engineering operations',
        end_date: new Date('2025-09-15'),
        status: 'Active',
        total_hours: 300,
      },
      {
        name: 'API Gateway',
        domain: 'Backend',
        description: 'Centralized API gateway for all microservices',
        end_date: new Date('2025-07-15'),
        status: 'On Hold',
        total_hours: 180,
      },
      {
        name: 'QA Automation',
        domain: 'QA',
        description: 'Building automation test suite',
        end_date: new Date('2025-10-01'),
        status: 'Active',
        total_hours: 150,
      },
      {
        name: 'Infra Upgrade',
        domain: 'DevOps',
        description: 'Upgrading servers and monitoring tools',
        end_date: new Date('2025-07-30'),
        status: 'Completed',
        total_hours: 120,
      },
    ];

    await Project.insertMany(projects);
    console.log('✅ Projects inserted successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Error inserting projects:', error);
    process.exit(1);
  }
};

insertProjects();
