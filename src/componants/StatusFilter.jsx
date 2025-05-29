/** @format */

import { ButtonGroup, Button } from "@mui/material";

export const StatusFilter = ({ currentFilter, onFilterChange }) => {
  const statuses = ["All", "Todo", "In Progress", "Done"];

  return (
    <ButtonGroup variant="outlined" size="small">
      {statuses.map((status) => (
        // <Button
        //   key={status}
        //   color={currentFilter === status ? "primary" : "inherit"}
        //   onClick={() => onFilterChange(status)}
        // >
        //   {status}
        // </Button>
        <Button
          key={status}
          color={currentFilter === status ? "primary" : "inherit"}
          onClick={() => onFilterChange(status)}
          aria-pressed={currentFilter === status}
        >
          {status}
        </Button>
      ))}
    </ButtonGroup>
  );
};
