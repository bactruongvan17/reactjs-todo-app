import { FormControl, OutlinedInput, InputAdornment } from "@mui/material";
import SegmentIcon from '@mui/icons-material/Segment';
import { useState } from "react";

export default function AddTaskForm({ handleSubmit }) {
    const [value, setValue] = useState('');

    function handleEnter(e) {
        if(e.keyCode === 13) {
            handleSubmit(value);
            setValue('');
        }
    }

    return (
        <>
            <FormControl fullWidth variant="outlined">
                <OutlinedInput
                    onKeyDown={handleEnter}
                    onChange={e => setValue(e.target.value)}
                    id="task-item"
                    value={value}
                    startAdornment={
                        <InputAdornment position="start">
                            <SegmentIcon />
                        </InputAdornment>
                    }
                    placeholder="Add a new task"
                    size="small"
                    sx={{ fontSize: "14px" }}
                    inputProps={{
                    'aria-label': 'weight',
                    }}
                />
            </FormControl>
        </>
    );
}