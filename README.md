# ER Management System

A full-stack web application for managing engineers and projects, built with React (frontend) and Node.js/Express (backend).

## Features

- **Manager Dashboard**: View and manage engineers, assign projects, and track assignments
- **Engineer Dashboard**: View assigned projects, team members, and manage assignment status
- **Authentication System**: Role-based access control for Managers and Engineers
- **Statistics Dashboard**: Visual analytics for project and engineer management
- **Real-time Updates**: Live status updates for assignment progress

## Tech Stack

### Frontend

- React 19
- React Router DOM
- Axios for API calls
- Recharts for data visualization
- Tailwind CSS for styling
- MDB React UI Kit

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- bcryptjs for password hashing
- CORS enabled

## Project Structure

```
ER_ManagementSystem/
├── frontend/          # React frontend application
│   ├── src/
│   ├── public/
│   └── package.json
├── server/           # Node.js backend API
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── config/
│   └── package.json
└── README.md
```

## Live Demo

- **Frontend**: [https://your-frontend-deployment.vercel.app](https://er-resource-mgmt-system-c9za.vercel.app/login)
- **Backend API**: [https://your-backend-deployment.vercel.app](https://er-resource-mgmt-backend-l0xpcwa8h.vercel.app/)

## Local Development

### Prerequisites

- Node.js (v14 or higher)
- MongoDB connection string
- npm or yarn

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/ER_ManagementSystem.git
   cd ER_ManagementSystem
   ```

2. **Setup Backend**

   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the server directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

3. **Setup Frontend**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Run the Application**

   Backend (from server directory):

   ```bash
   npm run dev
   ```

   Frontend (from frontend directory):

   ```bash
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/login` - User login
- `POST /api/register` - User registration

### Engineers

- `GET /api/engineers` - Get all engineers
- `POST /api/engineers` - Create new engineer
- `PUT /api/engineers/:id` - Update engineer

### Assignments

- `GET /api/assignments` - Get all assignments
- `POST /api/assignments` - Create new assignment
- `PUT /api/assignments/:id` - Update assignment status

### Statistics

- `GET /api/stats/overview` - Get dashboard statistics

## Deployment

This application is deployed on Vercel:

- Frontend: Automatically deployed from the `frontend` directory
- Backend: Deployed as serverless functions from the `server` directory

### Environment Variables (Production)

- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Set to 'production'

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - bhavukverma2001@gmail.com

Project Link: [https://github.com/yourusername/ER_ManagementSystem](https://github.com/Bhavukverma17/ER_Resource_Mgmt_system)
