import { FormControl, OutlinedInput, InputAdornment } from "@mui/material";
import SegmentIcon from '@mui/icons-material/Segment';
import React, { useState } from "react";

type AddTaskFormProps = {
    handleSubmit: Function
};

export default function AddTaskForm({ handleSubmit }: AddTaskFormProps) {
    const [value, setValue] = useState('');

    function handleEnter(e: React.KeyboardEvent) {
        if(e.key === "Enter") {
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