# Task Management Dashboard version - 1.0.0


## 📋 Overview

A modern, responsive task management dashboard built with **React**. This application enables users to efficiently manage tasks with the following features:
- Create, view, update, and delete tasks
- Filter tasks by status (Todo, In Progress, Done)
- Set task priorities and due dates
- View detailed task information

## 🛠️ Technology Stack

### Frontend
- **React** (v18+): JavaScript library for building dynamic user interfaces
- **Material-UI (MUI)** (v5): Component library for consistent, modern UI
- **React Router** (v6): Client-side routing for seamless navigation
- **Context API**: Lightweight state management
- **Axios**: HTTP client for API interactions
- **date-fns** (optional): Utility library for date manipulation

### Backend/Mock API
- **json-server**: Mock REST API for rapid prototyping
- **lowdb**: Local JSON-based database for mock data storage

## 🚀 Features

### Core Functionality
- **Task CRUD Operations**:
  - Create tasks with title, description, status, priority, and due date
  - Edit existing tasks
  - Delete tasks
  - View task details
- **Task Filtering**: Filter tasks by status (All, Todo, In Progress, Done)
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices

### Advanced Features
- Optimistic UI updates for seamless user experience
- Form validation for robust data input
- Loading and error state handling
- Accessibility support with ARIA labels

## 📦 JSON Data Structure

Example task object stored in `db.json`:
```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Complete project",
      "description": "Finish the task management dashboard",
      "status": "In Progress",
      "priority": "High",
      "dueDate": "2025-06-15",
      "assignedUser": "John Doe"
    }
  ]
}
```

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v16+ recommended)
- **npm** or **yarn**

### Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/pooja27sag/task-management-dashboard-react.git
   cd task-management-dashboard-react
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the mock API server** (run in a separate terminal):
   ```bash
   npm run server
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

5. **Open the app** in your browser:
   ```
   http://localhost:3000
   ```

## 📂 Project Structure

```
task-management-dashboard/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # Context providers for state management
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page-level components
│   ├── services/         # API service functions
│   ├── styles/           # Global and component-specific styles
│   ├── App.js            # Main application component
│   └── index.js          # Application entry point
├── db.json               # Mock JSON database
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```



## 🌟 Key Implementation Details

### Major Components
- **TaskContext**: Centralized state management for tasks
- **useTaskActions**: Custom hook for task CRUD operations
- **TaskForm**: Reusable form for creating and editing tasks
- **StatusFilter**: Component for filtering tasks by status
- **PriorityBadge**: Visual indicator for task priority levels

### Custom Hooks
- **useForm**: Manages form state and validation
- **useTask**: Encapsulates task-related operations (create, read, update, delete)

## 📝 Available Scripts

- `npm start`: Starts the development server
- `npm run server`: Starts the mock API server
- `npm test`: Runs the test suite
- `npm run build`: Creates a production-ready build

---

