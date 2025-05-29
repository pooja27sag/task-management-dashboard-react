/** @format */

import { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Typography,
  Stack,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { PriorityBadge } from "./PriorityBadge";

export const TaskList = ({ tasks, onEdit, onDelete, onToggleStatus }) => {
  const [expandedTask, setExpandedTask] = useState(null);

  return (
    <List>
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          secondaryAction={
            <Stack direction="row" spacing={1}>
              <IconButton onClick={() => onEdit(task)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => onDelete(task.id)}>
                <Delete />
              </IconButton>
            </Stack>
          }
        >
          <Checkbox
            checked={task.status === "Done"}
            onChange={() => onToggleStatus(task)}
          />
          <ListItemText
            primary={
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="subtitle1">{task.title}</Typography>
                <PriorityBadge priority={task.priority} />
              </Stack>
            }
            secondary={
              <>
                <Typography variant="body2">{task.description}</Typography>
                <Typography variant="caption">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </Typography>
              </>
            }
            onClick={() =>
              setExpandedTask(expandedTask === task.id ? null : task.id)
            }
          />
        </ListItem>
      ))}
    </List>
  );
};
