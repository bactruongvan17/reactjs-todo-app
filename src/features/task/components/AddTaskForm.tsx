import { FormControl, OutlinedInput, InputAdornment } from "@mui/material";
import SegmentIcon from '@mui/icons-material/Segment';
import React, { useState } from "react";
import { useAppDispatch } from '../../../app/hooks';
import { addTask } from "../taskSlice";
import { Task, TaskStatus } from "../taskType";

export default function AddTaskForm() {
    const [value, setValue] = useState('');
    const dispatch = useAppDispatch();

    function handleEnter(e: React.KeyboardEvent) {
        if(e.key === "Enter") {
            const task: Task = {
                id: (new Date()).getTime(),
                name: value,
                status: TaskStatus.Pending,
            };

            dispatch(addTask(task));
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