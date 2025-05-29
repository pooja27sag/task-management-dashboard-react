/** @format */

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Edit, ArrowBack } from "@mui/icons-material";
import api from "../services/api";
import { useTasks } from "../context/TaskContext";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    state: { tasks },
  } = useTasks();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      try {
        // First check if task exists in context
        const existingTask = tasks.find((t) => t.id.toString() === id);
        if (existingTask) {
          setTask(existingTask);
        } else {
          // If not, fetch from API
          const response = await api.get(`/tasks/${id}`);
          setTask(response.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, tasks]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "error";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Done":
        return "success";
      case "In Progress":
        return "info";
      default:
        return "default";
    }
  };

  if (loading)
    return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!task) return <Typography>Task not found</Typography>;

  return (
    <Container maxWidth="md">
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back to Dashboard
      </Button>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1">
          {task.title}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Edit />}
          onClick={() => navigate(`/task/${id}/edit`)}
        >
          Edit
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, my: 2 }}>
        <Chip label={task.status} color={getStatusColor(task.status)} />
        <Chip label={task.priority} color={getPriorityColor(task.priority)} />
        <Chip
          label={`Due: ${new Date(task.dueDate).toLocaleDateString()}`}
          variant="outlined"
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Description
      </Typography>
      <Typography paragraph sx={{ mb: 3 }}>
        {task.description || "No description provided"}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Assigned to: {task.assignedUser || "Unassigned"}
      </Typography>
    </Container>
  );
};

export default TaskDetail;
