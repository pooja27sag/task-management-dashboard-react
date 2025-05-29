import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Dashboard from './pages/Dashboard';
import TaskDetail from './pages/TaskDetails';
import './App.css';
import Header from './componants/Header';

function App() {
  return (
    <TaskProvider>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default App;