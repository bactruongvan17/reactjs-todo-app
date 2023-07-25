import { FormControl, OutlinedInput, InputAdornment } from "@mui/material";
import SegmentIcon from '@mui/icons-material/Segment';

export default function AddTaskForm() {
    return (
        <>
            <FormControl fullWidth variant="outlined">
                <OutlinedInput
                    id="task-item"
                    startAdornment={
                        <InputAdornment position="start">
                            <SegmentIcon />
                        </InputAdornment>
                    }
                    size="small"
                    placeholder="Add a new task"
                    inputProps={{
                    'aria-label': 'weight',
                    }}
                />
            </FormControl>
        </>
    );
}