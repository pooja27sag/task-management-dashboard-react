/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  Card,
  Chip,
} from "@mui/material";
import { useTasks } from "../context/TaskContext";
import { useTaskActions } from "../hooks/useTasks";
import TaskForm from "../componants/TaskForm";
import "./Dashboard.css";
import { Edit, Delete, Add } from "@mui/icons-material";
const Dashboard = () => {
  const navigate = useNavigate();
  const {
    state: { tasks, loading, error },
  } = useTasks();
  const { deleteTask, updateTask } = useTaskActions();
  const [statusFilter, setStatusFilter] = useState("All");
  const [openForm, setOpenForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const filteredTasks =
    statusFilter === "All"
      ? tasks
      : tasks.filter((task) => task.status === statusFilter);

  const statusOptions = [
    { value: "All", label: "All Tasks", color: "default" },
    { value: "Todo", label: "To Do", color: "primary" },
    { value: "In Progress", label: "In Progress", color: "warning" },
    { value: "Done", label: "Completed", color: "success" },
  ];

  const priorityColors = {
    High: "error",
    Medium: "warning",
    Low: "success",
  };

  const statusColors = {
    Todo: "#4299e1",
    "In Progress": "#f6ad55",
    Done: "#48bb78",
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === "Done" ? "Todo" : "Done";
    try {
      await updateTask({ ...task, status: newStatus });
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const handleTaskClick = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  return (
    <Container maxWidth="md" className="dashboard-container">
      <Box className="dashboard-header">
        <Typography variant="h3" className="dashboard-title">
          Task Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setEditingTask(null);
            setOpenForm(true);
          }}
          sx={{
            background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            fontWeight: "bold",
            borderRadius: "10px",
            padding: "10px 20px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 7px 14px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          Add Task
        </Button>
      </Box>

      <Box className="filter-container">
        {statusOptions.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            color={option.color}
            variant={statusFilter === option.value ? "filled" : "outlined"}
            onClick={() => setStatusFilter(option.value)}
            sx={{
              fontWeight: "bold",
              fontSize: "0.875rem",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
        ))}
      </Box>

      {loading && (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box>
        {filteredTasks.map((task) => (
          <Card
            key={task.id}
            className={`task-card ${task.status.replace(" ", "-")}`}
            sx={{
              mb: 2,
              position: "relative",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <Box display="flex" justifyContent="space-between">
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {task.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {task.description}
                </Typography>
                <Box display="flex" gap={1} mt={2} flexWrap="wrap">
                  <Chip
                    label={task.status}
                    size="small"
                    sx={{
                      backgroundColor: statusColors[task.status],
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                  <Chip
                    label={task.priority}
                    size="small"
                    color={priorityColors[task.priority]}
                  />
                  <Chip
                    label={`Due: ${new Date(
                      task.dueDate
                    ).toLocaleDateString()}`}
                    variant="outlined"
                    size="small"
                  />
                  {task.assignedUser && (
                    <Chip
                      label={`Assigned: ${task.assignedUser}`}
                      variant="outlined"
                      size="small"
                    />
                  )}
                </Box>
              </Box>

              {/* Action Buttons */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 1,
                  ml: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<Edit fontSize="small" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(task);
                  }}
                  sx={{
                    minWidth: "80px",
                    borderRadius: "8px",
                    textTransform: "none",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<Delete fontSize="small" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(task.id);
                  }}
                  sx={{
                    minWidth: "80px",
                    borderRadius: "8px",
                    textTransform: "none",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                      backgroundColor: "rgba(255, 0, 0, 0.04)",
                    },
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>

      <TaskForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        task={editingTask}
      />
    </Container>
  );
};

export default Dashboard;
