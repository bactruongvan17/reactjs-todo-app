import { Checkbox, FormControlLabel } from "@mui/material";

export default function TaskItem({ task }) {
    return (
        <FormControlLabel control={<Checkbox checked={task.done} />} label={task.name} />
    );
}