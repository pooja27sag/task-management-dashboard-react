import { Chip } from '@mui/material';

const priorityColors = {
    High: 'error',
    Medium: 'warning',
    Low: 'success'
};

export const PriorityBadge = ({ priority }) => (
    <Chip
        label={priority}
        color={priorityColors[priority]}
        size="small"
    />
);