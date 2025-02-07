1. Project Overview: 
The Task Management System is a full-stack web application designed to help users manage their tasks efficiently. The system allows users to create, update, delete, and organize tasks with various filtering and
sorting options. The application is built with a React.js frontend and a C# .NET 8 Core backend, ensuring a smooth and interactive user experience. The backend provides a RESTful API that manages all task-related
operations, while the frontend offers a responsive UI for seamless interaction. The system also includes error handling, logging, and database integration to ensure reliability and scalability.

2. Setup Instructions: 
To set up and run the Task Management System, follow the instructions below for both the backend and frontend components.
Backend (C# .NET 8 Core)
The backend is developed using C# .NET 8 Core and provides a REST API to handle all task-related operations. To set up the backend:
1.	Clone the repository: Begin by cloning the project repository from GitHub using the following command:
2.	git clone <[repo-url](https://github.com/lawanya025/Task-Management-System.git)>
3.	cd backend
4.	Install dependencies: Restore all necessary .NET dependencies using:
5.	dotnet restore
6.	Configure the database: Update the appsettings.json file with the correct database connection string to ensure the application connects to your preferred database.
7.	Run database migrations: Apply the database schema using Entity Framework Migrations with the following command:
8.	dotnet ef database update
9.	Start the backend server: Once the setup is complete, run the backend server with:
10.	dotnet run
The API will be accessible at https://localhost:5194 by default.
Frontend (React.js)
The frontend is developed using React.js and provides an interactive interface for users to manage their tasks. To set up the frontend:
1.	Navigate to the frontend directory: Move into the frontend folder using:
2.	cd frontend
3.	Install dependencies: Install all required packages by running:
4.	npm install
5.	Start the frontend server: Launch the React development server using:
6.	npm start
The application will run on http://localhost:5174 by default.

3. API Documentation: 
The backend exposes a RESTful API that allows users to perform various actions on tasks. Below is a detailed breakdown of the available API endpoints:
•	GET /api/tasks: Retrieves a list of all tasks stored in the database. This endpoint is useful for displaying all tasks in the frontend application.
•	POST /api/tasks: Creates a new task in the system. The request body must include task details such as name, description, status, due date, and priority.
•	DELETE /api/tasks: Deletes a task from the system. This is useful for removing completed or unnecessary tasks.
•	PATCH /api/tasks/{id}: Partially updates an existing task based on its ID. This is useful for modifying specific fields such as status, priority without affecting other task properties.
Each endpoint follows proper validation, error handling, and logging to ensure a smooth experience for users.

4. Technical Decisions & Architecture Overview: 
The architecture of the Task Management System is designed to ensure performance, scalability, and maintainability. Below are the key technical decisions and their justifications:
•	Backend: The backend is built using C# .NET 8 Core, chosen for its high performance, reliability, and ability to handle concurrent API requests efficiently. The backend follows a RESTful API architecture, making it easy to integrate with different frontend technologies.
•	Frontend: The frontend is developed using React.js, which provides a component-based structure for better code reusability and maintainability. The user interface is designed to be responsive and interactive, ensuring a seamless experience across different devices.
•	Database: The application supports MySQL as its database management system, ensuring that tasks are stored securely and can be queried efficiently.
•	API: The backend provides a well-structured REST API with endpoints for fetching, creating, updating, and deleting tasks. Proper error handling and logging mechanisms have been implemented to maintain a stable and reliable service.
•	State Management: In the frontend, Context API or Redux is used for managing the global state. This ensures that task data is properly managed across components and updated efficiently in real-time.
By following this modular and scalable architecture, the Task Management System is designed to handle a growing number of users while remaining easy to maintain and expand in the future.
