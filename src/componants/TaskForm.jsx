/** @format */

// /** @format */

// import { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   MenuItem,
//   Stack,
//   FormControl,
//   InputLabel,
//   Select,
// } from "@mui/material";
// import { useForm } from "../hooks/useForm";
// import { useTaskActions } from "../hooks/useTasks";

// const TaskForm = ({ open, onClose, task }) => {
//   const { addTask, updateTask } = useTaskActions();
//   const [users] = useState(["John Doe", "Jane Smith", "Mike Johnson"]);

//   const validate = (values) => {
//     const errors = {};
//     if (!values.title) errors.title = "Title is required";
//     if (!values.dueDate) errors.dueDate = "Due date is required";
//     return errors;
//   };

//   const { values, errors, handleChange, handleSubmit, setValues } = useForm(
//     {
//       title: "",
//       description: "",
//       status: "Todo",
//       priority: "Medium",
//       dueDate: "",
//       assignedUser: "",
//     },
//     validate
//   );

//   useEffect(() => {
//     if (task) {
//       setValues({
//         title: task.title,
//         description: task.description,
//         status: task.status,
//         priority: task.priority,
//         dueDate: task.dueDate.split("T")[0],
//         assignedUser: task.assignedUser || "",
//       });
//     } else if (open) {
//       setValues({
//         title: "",
//         description: "",
//         status: "Todo",
//         priority: "Medium",
//         dueDate: "",
//         assignedUser: "",
//       });
//     }
//   }, [task, open, setValues]);

//   const onSubmit = async (formValues) => {
//     const taskData = {
//       ...formValues,
//       dueDate: formValues.dueDate,
//     };

//     try {
//       if (task) {
//         await updateTask({ ...taskData, id: task.id });
//       } else {
//         await addTask(taskData);
//       }
//       onClose();
//     } catch (error) {
//       console.error("Failed to save task:", error);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>{task ? "Edit Task" : "Add New Task"}</DialogTitle>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <DialogContent>
//           <Stack spacing={3} sx={{ mt: 1 }}>
//             <TextField
//               name="title"
//               label="Title"
//               value={values.title}
//               onChange={handleChange}
//               error={!!errors.title}
//               helperText={errors.title}
//               fullWidth
//               required
//             />

//             <TextField
//               name="description"
//               label="Description"
//               value={values.description}
//               onChange={handleChange}
//               multiline
//               rows={4}
//               fullWidth
//             />

//             <FormControl fullWidth>
//               <InputLabel>Status</InputLabel>
//               <Select
//                 name="status"
//                 value={values.status}
//                 label="Status"
//                 onChange={handleChange}
//               >
//                 <MenuItem value="Todo">Todo</MenuItem>
//                 <MenuItem value="In Progress">In Progress</MenuItem>
//                 <MenuItem value="Done">Done</MenuItem>
//               </Select>
//             </FormControl>

//             <FormControl fullWidth>
//               <InputLabel>Priority</InputLabel>
//               <Select
//                 name="priority"
//                 value={values.priority}
//                 label="Priority"
//                 onChange={handleChange}
//               >
//                 <MenuItem value="Low">Low</MenuItem>
//                 <MenuItem value="Medium">Medium</MenuItem>
//                 <MenuItem value="High">High</MenuItem>
//               </Select>
//             </FormControl>

//             <TextField
//               name="dueDate"
//               label="Due Date"
//               type="date"
//               value={values.dueDate}
//               onChange={handleChange}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               fullWidth
//               error={!!errors.dueDate}
//               helperText={errors.dueDate}
//             />

//             <FormControl fullWidth>
//               <InputLabel>Assigned To</InputLabel>
//               <Select
//                 name="assignedUser"
//                 value={values.assignedUser}
//                 label="Assigned To"
//                 onChange={handleChange}
//               >
//                 <MenuItem value="">
//                   <em>Unassigned</em>
//                 </MenuItem>
//                 {users.map((user) => (
//                   <MenuItem key={user} value={user}>
//                     {user}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Stack>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={onClose}>Cancel</Button>
//           <Button type="submit" variant="contained">
//             {task ? "Update" : "Create"}
//           </Button>
//         </DialogActions>
//       </form>
//     </Dialog>
//   );
// };

// export default TaskForm;

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Avatar,
  Typography,
  useTheme,
} from "@mui/material";
import {
  AddTask,
  CalendarToday,
  Person,
  PriorityHigh,
  Description,
} from "@mui/icons-material";
import { useForm } from "../hooks/useForm";
import { useTaskActions } from "../hooks/useTasks";

const iconStyle = {
  marginRight: 1,
  color: "action.active",
};

const TaskForm = ({ open, onClose, task }) => {
  const theme = useTheme();
  const { addTask, updateTask } = useTaskActions();
  const [users] = useState(["John Doe", "Jane Smith", "Mike Johnson"]);

  const validate = (values) => {
    const errors = {};
    if (!values.title) errors.title = "Title is required";
    if (!values.dueDate) errors.dueDate = "Due date is required";
    return errors;
  };

  const { values, errors, handleChange, handleSubmit, setValues } = useForm(
    {
      title: "",
      description: "",
      status: "Todo",
      priority: "Medium",
      dueDate: "",
      assignedUser: "",
    },
    validate
  );

  useEffect(() => {
    if (task) {
      setValues({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate.split("T")[0],
        assignedUser: task.assignedUser || "",
      });
    } else if (open) {
      setValues({
        title: "",
        description: "",
        status: "Todo",
        priority: "Medium",
        dueDate: "",
        assignedUser: "",
      });
    }
  }, [task, open, setValues]);

  const onSubmit = async (formValues) => {
    const taskData = {
      ...formValues,
      dueDate: formValues.dueDate,
    };

    try {
      if (task) {
        await updateTask({ ...taskData, id: task.id });
      } else {
        await addTask(taskData);
      }
      onClose();
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: theme.palette.primary.main,
          color: "white",
          py: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ bgcolor: "white", mr: 2 }}>
          <AddTask color="primary" />
        </Avatar>
        <Typography variant="h6">
          {task ? "Edit Task" : "Create New Task"}
        </Typography>
      </DialogTitle>

      <Paper elevation={0} sx={{ p: 0 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ pt: 3 }}>
            <Stack spacing={3}>
              <TextField
                name="title"
                label="Task Title"
                value={values.title}
                onChange={handleChange}
                error={!!errors.title}
                helperText={errors.title}
                fullWidth
                required
                InputProps={{
                  startAdornment: <Description sx={iconStyle} />,
                }}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />

              <TextField
                name="description"
                label="Description"
                value={values.description}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />

              <Stack direction="row" spacing={2}>
                <FormControl fullWidth sx={{ minWidth: 120 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={values.status}
                    label="Status"
                    onChange={handleChange}
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                    }}
                  >
                    <MenuItem value="Todo">Todo</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Done">Done</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ minWidth: 120 }}>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    name="priority"
                    value={values.priority}
                    label="Priority"
                    onChange={handleChange}
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                    }}
                    InputProps={{
                      startAdornment: <PriorityHigh sx={iconStyle} />,
                    }}
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={2}>
                <TextField
                  name="dueDate"
                  label="Due Date"
                  type="date"
                  value={values.dueDate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: <CalendarToday sx={iconStyle} />,
                  }}
                  fullWidth
                  error={!!errors.dueDate}
                  helperText={errors.dueDate}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />

                <FormControl fullWidth>
                  <InputLabel>Assigned To</InputLabel>
                  <Select
                    name="assignedUser"
                    value={values.assignedUser}
                    label="Assigned To"
                    onChange={handleChange}
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                    }}
                    InputProps={{
                      startAdornment: <Person sx={iconStyle} />,
                    }}
                  >
                    <MenuItem value="">
                      <em>Unassigned</em>
                    </MenuItem>
                    {users.map((user) => (
                      <MenuItem key={user} value={user}>
                        {user}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{ borderRadius: 2 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ borderRadius: 2 }}
              startIcon={<AddTask />}
            >
              {task ? "Update Task" : "Create Task"}
            </Button>
          </DialogActions>
        </form>
      </Paper>
    </Dialog>
  );
};

export default TaskForm;
